# Rocket.Chat Realtime API Documentation

> **Source:** `https://developer.rocket.chat/apidocs/realtimeapi`  
> **Canonical:** `developer.rocket.chat/realtimeapi`  
> **Updated:** 2026-05-14T19:25:03Z  
> **Published:** 2026-05-14T21:41:09Z

---

## Overview

Rocket.Chat's real-time API lets developers embed live messaging and collaboration features into their own applications. The API uses WebSockets to establish a real-time link between a client application and a Rocket.Chat server. Through this connection, applications can support interactive experiences such as sending and receiving messages, joining live chats, and accessing collaboration tools.

To get started, point your client at the WebSocket endpoint:

```plaintext
wss://[ABC.DOMAIN.COM]/websocket
```

> For localhost, use `ws://localhost:3000/websocket`.

---

## Core Components

The API consists of two parts that operate over the same WebSocket connection:

- **Method Calls** — documented at `/v1-api/apidocs/realtime-method-calls`
- **Subscriptions** — documented at `/v1/docs/subscriptions` and `/reference/api/realtime-api/subscriptions`

Both use a single RPC message format:

```json
{
    "msg": "type-of-communication",
    "id": "unique-id",
    ... // per call defined data
}
```

The `msg` value depends on the communication type:

- Method Calls: `"method"`
- Subscriptions: `"sub"`

> [!WARNING]
> ⚠️ **Warning: Deprecated**
>
> The documentation states that "Method Calls are deprecated." Rocket.Chat is "no longer actively testing or maintaining these methods," and warns that "their behavior may be unreliable or change without notice." For new development and long-term support, the page recommends "using the REST APIs instead," and advises teams to "Avoid relying on DDP methods for critical functionality."

---

## Connect to the WebSocket

Before sending any method calls or subscriptions, the client must send a connect message:

```json
{
    "msg": "connect",
    "version": "1",
    "support": ["1"]
}
```

---

## Connection Keepalive

The server periodically sends `ping` messages. The client must reply with `pong` messages to keep the connection alive. The expected response is:

```json
{
    "msg": "pong"
}
```

If the client fails to respond, the server will close the connection.

---

## Method Calls

<!-- Source: https://developer.rocket.chat/apidocs/realtime-method-calls.md -->

---
title: "Method Calls"
slug: "realtime-method-calls"
updated: 2026-05-14T21:31:34Z
published: 2026-05-14T21:41:19Z
canonical: "developer.rocket.chat/realtime-method-calls"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Method Calls

> [!WARNING]
> ⚠️ **Warning: Deprecated**
>
> The DDP methods outlined are deprecated. We are no longer actively testing or maintaining these methods, and their behavior may be unreliable or change without notice. For new development and long-term support, we strongly recommend using the REST APIs instead. Avoid relying on DDP methods for critical functionality.

Method calls are used to send data to the server to perform actions. The response to these calls is asynchronous, meaning they don't occur in a specific order. To track the outcome of a call, it's essential to use a unique ID. This ID will be used in the response, allowing the client to identify and retrieve the result of the corresponding call.

Here is an example of a method call and response for [creating a channel](/v1/docs/create-channels):

## Example call

```json
{
    "msg": "method",
    "method": "createChannel",
    "id": "2",
    "params": [
        "test-websocket",
        ["doe.john"],
        false
    ]
}
```

## Example response

```json
{
    "msg": "result",
    "id": "2",
    "result": [
        { "rid": "BBkfgYT2azf7RPTTg" }
    ]
}
```

> [!NOTE]
> The `id` is the only way to recognize which method call a response belongs to.

You can also perform a method call via REST API using the [Execute a Meteor method call endpoint](/apidocs/execute-a-meteor-method-call).

---

## Realtime Method Call and Subscription Pages

The following pages are indexed under `v1-api` in `https://developer.rocket.chat/llms.txt`:

