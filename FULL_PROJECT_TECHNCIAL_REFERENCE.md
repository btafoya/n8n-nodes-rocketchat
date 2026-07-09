# Full Project Technical Reference: @btafoya/n8n-nodes-rocketchat

This document is the technical source of truth for implementing and maintaining the Rocket.Chat n8n community node. It assumes you have read `PROJECT_REFERENCE.md` and `PROJECT_PLAN.md`.

## Tech stack

- **Language**: TypeScript 5.x, `strict: true`.
- **Build tool**: `@n8n/node-cli` (dev dependency).
- **Linting**: `n8n-node lint` via the n8n-node preset.
- **Target runtime**: n8n's Node.js worker process; compile to CommonJS in `dist/`.
- **HTTP layer**: n8n's declarative request routing. No custom HTTP client.
- **Auth**: Rocket.Chat personal access token.

The only allowed dependency classes are `devDependencies` and `peerDependencies`. Do not add anything to `dependencies`.

## Repository layout

```
.
├── .github/workflows/publish.yml   # npm publish with provenance
├── credentials/
│   └── RocketchatApi.credentials.ts
├── nodes/
│   └── Rocketchat/
│       ├── Rocketchat.node.ts
│       ├── resources/
│       │   ├── message.ts
│       │   ├── channel.ts
│       │   ├── group.ts
│       │   ├── room.ts
│       │   └── user.ts
│       └── shared/
│           └── descriptions.ts       # common fields (roomId, userId, etc.)
├── icons/
│   ├── rocketchat.svg
│   └── rocketchat.dark.svg
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE
└── .gitignore
```

`dist/` is produced by `npm run build` and is the only directory published to npm.

## package.json

The `n8n` block is the only registration mechanism n8n uses. Paths must point at compiled `.js` files in `dist/`.

```json
{
  "name": "@btafoya/n8n-nodes-rocketchat",
  "version": "0.1.0",
  "description": "n8n community node for Rocket.Chat",
  "license": "MIT",
  "keywords": [
    "n8n-community-node-package"
  ],
  "author": {
    "name": "Brian Tafoya",
    "email": "btafoya@briantafoya.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/btafoya/n8n-nodes-rocketchat.git"
  },
  "scripts": {
    "build": "n8n-node build",
    "build:watch": "tsc --watch",
    "dev": "n8n-node dev",
    "lint": "n8n-node lint",
    "lint:fix": "n8n-node lint --fix",
    "release": "n8n-node release",
    "prepublishOnly": "n8n-node prerelease"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "strict": true,
    "credentials": [
      "dist/credentials/RocketchatApi.credentials.js"
    ],
    "nodes": [
      "dist/nodes/Rocketchat/Rocketchat.node.js"
    ]
  },
  "devDependencies": {
    "@n8n/node-cli": "^1.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "release-it": "^17.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
```

Keep `@n8n/node-cli` at the version the starter recommends. Do not pin to a version older than `0.23.0` if you need provenance.

## tsconfig.json

Use the n8n starter's compiler options. The include pattern is required for n8n's build to discover `.node.json` files and credentials.

```json
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2019",
    "lib": ["es2019", "es2020", "es2022.error"],
    "removeComments": true,
    "useUnknownInCatchVariables": false,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
    "preserveConstEnums": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "incremental": true,
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "outDir": "./dist/"
  },
  "include": [
    "credentials/**/*",
    "nodes/**/*",
    "nodes/**/*.json",
    "package.json"
  ]
}
```

## Tooling commands

| Command | What it does |
|---------|--------------|
| `npm install` | Installs dev and peer dependencies. |
| `npm run build` | TypeScript compile to `dist/` and n8n-node post-processing. |
| `npm run build:watch` | `tsc --watch` for fast feedback while editing. |
| `npm run dev` | Links the package into a local n8n instance for manual testing. |
| `npm run lint` | ESLint via the n8n-node preset. Must pass before release. |
| `npm run lint:fix` | Auto-fixes lint issues where possible. |
| `npm run release` | Interactive version bump, changelog, commit, tag, and push. |
| `npm run prepublishOnly` | Pre-publish validation run by npm and CI. |

## Credential implementation

File: `credentials/RocketchatApi.credentials.ts`

The credential stores the server's base URL, the Rocket.Chat user ID, and the personal access token. It injects `X-Auth-Token` and `X-User-Id` into every request.

```typescript
import type {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class RocketchatApi implements ICredentialType {
  name = 'rocketchatApi';

  displayName = 'Rocket.Chat API';

  icon: Icon = {
    light: 'file:../icons/rocketchat.svg',
    dark: 'file:../icons/rocketchat.dark.svg',
  };

  documentationUrl = 'https://developer.rocket.chat/apidocs#rocketchat-rest-api/';

  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: '',
      placeholder: 'https://chat.example.com',
      required: true,
      description: 'URL of the Rocket.Chat server, without a trailing slash',
    },
    {
      displayName: 'User ID',
      name: 'userId',
      type: 'string',
      default: '',
      required: true,
      description: 'Rocket.Chat user ID for the personal access token owner',
    },
    {
      displayName: 'Auth Token',
      name: 'authToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Rocket.Chat personal access token',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'X-Auth-Token': '={{$credentials?.authToken}}',
        'X-User-Id': '={{$credentials?.userId}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.baseUrl}}',
      url: '/api/v1/me',
      method: 'GET',
    },
  };
}
```

