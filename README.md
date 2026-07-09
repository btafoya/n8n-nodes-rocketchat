# @btafoya/n8n-nodes-rocketchat

[![npm version](https://img.shields.io/npm/v/@btafoya/n8n-nodes-rocketchat.svg)](https://www.npmjs.com/package/@btafoya/n8n-nodes-rocketchat)
[![npm downloads](https://img.shields.io/npm/dm/@btafoya/n8n-nodes-rocketchat.svg)](https://www.npmjs.com/package/@btafoya/n8n-nodes-rocketchat)
[![License](https://img.shields.io/github/license/btafoya/n8n-nodes-rocketchat.svg)](https://github.com/btafoya/n8n-nodes-rocketchat/blob/main/LICENSE)
[![Publish](https://github.com/btafoya/n8n-nodes-rocketchat/actions/workflows/publish.yml/badge.svg)](https://github.com/btafoya/n8n-nodes-rocketchat/actions/workflows/publish.yml)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-purple.svg)](https://docs.n8n.io/integrations/community-nodes/)

An [n8n](https://n8n.io/) community node for [Rocket.Chat](https://www.rocket.chat/). Use it to send messages, manage channels and rooms, and interact with the Rocket.Chat REST API from your workflows.

> **Beta notice:** This node is in beta. It will be published to npm once beta testing is complete.

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

Create a Rocket.Chat credential in n8n with:

- **Base URL** — the URL of your Rocket.Chat server, e.g. `https://chat.example.com`.
- **User ID** — your Rocket.Chat user ID.
- **Auth Token** — a personal access token for that user.

To generate a personal access token, open Rocket.Chat → **My Account** → **Personal Access Tokens**.

## Operations

This node exposes common Rocket.Chat REST API operations, including:

- Send, update, and delete chat messages.
- Create, update, archive, and delete channels and groups.
- Get room information and members.
- Invite and kick users from rooms.
- List and manage users.

## Resources

- [n8n Community Nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Rocket.Chat REST API documentation](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
- [n8n workflow examples](https://docs.n8n.io/workflows/)

## License

[MIT](LICENSE)
