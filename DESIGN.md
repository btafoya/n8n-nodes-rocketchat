# Design: @btafoya/n8n-nodes-rocketchat

## What this document is

A compact design for a single n8n community node package. It fits one implementation run: one node, two credential options, a handful of resources, and no custom runtime code beyond n8n's declarative routing.

## Goal

Expose common Rocket.Chat REST API operations inside n8n with the smallest possible package that still qualifies as a verified community node.

## System context

- n8n loads community node packages from npm.
- The package registers **two credentials** and **one node** through the `n8n` block in `package.json`.
- n8n handles credential storage, HTTP execution, retries, OAuth2 token refresh, and response parsing.
- The package contributes only TypeScript descriptions and a few SVG icons.

```
n8n editor / worker
    │
    ├─ loads node from dist/nodes/Rocketchat/Rocketchat.node.js
    ├─ loads credentials from dist/credentials/RocketchatApi.credentials.js
    │                         and dist/credentials/RocketchatOAuth2Api.credentials.js
    │
    └─ at runtime: injects credential headers or OAuth2 bearer token, calls Rocket.Chat REST API
```

## Scope (strict)

### In scope

- Credentials:
  - Rocket.Chat personal access token (`baseUrl`, `userId`, `authToken`).
  - Rocket.Chat OAuth2 (`baseUrl`, `clientId`, `clientSecret`, scope, authorization/token URLs).
- Node: `Rocketchat` with five resources.
- Resources and operations:
  - **Message**: Send, Update, Delete.
  - **Channel**: Create, Archive, Delete.
  - **Group**: Create, Archive, Delete.
  - **Room**: Get Info, Get Members.
  - **User**: List, Get, Invite to Room, Kick from Room.
- One light SVG icon; reuse it for dark mode if no dark variant exists.
- Files needed for build and publish: `package.json`, `tsconfig.json`, `credentials/`, `nodes/`, `icons/`, `LICENSE`, `README.md`, `.github/workflows/publish.yml`.

### Out of scope

- LDAP or any third credential type.
- Custom `execute` methods.
- Subscriptions, webhooks, file uploads, livechat, admin-only endpoints.
- Multi-room or batch operations.
- Runtime dependencies.
- Automated integration tests in CI.

## Component design

### Credentials

#### Personal access token

`credentials/RocketchatApi.credentials.ts`

| Property | Type | Purpose |
|----------|------|---------|
| `baseUrl` | string | Server root URL, e.g. `https://chat.example.com` |
| `userId` | string | Rocket.Chat user ID |
| `authToken` | password | Personal access token |

Responsibilities:

1. Render the three input fields.
2. Inject `X-Auth-Token` and `X-User-Id` headers on every request.
3. Test the credential with `GET /api/v1/me`.

#### OAuth2

`credentials/RocketchatOAuth2Api.credentials.ts`

| Property | Type | Purpose |
|----------|------|---------|
| `baseUrl` | string | Server root URL |
| `clientId` | string | OAuth2 client ID |
| `clientSecret` | password | OAuth2 client secret |

Responsibilities:

1. Extend `oAuth2Api` so n8n handles the OAuth2 flow.
2. Provide Rocket.Chat authorization and token URLs.
3. Inject the OAuth2 access token as `X-Auth-Token` and fetch/return the user ID as `X-User-Id`.

Rocket.Chat OAuth2 endpoints (typical):

- Authorization URL: `https://<baseUrl>/oauth/authorize`
- Access token URL: `https://<baseUrl>/oauth/token`
- Scope: `users:read rooms:read chat:write` (adjust to the smallest working scope)

The credential uses a `generic` `authenticate` block to map the OAuth2 access token into the `X-Auth-Token` header. `X-User-Id` must also be supplied; the simplest path is to ask the user for it in the OAuth2 credential properties, or to call `/api/v1/me` once after token exchange and cache the result. For this minimal design, expose `userId` as an optional OAuth2 property populated from `/api/v1/me` if possible; otherwise ask the user to provide it.

For the first pass, store `userId` as an OAuth2 credential property and test it with `GET /api/v1/me`.

### Node

`nodes/Rocketchat/Rocketchat.node.ts`

A single `INodeType` class. It assembles one `INodeTypeDescription` with:

- An `Authentication` selector so the user picks personal token or OAuth2.
- `requestDefaults` that reads `baseURL` from the selected credential.
- A `Resource` dropdown.
- Spreads from five resource description arrays.
- Credentials gated by the `authentication` parameter.

No methods block. No custom `execute`.

### Resources

Each resource is a plain `INodeProperties[]` array in its own file under `nodes/Rocketchat/resources/`.

| File | Responsibility |
|------|----------------|
| `message.ts` | Send, Update, Delete chat messages |
| `channel.ts` | Create, Archive, Delete channels |
| `group.ts` | Create, Archive, Delete private groups |
| `room.ts` | Get room info, list room members |
| `user.ts` | List users, get a user, invite/kick a user from a room |
| `shared/descriptions.ts` | Reused fields: `roomId`, `userId`, `name` |

Each resource file follows this shape:

1. A `showOnlyFor<Resource>` display option.
2. An `operation` selector with one option per endpoint. Each option carries its own `routing.request` and `routing.send`.
3. Input fields gated by `resource` and `operation`.

## Data flow