- [Register User (Realtime)](https://developer.rocket.chat/apidocs/register-user-realtime.md)
- [Login (Realtime)](https://developer.rocket.chat/apidocs/login-realtime.md)
- [Realtime Two Factor Authentication](https://developer.rocket.chat/apidocs/realtime-twofactor-authentication.md)
- [Get Rooms (Realtime)](https://developer.rocket.chat/apidocs/get-rooms-realtime.md)
- [Get Room by ID (Realtime)](https://developer.rocket.chat/apidocs/get-room-by-id-realtime.md)
- [Get Room Name by ID (Realtime)](https://developer.rocket.chat/apidocs/get-room-name-by-id-realtime.md)
- [Archive Rooms (Realtime)](https://developer.rocket.chat/apidocs/archive-rooms-realtime.md)
- [Unarchive Rooms (Realtime)](https://developer.rocket.chat/apidocs/unarchive-rooms-realtime.md)
- [Favorite/Unfavorite a Room (Realtime)](https://developer.rocket.chat/apidocs/favoriteunfavorite-a-room-realtime.md)
- [Hide Rooms (Realtime)](https://developer.rocket.chat/apidocs/hide-rooms-realtime.md)
- [Open Rooms (Realtime)](https://developer.rocket.chat/apidocs/open-rooms-realtime.md)
- [Leave Rooms (Realtime)](https://developer.rocket.chat/apidocs/leave-rooms-realtime.md)
- [Create Direct Message (Realtime)](https://developer.rocket.chat/apidocs/create-direct-message-realtime.md)
- [Create Private Room (Realtime)](https://developer.rocket.chat/apidocs/create-private-room-realtime.md)
- [Notify Room Stream (Realtime)](https://developer.rocket.chat/apidocs/notify-room-stream-realtime.md)
- [Load History (Realtime)](https://developer.rocket.chat/apidocs/load-room-stream-realtime.md)
- [Add Room Leader (Realtime)](https://developer.rocket.chat/apidocs/add-room-leader-realtime.md)
- [Add Room Moderator (Realtime)](https://developer.rocket.chat/apidocs/add-room-moderator-realtime.md)
- [Add Room Owner (Realtime)](https://developer.rocket.chat/apidocs/add-room-owner-realtime.md)
- [Add User to a Room (Realtime)](https://developer.rocket.chat/apidocs/add-user-to-a-room-realtime.md)
- [Save Room Settings (Realtime)](https://developer.rocket.chat/apidocs/save-room-settings-realtime.md)
- [Create Channels (Realtime)](https://developer.rocket.chat/apidocs/create-channels-realtime.md)
- [Create Private Groups (Realtime)](https://developer.rocket.chat/apidocs/create-private-groups-realtime.md)
- [Join Channels (Realtime)](https://developer.rocket.chat/apidocs/join-channels-realtime.md)
- [Send Message (Realtime)](https://developer.rocket.chat/apidocs/send-message-realtime.md)
- [Get Single Message (Realtime)](https://developer.rocket.chat/apidocs/get-single-message-realtime.md)
- [Star/Unstar Message (Realtime)](https://developer.rocket.chat/apidocs/starunstar-message-realtime.md)
- [Pin Message (Realtime)](https://developer.rocket.chat/apidocs/pin-message-realtime.md)
- [Unpin Message (Realtime)](https://developer.rocket.chat/apidocs/unpin-message-realtime.md)
- [Update Message (Realtime)](https://developer.rocket.chat/apidocs/update-message-realtime.md)
- [Set User Presence (Realtime)](https://developer.rocket.chat/apidocs/set-user-presence-realtime.md)
- [Fetch My Keys (Realtime)](https://developer.rocket.chat/apidocs/fetch-my-keys-realtime.md)
- [Get Users of Room Without Key (Realtime)](https://developer.rocket.chat/apidocs/get-users-of-room-without-key-realtime.md)
- [Set Room Key ID (Realtime)](https://developer.rocket.chat/apidocs/set-room-key-id-realtime.md)
- [Set User Public and Private Keys (Realtime)](https://developer.rocket.chat/apidocs/set-user-public-and-private-keys-realtime.md)
- [Update Group Key (Realtime)](https://developer.rocket.chat/apidocs/update-group-key-realtime.md)
- [Add OAuth Service (Realtime)](https://developer.rocket.chat/apidocs/add-oauth-service-realtime.md)
- [Remove OAuth Service (Realtime)](https://developer.rocket.chat/apidocs/remove-oauth-service-realtime.md)
- [Refresh OAuth Service (Realtime)](https://developer.rocket.chat/apidocs/refresh-oauth-service-realtime.md)
- [Get Permissions (Realtime)](https://developer.rocket.chat/apidocs/get-permissions-realtime.md)
- [Assign Permission to Role (Realtime)](https://developer.rocket.chat/apidocs/assign-permission-to-role-realtime.md)
- [Get Public Settings (Realtime)](https://developer.rocket.chat/apidocs/get-public-settings-realtime.md)
- [Restart Server (Realtime)](https://developer.rocket.chat/apidocs/restart-server-realtime.md)
- [Get Subscriptions (Realtime)](https://developer.rocket.chat/apidocs/get-subscriptions-realtime.md)
- [Spotlight Search (Realtime)](https://developer.rocket.chat/apidocs/spotlight-search-realtime.md)
- [Notify Logged-In Users (Realtime)](https://developer.rocket.chat/apidocs/notify-logged-in-users-realtime.md)
- [Notify Room Users (Realtime)](https://developer.rocket.chat/apidocs/notify-room-users-realtime.md)
- [Room Stream (Realtime)](https://developer.rocket.chat/apidocs/room-stream-realtime.md)
- [Stream Room Messages (Realtime)](https://developer.rocket.chat/apidocs/stream-room-messages-realtime.md)
- [Notify User (Realtime)](https://developer.rocket.chat/apidocs/notify-user-realtime.md)
- [Notify All Users (Realtime)](https://developer.rocket.chat/apidocs/notify-all-users-realtime.md)
- [Send Livechat Message (Realtime)](https://developer.rocket.chat/apidocs/send-livechat-message-realtime.md)
- [Subscribe to Livechat Room (Realtime)](https://developer.rocket.chat/apidocs/subscribe-to-livechat-room-realtime.md)

---

## Resources

- [rocketchat-ddp-listener](https://github.com/JSzaszvari/rocketchat-ddp-listener): A basic example script using the `ddp` Node.js package to subscribe to the real-time API stream of a group or channel.
- [Rocket.Chat.RealTime.API.RxJS](https://github.com/inf3cti0n95/Rocket.Chat.RealTime.API.RxJS): An abstraction for using Rocket.Chat real-time API methods with [RxJS](http://reactivex.io/rxjs/).
- [rocketchat-async](https://github.com/hynek-urban/rocketchat-async): An asyncio-based Python wrapper for the Rocket.Chat real-time API.

---

## Note on completeness

The Realtime API landing page is an overview. The detailed per-call reference (request/response schemas, parameter definitions, and subscription stream formats) lives on the individual method-call and subscription pages listed above. Inlining all of them would require fetching 50+ separate articles. This file contains a complete local copy of the overview, connection handshake, keepalive rules, deprecation warning, the method-calls summary page, and the full index of realtime pages.
