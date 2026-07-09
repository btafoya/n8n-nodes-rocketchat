# @btafoya/n8n-nodes-rocketchat

[![npm version](https://img.shields.io/npm/v/@btafoya/n8n-nodes-rocketchat.svg)](https://www.npmjs.com/package/@btafoya/n8n-nodes-rocketchat)
[![npm downloads](https://img.shields.io/npm/dm/@btafoya/n8n-nodes-rocketchat.svg)](https://www.npmjs.com/package/@btafoya/n8n-nodes-rocketchat)
[![License](https://img.shields.io/github/license/btafoya/n8n-nodes-rocketchat.svg)](https://github.com/btafoya/n8n-nodes-rocketchat/blob/main/LICENSE)
[![Publish](https://github.com/btafoya/n8n-nodes-rocketchat/actions/workflows/publish.yml/badge.svg)](https://github.com/btafoya/n8n-nodes-rocketchat/actions/workflows/publish.yml)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-purple.svg)](https://docs.n8n.io/integrations/community-nodes/)

An [n8n](https://n8n.io/) community node for [Rocket.Chat](https://www.rocket.chat/). Use it to send messages, manage channels and rooms, and interact with the Rocket.Chat REST API from your workflows.

> **Published on npm:** Install the latest version from [npmjs.com](https://www.npmjs.com/package/@btafoya/n8n-nodes-rocketchat) or directly inside n8n.

## Installation

### n8n cloud / managed instances

Community nodes can be installed directly from the n8n editor:

1. Open **Settings** → **Community nodes**.
2. Enter `@btafoya/n8n-nodes-rocketchat` and click **Install**.
3. Accept the security prompt.

### Self-hosted n8n

From your n8n installation directory, run:

```bash
npm install @btafoya/n8n-nodes-rocketchat
```

Then restart n8n.

## Setup

### Personal access token authentication

1. In Rocket.Chat, open **My Account** → **Personal Access Tokens** and create a token.
2. In n8n, create a new **Rocket.Chat API** credential.
3. Enter:
   - **Base URL** — the URL of your Rocket.Chat server, e.g. `https://chat.example.com`.
   - **User ID** — your Rocket.Chat user ID.
   - **Auth Token** — the personal access token.

### OAuth2 authentication

1. In Rocket.Chat, create an OAuth application at **Administration** → **OAuth Apps**.
2. In n8n, create a new **Rocket.Chat OAuth2 API** credential.
3. Enter:
   - **Base URL** — the URL of your Rocket.Chat server.
   - **User ID** — your Rocket.Chat user ID (used for `X-User-Id` headers).
   - **Client ID** and **Client Secret** from the Rocket.Chat OAuth app.
4. Complete the OAuth2 authorization flow in n8n.

## Operations

This node exposes common Rocket.Chat REST API operations, including:

- Send, update, and delete chat messages.
- Create, archive, and delete channels and groups.
- Get room information and members.
- Invite and kick users from rooms.
- List and manage users.

## Authentication

The node supports two authentication methods:

- **Personal access token** — simple and server-wide.
- **OAuth2** — user-scoped, suitable for integrations that act on behalf of a user.

Both methods inject the `X-Auth-Token` and `X-User-Id` headers required by the Rocket.Chat REST API.

## Compatibility

Built and tested against Rocket.Chat 6.x REST API.

## Resources

- [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Rocket.Chat REST API documentation](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
- [Local REST API reference](ROCKETCHAT_REST_API.md) — complete overview and endpoint index
- [Local applied REST API reference](ROCKETCHAT_REST_API_APPLIED.md) — endpoint details for operations implemented in this node
- [Local Realtime API reference](ROCKETCHAT_REALTIME_API.md) — WebSocket/DDP overview and method-call index
- [Rocket.Chat personal access tokens](https://docs.rocket.chat/use-rocket.chat/user-guides/user-panel/account/personal-access-tokens)
- [Rocket.Chat OAuth apps](https://docs.rocket.chat/use-rocket.chat/workspace-administration/settings/oauth-apps)
- [n8n workflow examples](https://docs.n8n.io/workflows/)

## License

[MIT](LICENSE)
