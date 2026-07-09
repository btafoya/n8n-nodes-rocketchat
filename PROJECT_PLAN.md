# Project Plan: @btafoya/n8n-nodes-rocketchat

## Goal

Ship a verified n8n community node package that exposes common Rocket.Chat REST API operations to n8n workflows.

The package is `@btafoya/n8n-nodes-rocketchat`. It has no runtime dependencies, builds with `@n8n/node-cli`, and publishes to npm through GitHub Actions with a provenance statement.

## Constraints

These are fixed by `PROJECT_REFERENCE.md` and n8n's verified-node rules:

- Package name must begin with `@<scope>/n8n-nodes-` or `n8n-nodes-`. Use `@btafoya/n8n-nodes-rocketchat`.
- Keyword `n8n-community-node-package` is required.
- No runtime dependencies. Only `devDependencies` and `peerDependencies`.
- Build output goes to `dist/`; only `dist/` is published via the `files` array.
- `tsconfig.json` must include `credentials/**/*`, `nodes/**/*`, `nodes/**/*.json`, and `package.json`.
- `package.json` must register the node and credential in the `n8n` block.
- `npm run lint`, `npm run build`, and `npm run prepublishOnly` must pass.
- Publishing must use the GitHub Actions `publish.yml` workflow with npm provenance.

## Scope

### In scope for v1

- One credential type: Rocket.Chat personal access token (base URL, user ID, auth token).
- One node with the resources and operations listed in `README.md`:
  - **Message**: send, update, delete.
  - **Channel**: create, update, archive, delete.
  - **Group**: create, update, archive, delete.
  - **Room**: get info, get members.
  - **User**: invite to room, kick from room, list, get.
- Node is usable as an AI tool (`usableAsTool: true`).
- Public `README.md` with install, setup, and operation overview.
- `LICENSE`, `.gitignore`, and GitHub Actions `publish.yml`.
- OAuth2 credential types.
- Real-time subscriptions (WebSocket / DDP).

### Out of scope for v1

- Custom UI components outside n8n's standard property types.
- Admin-only server settings.
- Integration tests against a live Rocket.Chat server in CI.

## Assumptions

- Target Rocket.Chat 6.x or later REST API.
- Personal access tokens are the only auth path needed for the beta.
- n8n's declarative routing can handle all operation shapes; no custom `execute` method is required.
- The package stays on the current branch until an explicit branch request is made.

## Functional requirements

| ID | Requirement |
|----|-------------|
| FR1 | `package.json` registers `dist/credentials/RocketchatApi.credentials.js` in `n8n.credentials`. |
| FR2 | `package.json` registers `dist/nodes/Rocketchat/Rocketchat.node.js` in `n8n.nodes`. |
| FR3 | The credential collects `baseUrl`, `userId`, and `authToken` and injects `X-Auth-Token` and `X-User-Id` headers. |
| FR4 | The credential test calls `GET /api/v1/me` against the configured `baseUrl`. |
| FR5 | Each operation maps to a documented Rocket.Chat REST endpoint and returns the API response. |
| FR6 | Operation fields follow n8n conventions: `displayName`, `name`, `type`, `default`, `description`, `displayOptions`, and `routing`. |
| FR7 | The node is selectable in n8n's editor after `npm run dev` links it locally. |

## Non-functional requirements

| ID | Requirement |
|----|-------------|
| NFR1 | `npm run lint` passes with zero errors. |
| NFR2 | `npm run build` produces only `dist/` and exits clean. |
| NFR3 | No dependency is listed under `dependencies`. |
| NFR4 | README and credential documentation links are public and reachable. |
| NFR5 | Publish workflow triggers only on semver tags and uses `--provenance`. |

## User stories and acceptance criteria

1. **Install from n8n UI**<br>
   As an n8n user, I can install `@btafoya/n8n-nodes-rocketchat` from the community-node panel so that the Rocket.Chat node appears in the node list.<br>
   *Acceptance:* A fresh n8n instance installs the published package without errors.

2. **Create a credential**<br>
   As a workflow builder, I can create a Rocket.Chat credential with base URL, user ID, and auth token so that the credential test succeeds.<br>
   *Acceptance:* `GET /api/v1/me` returns `success: true` when valid credentials are supplied.

3. **Send a message**<br>
   As a workflow builder, I can select the Rocket.Chat node, choose the *Message* resource, and *Send* operation so that a message is posted to the specified room.<br>
   *Acceptance:* `chat.sendMessage` returns a message object with `_id`, `rid`, and `msg`.

4. **Manage a room**<br>
   As a workflow builder, I can create, archive, and delete a channel or group so that room state changes on the Rocket.Chat server.<br>
   *Acceptance:* Each operation succeeds against a test Rocket.Chat server and returns the expected response.

5. **Manage members**<br>
   As a workflow builder, I can invite or kick a user from a room so that the room membership changes.<br>
   *Acceptance:* Subsequent `rooms.info` or `channels.members` calls reflect the membership change.

## Phases

### Phase 0 — Repo skeleton

Create the files the toolchain expects before any source code:

