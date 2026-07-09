# Implementation Workflow: @btafoya/n8n-nodes-rocketchat

Generated from `DESIGN.md`.

## Goal

Implement the Rocket.Chat n8n community node package in one run: one node, two credentials, five resources, no runtime dependencies, declarative routing only.

## Execution order

Run each phase in order. Do not start a phase until the previous phase's checkpoint passes.

### Phase 1 — Scaffold repository files

Files: `package.json`, `tsconfig.json`, `LICENSE`, `.github/workflows/publish.yml`, `.gitignore`

Steps:

1. Create `package.json` with name `@btafoya/n8n-nodes-rocketchat`, scripts, empty `n8n` block placeholders, dev dependencies, peer dependency `n8n-workflow`, and `files: ["dist"]`.
2. Create `tsconfig.json` matching the n8n starter.
3. Add `LICENSE` (MIT).
4. Add `.github/workflows/publish.yml` from the n8n starter.
5. Confirm `.gitignore` already excludes secrets and build output.

Checkpoint: `npm install` completes without errors.

### Phase 2 — Add icons

File: `icons/rocketchat.svg`

Steps:

1. Create a minimal valid SVG icon at `icons/rocketchat.svg`.
2. If a dark variant is available, add `icons/rocketchat.dark.svg`; otherwise reuse the light icon.

Checkpoint: SVG files are valid and reachable from the credential and node icon paths.

### Phase 3 — Implement credentials

Files: `credentials/RocketchatApi.credentials.ts`, `credentials/RocketchatOAuth2Api.credentials.ts`

Steps:

1. Implement `RocketchatApi` (personal access token):
   - Properties: `baseUrl`, `userId`, `authToken`.
   - Inject `X-Auth-Token` and `X-User-Id` headers.
   - Test request to `GET /api/v1/me`.
2. Implement `RocketchatOAuth2Api` (OAuth2):
   - Extend `oAuth2Api`.
   - Properties: `baseUrl`, `userId`, `clientId`, `clientSecret`.
   - Set authorization URL, access token URL, scope, grant type.
   - Map OAuth2 token to `X-Auth-Token` header and use `userId` for `X-User-Id`.
   - Test request to `GET /api/v1/me`.
3. Update `package.json` `n8n.credentials` array to point to both compiled credential files.

Checkpoint:
- `npm run build` compiles both credentials.
- `npm run lint` passes.

### Phase 4 — Implement the node shell

File: `nodes/Rocketchat/Rocketchat.node.ts`

Steps:

1. Create the `Rocketchat` class implementing `INodeType`.
2. Add `displayName`, `name`, `icon`, `group`, `version`, `subtitle`, `description`, `defaults`, `usableAsTool`, `inputs`, `outputs`.
3. Add `credentials` array with two entries gated by `authentication` parameter (`accessToken` vs `oAuth2`).
4. Add `requestDefaults` reading `baseURL` from the selected credential and setting `Content-Type: application/json`.
5. Add `properties` with `authentication` and `resource` selectors.
6. Update `package.json` `n8n.nodes` array to point to the compiled node file.

Checkpoint:
- `npm run build` compiles the node.
- `npm run lint` passes.
- `npm run dev` links the package locally.

### Phase 5 — Implement shared fields

File: `nodes/Rocketchat/shared/descriptions.ts`

Steps:

1. Export reusable `INodeProperties` for `roomId`, `userId`, `name`, `messageId`, `text`, and `roomType`.
2. Keep each field generic; resource files will set their own `displayOptions`.

Checkpoint: No standalone build check; validated in Phase 6.

### Phase 6 — Implement resources

Files:

- `nodes/Rocketchat/resources/message.ts`
- `nodes/Rocketchat/resources/channel.ts`
- `nodes/Rocketchat/resources/group.ts`
- `nodes/Rocketchat/resources/room.ts`
- `nodes/Rocketchat/resources/user.ts`

Steps:

For each resource file:

1. Define `showOnlyFor<Resource>` display options.
2. Add the `operation` selector with one option per endpoint.
3. In each operation option, add `routing.request` (method + URL) and `routing.send` (body/query expressions).
4. Add fields by spreading shared descriptions and gating with `displayOptions`.

Resource-specific operations:

| Resource | Operations |
|----------|------------|
| Message | Send, Update, Delete |
| Channel | Create, Archive, Delete |
| Group | Create, Archive, Delete |
| Room | Get Info, Get Members |
| User | List, Get, Invite to Room, Kick from Room |

Checkpoint:
- `npm run build` succeeds for all resources.
- `npm run lint` passes.
- Node appears in n8n editor with all resources and operations.

### Phase 7 — Wire resources into the node

File: `nodes/Rocketchat/Rocketchat.node.ts`

Steps:

1. Import each resource description array.
2. Spread them into the `properties` array after the `resource` selector.

Checkpoint:
- `npm run build` succeeds.
- `npm run lint` passes.

### Phase 8 — Validation and local test

Steps:

1. Run `npm run lint:fix`, then `npm run lint`.
2. Run `npm run build`.
3. Run `npm run prepublishOnly`.
4. Run `npm run dev` to link the package locally.
5. Restart n8n and verify the node and credentials are available.

Manual checks (requires running n8n + Rocket.Chat):

- Personal token credential test passes (`/api/v1/me`).
- Send message returns a message object.
- Room info returns a room object.

Checkpoint:
- All npm scripts pass.
- `dist/` contains compiled credential and node files.

### Phase 9 — Finalize and commit

Steps:

1. Review `README.md` against implemented operations and auth methods; update if needed.
2. Run a final `git status`.
3. Stage new and modified files.
4. Commit with a human-authored message describing the implementation.
5. Push to `main` only with explicit user permission.

Checkpoint:
- `main` branch contains the working package.

## Task dependencies

```
Phase 1 ─┬─ Phase 2 ─┬─ Phase 3 ─┬─ Phase 4 ─┬─ Phase 5 ─┬─ Phase 6 ─┬─ Phase 7 ─┬─ Phase 8 ── Phase 9
         │           │           │           │           │           │          │
         └─ LICENSE  └─ Icons    └─ OAuth2   └─ Node     └─ Shared   └─ Resources└─ Lint/Build
```

## Quality gates

| Gate | Command | Must pass in phases |
|------|---------|---------------------|
| Install | `npm install` | 1 |
| Build | `npm run build` | 3, 4, 6, 7, 8 |
| Lint | `npm run lint` | 3, 4, 6, 7, 8 |
| Prepublish | `npm run prepublishOnly` | 8 |
| Local link | `npm run dev` | 4, 8 |
| Manual smoke test | n8n editor + Rocket.Chat | 8 |

## Notes

- No runtime dependencies are allowed at any point.
- If an operation cannot be expressed declaratively, fall back to a minimal `execute` method for that operation only.
- Do not add features beyond `DESIGN.md` unless the user explicitly requests them.
- Commit authorship must be `Brian Tafoya <btafoya@briantafoya.com>` with no AI attribution.