Notes:

- `baseUrl` must not end with `/` because endpoint paths begin with `/api/v1/`.
- The credential test calls `/api/v1/me`, which requires auth but no extra permissions.
- The `icon` path is relative to the `credentials/` directory.

## Node implementation

File: `nodes/Rocketchat/Rocketchat.node.ts`

```typescript
import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { messageDescription } from './resources/message';
import { channelDescription } from './resources/channel';
import { groupDescription } from './resources/group';
import { roomDescription } from './resources/room';
import { userDescription } from './resources/user';

export class Rocketchat implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Rocket.Chat',
    name: 'rocketchat',
    icon: {
      light: 'file:../../icons/rocketchat.svg',
      dark: 'file:../../icons/rocketchat.dark.svg',
    },
    group: ['input'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Rocket.Chat REST API',
    defaults: {
      name: 'Rocket.Chat',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'rocketchatApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Message', value: 'message' },
          { name: 'Channel', value: 'channel' },
          { name: 'Group', value: 'group' },
          { name: 'Room', value: 'room' },
          { name: 'User', value: 'user' },
        ],
        default: 'message',
      },
      ...messageDescription,
      ...channelDescription,
      ...groupDescription,
      ...roomDescription,
      ...userDescription,
    ],
  };
}
```

Notes:

- `name` must be unique and match the class file's base name convention (lowercase, no spaces).
- `icon` path is relative to the node file location: two levels up to reach `icons/`.
- `requestDefaults.baseURL` reads from the selected credential.

## Resource and operation pattern

Each resource file exports an `INodeProperties[]` array. The first element is the **Operation** selector, shown only when its resource is selected. Remaining elements are fields for each operation.

File: `nodes/Rocketchat/resources/message.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMessages = {
  resource: ['message'],
};

export const messageDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForMessages,
    },
    options: [
      {
        name: 'Send',
        value: 'send',
        action: 'Send a chat message',
        description: 'Send a message to a room',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/chat.sendMessage',
          },
          send: {
            type: 'body',
            value: '={{ { message: { rid: $parameter.roomId, text: $parameter.text } } }}',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update a chat message',
        description: 'Update an existing message',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/chat.update',
          },
          send: {
            type: 'body',
            value: '={{ { roomId: $parameter.roomId, msgId: $parameter.messageId, text: $parameter.text } }}',
          },
        },
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete a chat message',
        description: 'Delete a message by ID',
        routing: {
          request: {
            method: 'POST',
            url: '/api/v1/chat.delete',
          },
          send: {
            type: 'body',
            value: '={{ { roomId: $parameter.roomId, msgId: $parameter.messageId } }}',
          },
        },
      },
    ],
    default: 'send',
  },
  {
    displayName: 'Room ID',
    name: 'roomId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['send', 'update', 'delete'],
      },
    },
    description: 'ID of the room the message belongs to',
  },
  {
    displayName: 'Message ID',
    name: 'messageId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['update', 'delete'],
      },
    },
    description: 'ID of the message to update or delete',
  },
  {
    displayName: 'Text',
    name: 'text',
    type: 'string',
    typeOptions: { rows: 4 },
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['send', 'update'],
      },
    },
    description: 'Message text',
  },
];
```

This pattern scales to the other resources:

1. Define a `showOnlyFor<Resource>` display option.
2. Export an `operation` selector with one option per REST endpoint.
3. Put the request method, URL, and body expression in each option's `routing` block.
4. Add fields below, each gated by `resource` and `operation`.

Keep shared fields such as `roomId` and `userId` in `nodes/Rocketchat/shared/descriptions.ts` so each resource file imports and spreads them.

## Rocket.Chat REST specifics

### Authentication

Every request needs two headers:

```http
X-Auth-Token: <auth-token>
X-User-Id: <user-id>
```

These are injected by the credential's `authenticate` block.

### Send a message

- **Endpoint**: `POST /api/v1/chat.sendMessage`
- **Body**: `{ "message": { "rid": "<room-id>", "text": "<message>" } }`
- **Response**: `{ "message": { ... }, "success": true }`