- `package.json` with name, version, scripts, `n8n` block, dev dependencies, peer dependencies, and `files: ["dist"]`.
- `tsconfig.json` matching the n8n starter.
- `.gitignore` excluding `node_modules/`, `dist/`, `*.tsbuildinfo`, `.env`, `.DS_Store`, `.claude/`, `docs/`, `.codegraph/`, `.mcp.json`, `.serena/`.
- `.github/workflows/publish.yml` copied from the n8n starter, updated for this package.
- `LICENSE` (MIT).
- `README.md` already exists; keep it aligned as the node grows.

**Verify:** `npm install` completes and `npm run build` can be invoked (it may fail because source is missing; that is expected at this point).

### Phase 1 — Credential

Implement `credentials/RocketchatApi.credentials.ts`:

- Class `RocketchatApi` implementing `ICredentialType`.
- Properties `baseUrl` (string), `userId` (string), `authToken` (password).
- Generic auth header injection for `X-Auth-Token` and `X-User-Id`.
- Test request to `GET /api/v1/me` using the configured `baseUrl`.

**Verify:**
- `npm run build` compiles the credential.
- `npm run dev` links the package locally.
- The credential appears in n8n and the test passes with valid credentials.

### Phase 2 — Node shell and first operation

Implement the node entry point and the message resource:

- `nodes/Rocketchat/Rocketchat.node.ts` with class `Rocketchat`.
- `nodes/Rocketchat/resources/message.ts` with *Send*, *Update*, and *Delete* operations.
- `nodes/Rocketchat/resources/message/index.ts` if operation files grow large.
- `requestDefaults` points `baseURL` at the credential's `baseUrl` and sets `Content-Type: application/json`.

Start with `chat.sendMessage` because it is the highest-value, lowest-risk operation.

**Verify:**
- The node appears in n8n's editor.
- Sending a message to a known `rid` returns a message object.
- `npm run lint` and `npm run build` pass.

### Phase 3 — Remaining resources

Add resources in this order, each with one resource file and an operation subfolder if needed:

1. **Channel**: `channels.create`, `channels.setType`/`setCustomFields` for update, `channels.archive`, `channels.delete`.
2. **Group**: equivalent group endpoints.
3. **Room**: `rooms.info`, `channels.members`/`groups.members` for members.
4. **User**: `users.list`, `users.info`, plus room invite/kick via `channels.invite`/`channels.kick` or `groups.invite`/`groups.kick`.

**Verify:** Each operation is selectable and executes against a test Rocket.Chat server without a custom `execute` method.

### Phase 4 — Docs, icons, and polish

- Add SVG icons at `icons/rocketchat.svg` (and `rocketchat.dark.svg` if a dark variant is needed).
- Reference icons from the credential and node descriptions.
- Update `README.md` if any operation list changes.
- Run `npm run lint:fix`, then `npm run lint`.
- Run `npm run build`.
- Run `npm run prepublishOnly`.

**Verify:** All commands in Phase 4 exit with status 0.

### Phase 5 — Publish readiness

- Configure npm trusted publishing for the package or add an `NPM_TOKEN` repository secret.
- Ensure the local `git` user is `btafoya@briantafoya.com`.
- Run `npm run release` only after beta testing is complete.
- Confirm the tag push triggers `publish.yml` and the npm page shows a provenance statement.

**Verify:** The published version installs in a fresh n8n instance and the node works.

## Open questions

1. Which exact Rocket.Chat server version is the compatibility target? 6.x, 7.x, or a specific patch?
2. For room-scoped operations, should both `rid` and `roomName` be supported, or only `rid`?
3. Should `chat.postMessage` replace or supplement `chat.sendMessage` for sending?
4. Does the target n8n instance support `usableAsTool`, and are there any tool-schema limits to watch?
5. Is there a dedicated test Rocket.Chat server available for manual acceptance testing?
6. Are SVG icons for Rocket.Chat already cleared for MIT distribution, or should a custom icon be drawn?

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Rocket.Chat endpoint differences between versions | Medium | Target the latest stable LTS and document the version in `README.md`. Test against that version. |
| n8n routing cannot express a request shape | Medium | Fall back to a small `execute` method only for that operation; keep everything else declarative. |
| Dynamic `baseURL` from credential fails at runtime | Medium | Verify the expression in `requestDefaults.baseURL` early in Phase 2. Trim trailing slashes with a `preSend` hook if necessary. |
| npm OIDC trusted publishing misconfiguration | High | Test the OIDC setup on a private prerelease version before the public beta. |
| Scope creep adds runtime dependencies | Medium | Reject any feature that requires a `dependencies` entry without an explicit exception. |

## Decisions

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Auth method | Personal access token only | Simplest credential, matches README, no OAuth2 redirect setup. |
| Node implementation style | Declarative routing with `INodeTypeDescription` | Fewest files, easiest to maintain, matches n8n starter's `GithubIssues` example. |
| Base URL storage | In the credential, not the node | One credential can point at different servers without duplicating node config. |
| No runtime dependencies | Enforced at PR review | Keeps the package eligible for verified status and avoids supply-chain bloat. |

## References

- [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Building Community Nodes](https://docs.n8n.io/integrations/community-nodes/building-community-nodes)
- [n8n Nodes Starter](https://github.com/n8n-io/n8n-nodes-starter)
- [Rocket.Chat REST API documentation](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
- `PROJECT_REFERENCE.md` in this repository