```
User selects Authentication (token or OAuth2)
        │
        ▼
User selects Resource + Operation
        │
        ▼
n8n renders operation-specific fields
        │
        ▼
User fills fields; n8n evaluates expressions
        │
        ▼
Selected credential injects auth headers
        │
        ▼
n8n builds request (method, URL, query, body)
        │
        ▼
Request sent to Rocket.Chat server baseUrl + endpoint
        │
        ▼
Rocket.Chat response returned as node output
```

## Operation-to-endpoint mapping

| Resource | Operation | Method | Endpoint | Notes |
|----------|-----------|--------|----------|-------|
| Message | Send | POST | `/api/v1/chat.sendMessage` | Body: `{ message: { rid, text } }` |
| Message | Update | POST | `/api/v1/chat.update` | Body: `{ roomId, msgId, text } }` |
| Message | Delete | POST | `/api/v1/chat.delete` | Body: `{ roomId, msgId }` |
| Channel | Create | POST | `/api/v1/channels.create` | Body: `{ name, members }` |
| Channel | Archive | POST | `/api/v1/channels.archive` | Body: `{ roomId }` |
| Channel | Delete | POST | `/api/v1/channels.delete` | Body: `{ roomId }` |
| Group | Create | POST | `/api/v1/groups.create` | Body: `{ name, members }` |
| Group | Archive | POST | `/api/v1/groups.archive` | Body: `{ roomId }` |
| Group | Delete | POST | `/api/v1/groups.delete` | Body: `{ roomId }` |
| Room | Get Info | GET | `/api/v1/rooms.info` | Query: `roomId` |
| Room | Get Members | GET | `/api/v1/channels.members` or `groups.members` | Query: `roomId` |
| User | List | GET | `/api/v1/users.list` | No required params |
| User | Get | GET | `/api/v1/users.info` | Query: `userId` or `username` |
| User | Invite to Room | POST | `/api/v1/channels.invite` or `groups.invite` | Body: `{ roomId, userId }` |
| User | Kick from Room | POST | `/api/v1/channels.kick` or `groups.kick` | Body: `{ roomId, userId }` |

For member/invite/kick operations, the node exposes a `roomType` parameter to choose channel or group.

## Shared fields

`nodes/Rocketchat/shared/descriptions.ts`

| Field | Type | Used by |
|-------|------|---------|
| `roomId` | string | Messages, archive/delete, room info, members, invite, kick |
| `userId` | string | Invite, kick, get user |
| `name` | string | Create channel/group |
| `text` | string | Send/update message |
| `messageId` | string | Update/delete message |
| `roomType` | options | Channel vs group for invite/kick/members |

## Error handling

No custom error handling. n8n surfaces HTTP errors from Rocket.Chat as standard node errors.

## Icons

- One SVG icon at `icons/rocketchat.svg`.
- Referenced as `file:../icons/rocketchat.svg` from credentials and `file:../../icons/rocketchat.svg` from the node.
- For v1, use the same icon for both light and dark modes.

## Build and publish

- Build: `npm run build` produces `dist/`.
- Lint: `npm run lint` must pass.
- Local install: `npm run dev` links the package into n8n.
- Release: `npm run release` bumps, commits, tags, and pushes.
- Publish: `.github/workflows/publish.yml` runs on semver tags and publishes with provenance.

## Design decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Auth | Personal access token + OAuth2 | README only mentions tokens, but OAuth2 is a common ask; keep both without adding a third |
| Node style | Declarative `INodeTypeDescription` | No custom code; matches n8n starter pattern |
| Resources | Five resources, one node | Keeps editor organized without over-splitting |
| Room type handling | Explicit `roomType` option for channel/group ops | Avoids trying to infer room type from `rid` |
| Dependencies | None | Required for n8n verified node status |
| Icons | One SVG, reused | Lowest file count; dark variant can be added later |

## Files to create

1. `package.json`
2. `tsconfig.json`
3. `LICENSE`
4. `.github/workflows/publish.yml`
5. `icons/rocketchat.svg`
6. `credentials/RocketchatApi.credentials.ts`
7. `credentials/RocketchatOAuth2Api.credentials.ts`
8. `nodes/Rocketchat/Rocketchat.node.ts`
9. `nodes/Rocketchat/shared/descriptions.ts`
10. `nodes/Rocketchat/resources/message.ts`
11. `nodes/Rocketchat/resources/channel.ts`
12. `nodes/Rocketchat/resources/group.ts`
13. `nodes/Rocketchat/resources/room.ts`
14. `nodes/Rocketchat/resources/user.ts`

## Verification

Before finishing the implementation run:

1. `npm install`
2. `npm run lint` — passes
3. `npm run build` — passes and produces `dist/credentials/` and `dist/nodes/`
4. `npm run prepublishOnly` — passes
5. `npm run dev` — links the package for local testing

Manual checks (optional, requires a running n8n + Rocket.Chat):

- Personal token credential test against `/api/v1/me` succeeds.
- OAuth2 credential connects and returns a token/user ID.
- Send message to a room returns a message object.
- Room info query returns a room object.

## References

- `PROJECT_REFERENCE.md`
- `PROJECT_PLAN.md`
- `FULL_PROJECT_TECHNCIAL_REFERENCE.md`
- [n8n Nodes Starter](https://github.com/n8n-io/n8n-nodes-starter)
- [Rocket.Chat REST API documentation](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