Source: [Rocket.Chat Developer Docs — Send Message](https://developer.rocket.chat/apidocs/send-message)

### Get room information

- **Endpoint**: `GET /api/v1/rooms.info`
- **Query**: `?roomId=<room-id>` or `?roomName=<room-name>`
- **Response**: `{ "room": { ... }, "success": true }`

Source: [Rocket.Chat Developer Docs — Get Room Information](https://developer.rocket.chat/apidocs/get-room-information)

### Other endpoints to map

Map each operation to a documented endpoint. Examples:

| Operation | Endpoint |
|-----------|----------|
| Create channel | `POST /api/v1/channels.create` |
| Archive channel | `POST /api/v1/channels.archive` |
| Delete channel | `POST /api/v1/channels.delete` |
| Create group | `POST /api/v1/groups.create` |
| Archive group | `POST /api/v1/groups.archive` |
| Delete group | `POST /api/v1/groups.delete` |
| Get room members | `GET /api/v1/channels.members` / `groups.members` |
| Invite user to channel | `POST /api/v1/channels.invite` |
| Kick user from channel | `POST /api/v1/channels.kick` |
| List users | `GET /api/v1/users.list` |
| Get user | `GET /api/v1/users.info` |

Always verify the exact request shape in the current Rocket.Chat docs before shipping an operation.

## Local development

1. `npm install`
2. `npm run dev` — links the package into the local n8n install.
3. Restart n8n.
4. Open the n8n editor, create a Rocket.Chat credential, and test it.
5. Add a Rocket.Chat node and exercise each operation.

If `npm run dev` fails, check that `n8n-workflow` is installed (it is a peer dependency; install it explicitly for local dev with `npm install n8n-workflow --save-dev` or use `--legacy-peer-deps`).

## Linting

`n8n-node lint` applies the n8n-node ESLint preset. Common issues:

- Using `any` instead of the n8n-workflow types.
- Missing trailing commas or semicolons in description arrays.
- Relative icon paths that do not resolve after build.
- Unused imports flagged by `noUnusedLocals`.

Run `npm run lint:fix` before `npm run lint`.

## Publishing

Use the `publish.yml` workflow from the n8n starter. It triggers on semver tags, runs `npm run release`, and publishes with npm provenance.

Key setup:

- `@n8n/node-cli` must be ≥ 0.23.0.
- Choose npm authentication:
  - **OIDC trusted publishing** (recommended): configure the package on npmjs.com to trust the `publish.yml` workflow from this repository. Leave `NPM_TOKEN` unset.
  - **npm automation token**: add `NPM_TOKEN` as a GitHub repository secret.
- Run `npm run release` locally to bump, commit, tag, and push.
- The tag push triggers the workflow.

Do not run `npm publish` directly from a local machine.

## Verification checklist

Before any tag or release:

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes and `dist/` contains the compiled credential and node.
- [ ] `package.json` `n8n` block points to `dist/credentials/RocketchatApi.credentials.js` and `dist/nodes/Rocketchat/Rocketchat.node.js`.
- [ ] `package.json` has no `dependencies` section.
- [ ] `README.md` matches the shipped operations.
- [ ] `.gitignore` excludes `.env`, `.mcp.json`, and `dist/` from source control.
- [ ] The credential test passes against a live Rocket.Chat server.
- [ ] Each operation returns the expected Rocket.Chat response.
- [ ] `publish.yml` is present and uses semver tag triggers.
- [ ] npm provenance/trusted publishing is configured.

## Security and secrets

- Rocket.Chat credentials are stored by n8n, not by this package. The package only references them through `$credentials` expressions.
- Never commit `.mcp.json`, `.env`, or any API token file. `.gitignore` already covers them.
- Do not log credential values, full request bodies, or token headers in node code.
- The publish workflow uses OIDC by default; avoid long-lived `NPM_TOKEN` secrets if possible.

## Minimal file list for a working v1

To get the node running locally, these files are enough:

- `package.json`
- `tsconfig.json`
- `credentials/RocketchatApi.credentials.ts`
- `nodes/Rocketchat/Rocketchat.node.ts`
- `nodes/Rocketchat/resources/message.ts`
- `icons/rocketchat.svg`
- `README.md`
- `LICENSE`
- `.gitignore`

Add remaining resources, `.github/workflows/publish.yml`, and a dark icon after the core node works.

## Decisions and rationale

| Decision | Rationale |
|----------|-----------|
| Declarative routing instead of a custom `execute` method | Fewer files, less code, and n8n handles retries, credential injection, and response parsing. |
| Personal access token credential only | Matches README, avoids OAuth2 redirect complexity, and is the fastest path to a verified node. |
| `baseUrl` in the credential | One credential can target one server; multiple servers are handled by creating multiple credentials. |
| No runtime dependencies | Required for n8n verified status and keeps the package small. |
| One node class with multiple resources | Standard n8n pattern; keeps the editor surface area small and maintainable. |

## References

- [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Building Community Nodes](https://docs.n8n.io/integrations/community-nodes/building-community-nodes)
- [n8n Nodes Starter](https://github.com/n8n-io/n8n-nodes-starter)
- [Rocket.Chat REST API documentation](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
- [Rocket.Chat Developer Docs — Send Message](https://developer.rocket.chat/apidocs/send-message)
- [Rocket.Chat Developer Docs — Get Room Information](https://developer.rocket.chat/apidocs/get-room-information)
- `PROJECT_REFERENCE.md` and `PROJECT_PLAN.md` in this repository
