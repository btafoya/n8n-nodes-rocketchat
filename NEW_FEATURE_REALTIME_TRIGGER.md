# Feature Request: Rocket.Chat Realtime API Trigger

## Goal

Add a trigger node that listens to Rocket.Chat's [Realtime API](https://developer.rocket.chat/apidocs/realtimeapi) (WebSocket / DDP) so n8n workflows can react to live events instead of polling REST endpoints.

## Motivation

The current v1 node exposes only REST API operations. Users who want to react to new messages, room membership changes, or user status updates must poll `rooms.info`, `channels.messages`, or `users.list`. A realtime trigger would:

- Reduce latency between a Rocket.Chat event and workflow execution.
- Lower server load on both n8n and Rocket.Chat by eliminating polling.
- Unlock event-driven use cases: auto-responders, moderation bots, presence-driven routing.

## Scope

### In scope

- A new trigger node registered alongside the existing `Rocketchat` node.
- WebSocket connection to Rocket.Chat's `/websocket` endpoint using DDP.
- Authentication via the existing personal access token credential (`rocketchatApi`).
- Subscriptions to public channel and private group message streams.
- Output of received messages in n8n's standard item format.
- Manual stop / connection cleanup when the workflow is deactivated.
- OAuth2 authentication for the trigger.

### Out of scope

- Subscriptions to direct messages, livechat, or custom streams.
- Sending messages through the realtime connection (use the existing REST node).
- Reconnection / backoff logic beyond a single automatic retry.
- Multi-room batch subscriptions in one node instance.

## Reference

- [Rocket.Chat Realtime API documentation](https://developer.rocket.chat/apidocs/realtimeapi)
- Local reference `ROCKETCHAT_REALTIME_API.md`
- [Rocket.Chat DDP message format](https://developer.rocket.chat/apidocs/methods)
- Existing package docs:
  - `PROJECT_REFERENCE.md`
  - `PROJECT_PLAN.md`
  - `DESIGN.md`
  - `FULL_PROJECT_TECHNCIAL_REFERENCE.md`

## Technical approach

### Connection

Rocket.Chat exposes DDP over WebSocket at:

```
wss://<baseUrl>/websocket
```

The node opens this connection using the credential's `baseUrl` and authenticates with the personal access token via the DDP `login` method:

```json
{
  "msg": "method",
  "method": "login",
  "params": [
    {
      "resume": "<authToken>"
    }
  ],
  "id": "1"
}
```

After authentication, the node subscribes to a stream:

```json
{
  "msg": "sub",
  "name": "stream-room-messages",
  "params": ["<roomId>", false],
  "id": "2"
}
```

### Node type

This must be a **trigger node** (`ITriggerNodeType`), not a regular action node, because it initiates workflows rather than processing input. Trigger nodes require:

- `triggerDescription` with `event` and `schedule` types.
- A `trigger` method that establishes the WebSocket connection and emits items.
- A `closeFunction` (or equivalent cleanup) invoked on workflow deactivation.

### New files

| File | Responsibility |
|------|----------------|
| `nodes/RocketchatRealtime/RocketchatRealtimeTrigger.node.ts` | Trigger node class, WebSocket management, DDP message handling |
| `nodes/RocketchatRealtime/transport.ts` | Thin DDP client wrapper around `ws` or Node's built-in `WebSocket` |
| `nodes/RocketchatRealtime/types.ts` | DDP message and event TypeScript interfaces |
| `nodes/RocketchatRealtime/resources/events.ts` | Event selector description and routing |
| `nodes/RocketchatRealtime/shared/descriptions.ts` | Trigger-specific fields (`roomId`, `roomType`) |
| `icons/rocketchat-realtime.svg` | Trigger node icon (reuse base shape with a pulse indicator if desired) |

### Modified files

| File | Change |
|------|--------|
| `package.json` | Add `dist/nodes/RocketchatRealtime/RocketchatRealtimeTrigger.node.js` to `n8n.nodes` |
| `tsconfig.json` | No change needed; `nodes/**/*` already covers the new directory |
| `README.md` | Document the trigger, authentication, and supported events |
| `PROJECT_PLAN.md` | Move "real-time subscriptions" from out-of-scope to a new phase |
| `DESIGN.md` | Add the trigger to the architecture diagram and decisions table |

## Dependencies question

The v1 package has **no runtime dependencies** by design. WebSocket support in Node.js is available through:

1. The built-in `ws` module is **not** part of Node.js core.
2. `n8n-workflow` may expose helpers, but relying on internal helpers is risky.
3. Adding `ws` as a `peerDependency` or `devDependency` does not satisfy runtime use in n8n's worker process.

**Decision needed:** either add `ws` as the first runtime dependency (breaking the verified-node constraint) or use Node.js's built-in `net`/`http` to implement a minimal WebSocket handshake manually. The latter keeps the no-runtime-deps rule intact but increases complexity and maintenance burden.

## Operations and events

| Event | DDP subscription | Output |
|-------|------------------|--------|
| New message in channel | `stream-room-messages` with `roomId` | Message object (`_id`, `rid`, `msg`, `u`, `ts`) |
| New message in group | `stream-room-messages` with `roomId` | Message object |
| User status change | `stream-user-presence` | User presence object |

For v1 of the trigger, limit to the **New message** event in one channel or group selected by the user.

## UI fields

The trigger node should expose:

1. **Authentication** — selector limited to personal access token (`rocketchatApi`).
2. **Room Type** — `channel` or `group`.
3. **Room ID** — the room to subscribe to.
4. **Event** — currently only `newMessage`.

## Data flow

```
Workflow activated
        │
        ▼
Trigger node opens WebSocket to wss://<baseUrl>/websocket
        │
        ▼
DDP connect → login with authToken → subscribe to stream-room-messages
        │
        ▼
Rocket.Chat pushes new messages
        │
        ▼
Trigger parses message and emits n8n item(s)
        │
        ▼
Workflow deactivated → close WebSocket
```

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebSocket library dependency breaks verified-node status | High | Decide up front between adding `ws` to `dependencies` or hand-rolling a minimal client. Document the choice. |
| Persistent connections in n8n worker scaling | Medium | Ensure `closeFunction` terminates the socket; test with multiple workflow activations. |
| Rocket.Chat DDP version differences | Medium | Target the same server versions as the REST node (6.x LTS) and document compatibility. |
| Auth token rotation invalidates long-lived connections | Medium | Surface disconnect errors; rely on user to reconnect by reactivating the workflow. |
| Trigger output shape differs from REST `chat.sendMessage` | Low | Match the REST node's message JSON structure in output items so downstream nodes are interchangeable. |

## Acceptance criteria

1. `npm run lint` and `npm run build` pass with the new trigger node.
2. The trigger appears in n8n's trigger node list after `npm run dev`.
3. Activating a workflow with the trigger opens a WebSocket and authenticates successfully.
4. Sending a message in the subscribed Rocket.Chat room emits an item in n8n.
5. Deactivating the workflow closes the WebSocket cleanly.
6. `README.md` explains trigger setup and limitations.
7. `PROJECT_PLAN.md` and `DESIGN.md` reflect the new feature.

## Open questions

1. Is adding `ws` to `dependencies` acceptable, or must the no-runtime-deps rule be preserved?
2. Should the trigger also support OAuth2 credentials?
3. Should direct-message streams be supported, or only public channels and private groups?
4. What is the target Rocket.Chat version for DDP compatibility?
5. Is there a dedicated test Rocket.Chat server available for long-lived WebSocket testing?

## Recommendation

Defer the dependency decision until the maintainer confirms whether verified-node status is required for this feature. If verified status must be preserved, implement a minimal native WebSocket client. If convenience is preferred, add `ws` as the sole runtime dependency and document the trade-off.
