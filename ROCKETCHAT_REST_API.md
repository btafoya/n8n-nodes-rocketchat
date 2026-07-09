# Rocket.Chat API Documentation

> **Local copy generated from:** `https://developer.rocket.chat/apidocs#rocketchat-rest-api`  
> **Discovery index:** `https://developer.rocket.chat/llms.txt`  
> **Canonical:** `developer.rocket.chat/rocketchat-api`  
> **Page updated:** 2026-04-27T11:54:13Z  
> **Page published:** 2026-06-25T15:43:06Z

---

## Focused reference for this project

For the subset of endpoints actually used by `@btafoya/n8n-nodes-rocketchat`, see [`ROCKETCHAT_REST_API_APPLIED.md`](ROCKETCHAT_REST_API_APPLIED.md). It contains the full per-endpoint reference for the implemented operations plus an operation map.

---

## Overview

Rocket.Chat offers three main API surface areas:

1. **Rocket.Chat REST API** — Uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to operate on workspace resources.
2. **Livechat Widget API** — Lets developers embed Omnichannel Livechat features into external applications.
3. **Realtime API** — Provides real-time messaging and collaboration through WebSockets.

Supplementary references include:

- Schema definition
- Deprecated endpoints
- Deprecated parameters

---

## Security considerations for production use

When calling the REST API in production, the documentation recommends:

- Send authentication traffic only over HTTPS to protect credentials.
- Use a strict token-management policy with regular expiration and renewal.
- Assign precise user permissions so endpoint access is limited appropriately.

---

## Rate limiting

Rate limiting is enabled by default for all endpoints. It is described as a mechanism that "helps maintain server stability, prevent misuse, and ensure fair resource usage across all users."

### Configuring rate limits

To change settings, go to **Manage → Workspace → Settings → Rate Limiter → API Rate Limiter**. Key controls include:

- **Enable Rate Limiter** — Turns rate limiting on for REST endpoints.
- **Enable Rate Limiter in Development** — Applies limits in dev environments.
- **Default number of calls to the rate limiter** — Requests allowed per window.
- **Default time limit for the rate limiter (in ms)** — Window length in milliseconds.

To bypass rate limits entirely, assign the `api-bypass-rate-limit` permission to the relevant role.

### Additional rate-limiting options

- **DDP Rate Limit** — Throttles DDP protocol traffic.
- **Feature Limiting** — Restricts usage of specific Rocket.Chat features.

### Customizing rate limits per endpoint

When defining an endpoint with `.addRoute`, set `rateLimiterOptions`:

- `rateLimiterOptions: false` disables limiting for that route.
- A custom object such as `{ numRequestsAllowed: 10, intervalTimeInMS: 60000 }` sets its own allowance and reset interval.

### Response headers

When limiting is active, responses include:

- `x-ratelimit-limit` — Max calls in the current window.
- `x-ratelimit-remaining` — Calls left before reset.
- `x-ratelimit-reset` — Reset time in UTC epoch milliseconds.

> **Warning:** Some endpoints, for example `/api/v1/users.updateOwnBasicInfo`, always enforce rate limiting and cannot be customized or disabled from the administration panel.

---

## Community-maintained language wrappers

Rocket.Chat lists third-party wrappers but notes it does **not** maintain them. They are community-supported.

| Language | Wrapper(s) |
| --- | --- |
| Java | `rocket-chat-rest-client` |
| PHP | `rocketchat-php` |
| Python | `rocketchat_API`, `rocket-python` |
| Ruby | `rocketchat-ruby` |
| Clojure | `rocketchat-clojure` |
| Golang | `rocketchat-golang` |

For languages not listed, the page suggests submitting a feature request through the Rocket.Chat forums.

---

## API Endpoint Index

The following index is derived from `https://developer.rocket.chat/llms.txt` (`v1-api`). Each entry links to the original online page where the full endpoint details (HTTP method, path, parameters, request/response examples, and notes) are maintained.

### Environment & Authentication

- [Environment](https://developer.rocket.chat/apidocs/environment.md)
- [Step 1: Register Yourself as a User](https://developer.rocket.chat/apidocs/step-1-register-yourself-as-a-user.md)
- [Step 2: Authenticate Your User](https://developer.rocket.chat/apidocs/step-2-authenticate-your-user.md)
- [Step 3: Retrieve Your User Information](https://developer.rocket.chat/apidocs/step-3-retrieve-your-user-information.md)
- [Login with Username and Password](https://developer.rocket.chat/apidocs/login-with-username-and-password.md)
- [Login with Facebook](https://developer.rocket.chat/apidocs/login-with-facebook.md)
- [Login with Twitter](https://developer.rocket.chat/apidocs/login-with-twitter.md)
- [Login with Google](https://developer.rocket.chat/apidocs/login-with-google.md)
- [Logout](https://developer.rocket.chat/apidocs/logout.md)
- [Get Profile Information](https://developer.rocket.chat/apidocs/get-profile-information.md)
- [Enable 2FA via Email](https://developer.rocket.chat/apidocs/enable-2fa-via-email.md)
- [Send 2FA Email Code](https://developer.rocket.chat/apidocs/request-a-new-email-code.md)
- [Disable 2FA via Email](https://developer.rocket.chat/apidocs/disable-2fa-via-email.md)
- [Send Two-Factor Challenge Email Code](https://developer.rocket.chat/apidocs/send-two-factor-challenge-email-code.md)
- [Verify Two-Factor Challenge](https://developer.rocket.chat/apidocs/verify-two-factor-challenge.md)

### Users

- [Create User](https://developer.rocket.chat/apidocs/create-user.md)
- [Register User](https://developer.rocket.chat/apidocs/register-user.md)
- [Update User Details](https://developer.rocket.chat/apidocs/update-user.md)
- [Update Own Basic Information](https://developer.rocket.chat/apidocs/update-own-basic-information.md)
- [Get User's Info](https://developer.rocket.chat/apidocs/get-users-info.md)
- [Get Users List](https://developer.rocket.chat/apidocs/get-users-list.md)
- [List Users by Status](https://developer.rocket.chat/apidocs/list-users-by-status.md)
- [Set User Avatar](https://developer.rocket.chat/apidocs/set-user-avatar.md)
- [Get User Avatar](https://developer.rocket.chat/apidocs/get-user-avatar.md)
- [Reset Avatar](https://developer.rocket.chat/apidocs/reset-avatar.md)
- [Set User Status](https://developer.rocket.chat/apidocs/set-user-status.md)
- [Get Status](https://developer.rocket.chat/apidocs/get-status.md)
- [Set User's Status Active](https://developer.rocket.chat/apidocs/set-users-status-active.md)
- [Deactivate Idle Users](https://developer.rocket.chat/apidocs/deactivate-idle-users.md)
- [Get Specific User's Presence](https://developer.rocket.chat/apidocs/get-specific-users-presence.md)
- [Get Users Presence](https://developer.rocket.chat/apidocs/get-users-presence.md)
- [Delete User](https://developer.rocket.chat/apidocs/delete-user.md)
- [Delete Own Account](https://developer.rocket.chat/apidocs/delete-own-account.md)
- [Create Users Token](https://developer.rocket.chat/apidocs/create-users-token.md)
- [Get User's Preferences](https://developer.rocket.chat/apidocs/get-users-preferences.md)
- [Set User Preferences](https://developer.rocket.chat/apidocs/set-user-preferences.md)
- [Forgot Password](https://developer.rocket.chat/apidocs/forgot-password.md)
- [Get Username Suggestion](https://developer.rocket.chat/apidocs/get-username-suggestion.md)
- [Generate Personal Access Token](https://developer.rocket.chat/apidocs/generate-personal-access-token.md)
- [Regenerate Personal Access Token](https://developer.rocket.chat/apidocs/regenerate-personal-access-token.md)
- [Get Personal Access Tokens](https://developer.rocket.chat/apidocs/get-personal-access-tokens.md)
- [Remove Personal Access Token](https://developer.rocket.chat/apidocs/remove-personal-access-token.md)
- [Request Data Download](https://developer.rocket.chat/apidocs/request-data-download.md)
- [Logout Other Clients](https://developer.rocket.chat/apidocs/logout-other-clients.md)
- [Autocomplete User](https://developer.rocket.chat/apidocs/autocomplete-user.md)
- [Remove Other Tokens](https://developer.rocket.chat/apidocs/remove-other-tokens.md)
- [Reset Users E2E Key](https://developer.rocket.chat/apidocs/reset-users-e2e-key.md)
- [Reset Users TOTP](https://developer.rocket.chat/apidocs/reset-users-totp.md)
- [List User's Teams](https://developer.rocket.chat/apidocs/list-users-teams.md)
- [Report User](https://developer.rocket.chat/apidocs/report-user.md)
- [Logout User](https://developer.rocket.chat/apidocs/logout-user.md)
- [Get Avatars](https://developer.rocket.chat/apidocs/get-avatars.md)
- [Check Username Availability](https://developer.rocket.chat/apidocs/check-username-availability.md)
- [Send Welcome Email to User](https://developer.rocket.chat/apidocs/send-user-welcome-email.md)
- [Send Invitation Email](https://developer.rocket.chat/apidocs/send-invitation-email.md)
- [Send Email Verification](https://developer.rocket.chat/apidocs/send-email-verification.md)
- [Get Avatar Suggestion](https://developer.rocket.chat/apidocs/get-avatar-suggestion.md)

### LDAP

- [LDAP Sync](https://developer.rocket.chat/apidocs/ldap-sync.md)
- [Test LDAP Connection](https://developer.rocket.chat/apidocs/test-ldap-connection.md)
- [Test LDAP User Search](https://developer.rocket.chat/apidocs/test-ldap-user-search.md)

### Permissions & Roles

- [List All Permissions](https://developer.rocket.chat/apidocs/list-all-permissions.md)
- [Update Permissions](https://developer.rocket.chat/apidocs/update-permissions.md)
- [Create Role](https://developer.rocket.chat/apidocs/create-role.md)
- [Update Role](https://developer.rocket.chat/apidocs/update-role.md)
- [Assign Role to User](https://developer.rocket.chat/apidocs/assign-role-to-user.md)
- [Get Users of a Role](https://developer.rocket.chat/apidocs/get-users-of-a-role.md)
- [Get Roles](https://developer.rocket.chat/apidocs/get-roles.md)
- [Get Updated Roles](https://developer.rocket.chat/apidocs/get-updated-roles.md)
- [Delete Role](https://developer.rocket.chat/apidocs/delete-role.md)
- [Remove Role from User](https://developer.rocket.chat/apidocs/remove-role-from-user.md)
- [Get Users in Public Roles](https://developer.rocket.chat/apidocs/get-users-in-public-roles.md)

### Groups

- [Get Group Online Users](https://developer.rocket.chat/apidocs/get-group-online-users.md)
- [Get Group Integrations](https://developer.rocket.chat/apidocs/get-group-integrations.md)
- [Add All Users to Group](https://developer.rocket.chat/apidocs/add-all-users-to-group.md)
- [Add Group Leader](https://developer.rocket.chat/apidocs/add-group-leader.md)
- [Add Group Moderator](https://developer.rocket.chat/apidocs/add-group-moderator.md)
- [Add Group Owner](https://developer.rocket.chat/apidocs/add-group-owner.md)
- [Archive a Group](https://developer.rocket.chat/apidocs/archive-a-group.md)
- [Close Group](https://developer.rocket.chat/apidocs/close-group.md)
- [Get Group Counters](https://developer.rocket.chat/apidocs/get-group-counters.md)
- [Create Group](https://developer.rocket.chat/apidocs/create-group.md)
- [Delete Group](https://developer.rocket.chat/apidocs/delete-group.md)
- [Get Group History](https://developer.rocket.chat/apidocs/get-group-history.md)
- [Get Group Information](https://developer.rocket.chat/apidocs/get-group-information.md)
- [Invite Users to Group](https://developer.rocket.chat/apidocs/invite-users-to-group.md)
- [Remove User from Group](https://developer.rocket.chat/apidocs/remove-user-from-group.md)
- [Get List of User Groups](https://developer.rocket.chat/apidocs/get-list-of-user-groups.md)
- [Get Groups](https://developer.rocket.chat/apidocs/get-groups.md)
- [List Group Members](https://developer.rocket.chat/apidocs/list-group-members.md)
- [Get Group Messages](https://developer.rocket.chat/apidocs/get-group-messages.md)
- [Get Group Moderators](https://developer.rocket.chat/apidocs/get-group-moderators.md)
- [Add Group to List](https://developer.rocket.chat/apidocs/add-group-to-list.md)
- [Remove Group Leader](https://developer.rocket.chat/apidocs/remove-group-leader.md)
- [Remove Group Moderator](https://developer.rocket.chat/apidocs/remove-group-moderator.md)
- [Remove Group Owner](https://developer.rocket.chat/apidocs/remove-group-owner.md)
- [Rename Group](https://developer.rocket.chat/apidocs/rename-group.md)
- [Set Group Announcement](https://developer.rocket.chat/apidocs/set-group-announcement.md)
- [Set Group Custom Fields](https://developer.rocket.chat/apidocs/sets-group-custom-fields.md)
- [Set Group Description](https://developer.rocket.chat/apidocs/set-group-description.md)
- [Set Group Purpose](https://developer.rocket.chat/apidocs/set-group-purpose.md)
- [Set Group as Read Only](https://developer.rocket.chat/apidocs/set-group-as-read-only.md)
- [Set Group Topic](https://developer.rocket.chat/apidocs/set-group-topic.md)
- [Set Group Type](https://developer.rocket.chat/apidocs/set-group-type.md)
- [Unarchive Group](https://developer.rocket.chat/apidocs/unarchive-group.md)
- [Get Group Files](https://developer.rocket.chat/apidocs/get-group-files.md)
- [Set Group as Encrypted](https://developer.rocket.chat/apidocs/set-group-as-encrypted.md)
- [Convert a Group to Team](https://developer.rocket.chat/apidocs/convert-a-group-to-team.md)
- [List Group Roles](https://developer.rocket.chat/apidocs/list-group-roles.md)
- [Leave Group](https://developer.rocket.chat/apidocs/leave-group-1.md)

### Channels

- [Create Channel](https://developer.rocket.chat/apidocs/create-channel.md)
- [Add all Users to a Channel](https://developer.rocket.chat/apidocs/add-all-users-to-a-channel.md)
- [Add Channel Leader](https://developer.rocket.chat/apidocs/add-channel-leader.md)
- [Add Channel Moderator](https://developer.rocket.chat/apidocs/add-channel-moderator.md)
- [Add Channel Owner](https://developer.rocket.chat/apidocs/add-channel-owner.md)
- [Read Channel Messages Anonymously](https://developer.rocket.chat/apidocs/read-channel-messages-anonymously.md)
- [Archive Channel](https://developer.rocket.chat/apidocs/archive-channel.md)
- [Close Channel](https://developer.rocket.chat/apidocs/close-channel.md)
- [Get Channel Counters](https://developer.rocket.chat/apidocs/get-channel-counters.md)
- [Delete Channel](https://developer.rocket.chat/apidocs/delete-channel.md)
- [Get Channel Files](https://developer.rocket.chat/apidocs/get-channel-files.md)
- [Get Channel History](https://developer.rocket.chat/apidocs/get-channel-history.md)
- [Get Channel Information](https://developer.rocket.chat/apidocs/get-channel-information.md)
- [Add Users to Channel](https://developer.rocket.chat/apidocs/add-users-to-channel.md)
- [Join a Channel](https://developer.rocket.chat/apidocs/join-a-channel.md)
- [Remove User from Channel](https://developer.rocket.chat/apidocs/remove-user-from-channel.md)
- [Leave  Channel](https://developer.rocket.chat/apidocs/leave-channel.md)
- [Get List of Joined Channels](https://developer.rocket.chat/apidocs/get-list-of-joined-channels.md)
- [Get Channel List](https://developer.rocket.chat/apidocs/get-channel-list.md)
- [Get Members of a Channel](https://developer.rocket.chat/apidocs/get-members-of-a-channel.md)
- [Get Channel Messages](https://developer.rocket.chat/apidocs/get-channel-messages.md)
- [Get Channel Moderators](https://developer.rocket.chat/apidocs/get-channel-moderators.md)
- [List Online Users in a Channel](https://developer.rocket.chat/apidocs/list-online-users-in-a-channel.md)
- [Add Channel to User List](https://developer.rocket.chat/apidocs/add-channel-to-user-list.md)
- [Remove Channel  Leader](https://developer.rocket.chat/apidocs/remove-channel-leader.md)
- [Remove Channel Moderator](https://developer.rocket.chat/apidocs/remove-channel-moderator.md)
- [Remove Channel Owner](https://developer.rocket.chat/apidocs/remove-channel-owner.md)
- [Rename a Channel](https://developer.rocket.chat/apidocs/rename-a-channel.md)
- [Get Channel Roles](https://developer.rocket.chat/apidocs/get-channel-roles.md)
- [Set Channel Announcement](https://developer.rocket.chat/apidocs/set-channel-announcement.md)
- [Set Channel Custom Fields](https://developer.rocket.chat/apidocs/set-channel-custom-fields.md)
- [Set Default Channel](https://developer.rocket.chat/apidocs/set-default-channel.md)
- [Set Channel Description](https://developer.rocket.chat/apidocs/set-channel-description.md)
- [Set Channel Join Code](https://developer.rocket.chat/apidocs/set-channel-join-code.md)
- [Set Channel Purpose](https://developer.rocket.chat/apidocs/set-channel-purpose.md)
- [Set Channel ReadOnly](https://developer.rocket.chat/apidocs/set-channel-readonly.md)
- [Set Channel Topic](https://developer.rocket.chat/apidocs/set-channel-topic.md)
- [Set Channel Type](https://developer.rocket.chat/apidocs/set-channel-type.md)
- [Unarchive a Channel](https://developer.rocket.chat/apidocs/unarchive-a-channel.md)
- [Get User Mentions in a Channel](https://developer.rocket.chat/apidocs/get-all-user-mentions-in-a-channel.md)
- [Get Channel Integrations](https://developer.rocket.chat/apidocs/get-channel-integrations.md)
- [Convert Channel to Team](https://developer.rocket.chat/apidocs/convert-channel-to-team.md)

### Rooms

- [Set Room Notifications](https://developer.rocket.chat/apidocs/set-room-notifications.md)
- [Get All Room Admins](https://developer.rocket.chat/apidocs/get-all-room-admins.md)
- [Clear Room History](https://developer.rocket.chat/apidocs/clear-room-history.md)
- [Get Room Information](https://developer.rocket.chat/apidocs/get-room-information.md)
- [Get Room Discussions](https://developer.rocket.chat/apidocs/get-room-discussions.md)
- [Get Rooms](https://developer.rocket.chat/apidocs/get-rooms.md)
- [Leave Room](https://developer.rocket.chat/apidocs/leave-room.md)
- [Delete Room](https://developer.rocket.chat/apidocs/delete-room.md)
- [Favorite/Unfavourite a Room](https://developer.rocket.chat/apidocs/favoriteunfavourite-a-room.md)
- [Autocomplete Room Name for Team](https://developer.rocket.chat/apidocs/autocomplete-room-name-for-team.md)
- [Autocomplete Room Name for Private and Public Rooms](https://developer.rocket.chat/apidocs/autocomplete-private-channel.md)
- [Get Admin of Room](https://developer.rocket.chat/apidocs/get-admin-of-room.md)
- [Save Room Settings](https://developer.rocket.chat/apidocs/save-room-settings.md)
- [Change Room Archive State](https://developer.rocket.chat/apidocs/change-room-archive-state.md)
- [Export Room](https://developer.rocket.chat/apidocs/export-room.md)
- [Create Discussion](https://developer.rocket.chat/apidocs/create-discussion.md)
- [Check if Room Name Exists](https://developer.rocket.chat/apidocs/check-if-room-name-exists.md)
- [Mute User in Room](https://developer.rocket.chat/apidocs/mute-user-in-room.md)
- [Unmute User in Room](https://developer.rocket.chat/apidocs/unmute-user-in-room.md)
- [Admin Autocomplete Room Name for Private and Public Rooms](https://developer.rocket.chat/apidocs/admin-autocomplete-room-name-for-private-and-public-rooms.md)
- [Get Room Images](https://developer.rocket.chat/apidocs/get-room-images.md)
- [Audit and Get Room Members](https://developer.rocket.chat/apidocs/audit-rooms.md)
- [Upload Media Files to a Room](https://developer.rocket.chat/apidocs/upload-media-files-to-a-room.md)
- [Get Room Members Ordered by Role](https://developer.rocket.chat/apidocs/get-room-members-ordered-by-role.md)
- [Hide Room](https://developer.rocket.chat/apidocs/hide-room.md)
- [Get Room Roles](https://developer.rocket.chat/apidocs/get-room-roles.md)
- [Check Room Member](https://developer.rocket.chat/apidocs/check-room-member.md)
- [Autocomplete Room Name With Pagination](https://developer.rocket.chat/apidocs/autocomplete-room-name-with-pagination.md)
- [Confirm Uploaded File](https://developer.rocket.chat/apidocs/check-uploaded-file.md)
- [Delete Uploaded File](https://developer.rocket.chat/apidocs/delete-uploaded-file.md)
- [Join a Room](https://developer.rocket.chat/apidocs/join-a-room.md)
- [Replace room ABAC attributes](https://developer.rocket.chat/apidocs/replace-room-abac-attributes.md)
- [Delete all ABAC attributes](https://developer.rocket.chat/apidocs/delete-all-abac-attributes.md)
- [Add ABAC attribute key to room](https://developer.rocket.chat/apidocs/add-abac-attribute-key-to-room.md)
- [Set room ABAC attribute values](https://developer.rocket.chat/apidocs/set-room-abac-attribute-values.md)
- [Delete room ABAC attribute key](https://developer.rocket.chat/apidocs/delete-room-abac-attribute-key.md)

### ABAC Attributes

- [List ABAC attribute definitions](https://developer.rocket.chat/apidocs/list-abac-attribute-definitions.md)
- [Create ABAC attribute definition](https://developer.rocket.chat/apidocs/create-abac-attribute-definition.md)
- [Sync users ABAC attributes from LDAP](https://developer.rocket.chat/apidocs/sync-users-abac-attributes-from-ldap.md)
- [Update ABAC attribute definition](https://developer.rocket.chat/apidocs/update-abac-attribute-definition.md)
- [Get ABAC attribute definition by ID](https://developer.rocket.chat/apidocs/get-abac-attribute-definition-by-id.md)
- [Delete ABAC attribute definition by ID](https://developer.rocket.chat/apidocs/delete-abac-attribute-definition-by-id.md)
- [Check if ABAC attribute is in use](https://developer.rocket.chat/apidocs/check-if-abac-attribute-is-in-use.md)
- [List rooms with ABAC attributes](https://developer.rocket.chat/apidocs/list-rooms-with-abac-attributes.md)
- [List ABAC audit events](https://developer.rocket.chat/apidocs/list-abac-audit-events.md)
- [Get PDP Health Status](https://developer.rocket.chat/apidocs/get-pdp-health-status.md)

### Subscriptions

- [Get All Subscriptions](https://developer.rocket.chat/apidocs/get-all-subscriptions.md)
- [Get Subscription Room](https://developer.rocket.chat/apidocs/get-subscription-room.md)
- [Mark Channel as Read](https://developer.rocket.chat/apidocs/mark-channel-as-read.md)
- [Mark Channel as Unread](https://developer.rocket.chat/apidocs/mark-channel-as-unread.md)

### Teams

- [Create a New Team](https://developer.rocket.chat/apidocs/create-a-new-team.md)
- [Get List of All Teams](https://developer.rocket.chat/apidocs/get-list-of-all-teams.md)
- [Get List of Teams](https://developer.rocket.chat/apidocs/get-list-of-teams.md)
- [Get Team Info](https://developer.rocket.chat/apidocs/get-team-info.md)
- [Update a Team](https://developer.rocket.chat/apidocs/update-a-team.md)
- [Add Members to the Team](https://developer.rocket.chat/apidocs/add-members-to-the-team.md)
- [List Team Members](https://developer.rocket.chat/apidocs/list-team-members.md)
- [Update Team Member Info](https://developer.rocket.chat/apidocs/update-team-member-info.md)
- [Leave a Team](https://developer.rocket.chat/apidocs/leave-a-team.md)
- [Remove Member from Team](https://developer.rocket.chat/apidocs/remove-member-from-team.md)
- [Delete a Team](https://developer.rocket.chat/apidocs/delete-a-team.md)
- [Autocomplete Team](https://developer.rocket.chat/apidocs/autocomplete-team.md)
- [Convert Team to Channel](https://developer.rocket.chat/apidocs/convert-team-to-channel.md)
- [Add Rooms to a Team](https://developer.rocket.chat/apidocs/add-rooms-to-a-team.md)
- [Remove Room from the Team](https://developer.rocket.chat/apidocs/remove-room-from-the-team.md)
- [Update Room in a Team](https://developer.rocket.chat/apidocs/update-room-in-a-team.md)
- [List Rooms of a Team](https://developer.rocket.chat/apidocs/list-rooms-of-a-team.md)
- [List User Rooms of a Team](https://developer.rocket.chat/apidocs/list-user-rooms-of-a-team.md)
- [List Rooms and Discussions of a Team](https://developer.rocket.chat/apidocs/list-rooms-and-discussions-of-a-team.md)

### Invites & Directory

- [Directory](https://developer.rocket.chat/apidocs/directory-1.md)
- [Find or Create Invite](https://developer.rocket.chat/apidocs/find-or-create-invite.md)
- [List Invites](https://developer.rocket.chat/apidocs/list-invites.md)
- [Delete Invite by ID](https://developer.rocket.chat/apidocs/delete-invite-by-id.md)
- [Use Invite Token](https://developer.rocket.chat/apidocs/use-invite-token.md)

### Messages

- [Delete Chat Message](https://developer.rocket.chat/apidocs/delete-chat-message.md)
- [React to Message](https://developer.rocket.chat/apidocs/react-to-message.md)
- [Update Message](https://developer.rocket.chat/apidocs/update-message.md)
- [Report Message](https://developer.rocket.chat/apidocs/report-message.md)
- [Follow Message](https://developer.rocket.chat/apidocs/follow-message.md)
- [Unfollow Message](https://developer.rocket.chat/apidocs/unfollow-message.md)
- [Get Message](https://developer.rocket.chat/apidocs/get-message.md)
- [List Threads](https://developer.rocket.chat/apidocs/list-threads.md)
- [Get Deleted Messages](https://developer.rocket.chat/apidocs/get-deleted-messages.md)
- [Get Discussions of A Room](https://developer.rocket.chat/apidocs/get-discussions-of-a-room.md)
- [Get Mentioned Messages](https://developer.rocket.chat/apidocs/get-mentioned-messages.md)
- [Get Message Read Receipts](https://developer.rocket.chat/apidocs/get-message-read-receipts.md)
- [Get Pinned Messages](https://developer.rocket.chat/apidocs/get-pinned-messages.md)
- [Get Starred Messages](https://developer.rocket.chat/apidocs/get-starred-messages.md)
- [Get Thread Messages](https://developer.rocket.chat/apidocs/get-thread-messages.md)
- [Ignore User](https://developer.rocket.chat/apidocs/ignore-user.md)
- [Pin Message](https://developer.rocket.chat/apidocs/pin-message.md)
- [Unpin a message](https://developer.rocket.chat/apidocs/unpin-a-message.md)
- [Post Message](https://developer.rocket.chat/apidocs/post-message.md)
- [Search Message](https://developer.rocket.chat/apidocs/search-message.md)
- [Send Message](https://developer.rocket.chat/apidocs/send-message.md)
- [Star Message](https://developer.rocket.chat/apidocs/star-message.md)
- [Unstar Message](https://developer.rocket.chat/apidocs/unstar-message.md)
- [Sync Thread List](https://developer.rocket.chat/apidocs/sync-thread-list.md)
- [Sync Thread Messages](https://developer.rocket.chat/apidocs/sync-thread-messages.md)
- [Sync Messages](https://developer.rocket.chat/apidocs/sync-messages.md)
- [Get URL Preview](https://developer.rocket.chat/apidocs/get-url-preview.md)

### Direct Messages

- [Block User in DM](https://developer.rocket.chat/apidocs/block-user-in-dm.md)
- [Close DM](https://developer.rocket.chat/apidocs/close-dm.md)
- [Get DM Counters](https://developer.rocket.chat/apidocs/get-dm-counters.md)
- [Create DM](https://developer.rocket.chat/apidocs/create-dm.md)
- [Delete DM](https://developer.rocket.chat/apidocs/delete-dm.md)
- [Get DM Files](https://developer.rocket.chat/apidocs/get-dm-files.md)
- [DM History](https://developer.rocket.chat/apidocs/dm-history.md)
- [List All DMs](https://developer.rocket.chat/apidocs/list-all-dms.md)
- [List DMs](https://developer.rocket.chat/apidocs/list-dms.md)
- [List DM Members](https://developer.rocket.chat/apidocs/list-dm-members.md)
- [List DM Messages](https://developer.rocket.chat/apidocs/list-dm-messages.md)
- [Message Others](https://developer.rocket.chat/apidocs/message-others.md)
- [Open DM](https://developer.rocket.chat/apidocs/open-dm.md)
- [Set DM Topic](https://developer.rocket.chat/apidocs/set-dm-topic.md)

### Auto-Translate

- [Get Supported Languages](https://developer.rocket.chat/apidocs/get-supported-languages.md)
- [Save Auto-Translate  Settings](https://developer.rocket.chat/apidocs/save-auto-translate-settings.md)
- [Translate Message](https://developer.rocket.chat/apidocs/translate-message.md)

### Omnichannel / Livechat — Agents & Managers

- [Register New Agent or Manager](https://developer.rocket.chat/apidocs/register-new-agent-or-manager.md)
- [Get List of Agents or Managers](https://developer.rocket.chat/apidocs/get-list-of-agents-or-managers.md)
- [Get Agent or Manager Information](https://developer.rocket.chat/apidocs/get-agent-or-manager-information.md)
- [Remove Agent or Manager](https://developer.rocket.chat/apidocs/remove-agent-or-manager.md)
- [Get Agent Information](https://developer.rocket.chat/apidocs/get-agent-information.md)
- [Get Next Agent Information](https://developer.rocket.chat/apidocs/get-next-agent-information.md)
- [Update Agent Info](https://developer.rocket.chat/apidocs/update-agent-info.md)
- [Update Agent Status](https://developer.rocket.chat/apidocs/update-agent-status.md)
- [Get List of Monitors](https://developer.rocket.chat/apidocs/get-list-of-monitors.md)
- [Get a Monitor](https://developer.rocket.chat/apidocs/get-a-monitor.md)
- [Delete a Monitor](https://developer.rocket.chat/apidocs/delete-a-monitor.md)
- [Create a Monitor](https://developer.rocket.chat/apidocs/create-a-monitor.md)

### Omnichannel / Livechat — Visitors & Contacts

- [Register Livechat Visitor](https://developer.rocket.chat/apidocs/register-livechat-visitor.md)
- [Get Visitor Information](https://developer.rocket.chat/apidocs/get-visitor-information.md)
- [Delete Visitor](https://developer.rocket.chat/apidocs/delete-visitor.md)
- [Get Open Conversation of a Visitor](https://developer.rocket.chat/apidocs/get-open-conversation-of-a-visitor.md)
- [Search Visitors by Term](https://developer.rocket.chat/apidocs/search-visitors-by-term.md)
- [Get Pages Visited by Livechat Visitor](https://developer.rocket.chat/apidocs/get-pages-visited-by-livechat-visitor.md)
- [Get Livechat Visitor Chat History](https://developer.rocket.chat/apidocs/get-livechat-visitor-chat-history.md)
- [Search Visitor Chat](https://developer.rocket.chat/apidocs/search-visitor-chat.md)
- [Autocomplete Visitors](https://developer.rocket.chat/apidocs/autocomplete-visitors.md)
- [Set Visitor's Status](https://developer.rocket.chat/apidocs/set-visitors-status.md)
- [Get Visitor Information by ID](https://developer.rocket.chat/apidocs/get-visitor-information-by-id-1.md)
- [Register or Update Omnichannel Contact](https://developer.rocket.chat/apidocs/register-or-update-omnichannel-contact.md)
- [Search Contacts](https://developer.rocket.chat/apidocs/search-contacts.md)
- [Get channels grouped by contact name](https://developer.rocket.chat/apidocs/get-channels-grouped-by-contact-name.md)
- [Get Contact History](https://developer.rocket.chat/apidocs/get-contact-history.md)
- [Update Omnichannel Contact](https://developer.rocket.chat/apidocs/update-omnichannel-contact.md)
- [Register Omnichannel Contacts](https://developer.rocket.chat/apidocs/register-omnichannel-contacts.md)
- [Get Omnichannel Contact](https://developer.rocket.chat/apidocs/get-omnichannel-contact.md)
- [Search Omnichannel Contacts](https://developer.rocket.chat/apidocs/search-omnichannel-contacts.md)
- [Check Contacts Existence](https://developer.rocket.chat/apidocs/check-contacts-existence.md)
- [Resolve Contact Conflicts](https://developer.rocket.chat/apidocs/resolve-contact-conflicts.md)
- [Block Omnichannel Contact](https://developer.rocket.chat/apidocs/block-omnichannel-contact.md)
- [Unblock Omnichannel Contact](https://developer.rocket.chat/apidocs/unblock-omnichannel-contact.md)

### Omnichannel / Livechat — Rooms

- [Get List of Omnichannel Rooms](https://developer.rocket.chat/apidocs/get-list-of-livechat-rooms.md)
- [Get or Create Omnichannel Rooms](https://developer.rocket.chat/apidocs/get-or-create-livechat-rooms.md)
- [Close Omnichannel Room by Visitor](https://developer.rocket.chat/apidocs/close-livechat-room.md)
- [Join Omnichannel Room](https://developer.rocket.chat/apidocs/join-livechat-room.md)
- [Update Omnichannel Room](https://developer.rocket.chat/apidocs/update-livechat-room.md)
- [Forward Omnichannel Room](https://developer.rocket.chat/apidocs/forward-livechat-room.md)
- [Get Department Transfer History](https://developer.rocket.chat/apidocs/get-department-transfer-history.md)
- [Survey Omnichannel Room](https://developer.rocket.chat/apidocs/survey-livechat-room.md)
- [Put Omnichannel Room on Hold](https://developer.rocket.chat/apidocs/put-livechat-room-on-hold.md)
- [Upload Files to Room](https://developer.rocket.chat/apidocs/upload-files-to-room.md)
- [Set Omnichannel Room Priority](https://developer.rocket.chat/apidocs/set-livechat-room-priority.md)
- [Remove Omnichannel Room Priority](https://developer.rocket.chat/apidocs/remove-livechat-room-priority.md)
- [Close Omnichannel Room](https://developer.rocket.chat/apidocs/close-livechat-room-by-user.md)
- [Remove Closed Omnichannel Rooms](https://developer.rocket.chat/apidocs/remove-closed-omnichannel-rooms.md)
- [Remove a Closed Omnichannel Room](https://developer.rocket.chat/apidocs/remove-a-closed-omnichannel-room.md)
- [Resume Room On-Hold](https://developer.rocket.chat/apidocs/resume-room-on-hold.md)
- [View Omnichannel Room Sources](https://developer.rocket.chat/apidocs/view-omnichannel-room-sources.md)
- [Visitor Transfer Room](https://developer.rocket.chat/apidocs/visitor-transfer-room.md)

### Omnichannel / Livechat — Departments

- [Get List of Departments](https://developer.rocket.chat/apidocs/get-list-of-departments.md)
- [Register New Department](https://developer.rocket.chat/apidocs/register-new-department.md)
- [Get Department Information](https://developer.rocket.chat/apidocs/get-department-information.md)
- [Update Department](https://developer.rocket.chat/apidocs/update-department.md)
- [Remove Department](https://developer.rocket.chat/apidocs/remove-department.md)
- [Autocomplete Department](https://developer.rocket.chat/apidocs/autocomplete-department.md)
- [Get Agents of Department](https://developer.rocket.chat/apidocs/get-agents-of-department.md)
- [Update Agents of Department](https://developer.rocket.chat/apidocs/update-agents-of-department.md)
- [Get Departments by ID](https://developer.rocket.chat/apidocs/get-departments-by-id.md)

### Omnichannel / Livechat — Analytics

- [Get Number of Chats](https://developer.rocket.chat/apidocs/get-number-of-chats.md)
- [Get Average Service Time](https://developer.rocket.chat/apidocs/get-average-service-time.md)
- [Get Average Chat Duration](https://developer.rocket.chat/apidocs/get-average-chat-duration.md)
- [Get Total Service Time](https://developer.rocket.chat/apidocs/get-total-service-time.md)
- [Get Average Waiting Time](https://developer.rocket.chat/apidocs/get-average-waiting-time.md)
- [Get Total Transferred Chats](https://developer.rocket.chat/apidocs/get-total-transferred-chats.md)
- [Get Total Abandoned Chats](https://developer.rocket.chat/apidocs/get-total-abandoned-chats.md)
- [Get Percentage of Abandoned Chats](https://developer.rocket.chat/apidocs/get-percentage-of-abandoned-chats.md)
- [Get Archived Departments](https://developer.rocket.chat/apidocs/get-archived-departments.md)
- [Archive a Department](https://developer.rocket.chat/apidocs/archive-a-department.md)
- [Unarchive a Department](https://developer.rocket.chat/apidocs/unarchive-a-department.md)
- [Check Department Creation](https://developer.rocket.chat/apidocs/check-department-creation.md)

### Omnichannel / Livechat — Custom Fields, Business Hours & Priorities

- [Send Custom Field Value](https://developer.rocket.chat/apidocs/send-custom-field-value.md)
- [Send Array of Custom Field Values](https://developer.rocket.chat/apidocs/send-array-of-custom-field-values.md)
- [Get Omnichannel Custom Fields](https://developer.rocket.chat/apidocs/get-livechat-custom-fields.md)
- [Get Custom Field Information](https://developer.rocket.chat/apidocs/get-custom-field-information.md)
- [Delete Omnichannel Custom Field](https://developer.rocket.chat/apidocs/delete-omnichannel-custom-field.md)
- [Create Omnichannel Custom Field](https://developer.rocket.chat/apidocs/create-omnichannel-custom-field.md)
- [Get Business Hours](https://developer.rocket.chat/apidocs/get-business-hours.md)
- [Get Default Business Hour](https://developer.rocket.chat/apidocs/get-default-business-hour.md)
- [Remove Business Hour](https://developer.rocket.chat/apidocs/remove-business-hour.md)
- [Create a Business Hour](https://developer.rocket.chat/apidocs/create-a-business-hour.md)
- [Get List of Priorities](https://developer.rocket.chat/apidocs/get-list-of-priorities.md)
- [Get a Priority](https://developer.rocket.chat/apidocs/get-a-priority.md)
- [Update Priority](https://developer.rocket.chat/apidocs/update-priority.md)
- [Reset Priorities](https://developer.rocket.chat/apidocs/reset-priorities.md)
- [Check Priority Reset](https://developer.rocket.chat/apidocs/check-priority-reset.md)

### Omnichannel / Livechat — Tags, Units & SLA

- [Get List of Tags](https://developer.rocket.chat/apidocs/get-list-of-tags.md)
- [Get a Tag](https://developer.rocket.chat/apidocs/get-a-tag.md)
- [Delete a tag](https://developer.rocket.chat/apidocs/delete-a-tag.md)
- [Create a Tag](https://developer.rocket.chat/apidocs/create-a-tag.md)
- [Create Unit](https://developer.rocket.chat/apidocs/create-unit.md)
- [Get List of Units](https://developer.rocket.chat/apidocs/get-list-of-units.md)
- [Update Unit](https://developer.rocket.chat/apidocs/update-unit.md)
- [Delete a Unit](https://developer.rocket.chat/apidocs/delete-a-unit.md)
- [Get List of Unit Monitors](https://developer.rocket.chat/apidocs/get-list-of-unit-monitors.md)
- [Get Available Departments by Unit Id](https://developer.rocket.chat/apidocs/get-available-departments-by-unit-id-1.md)
- [Get Departments by Unit ID](https://developer.rocket.chat/apidocs/get-departments-by-unit-id-1.md)
- [Get a Unit](https://developer.rocket.chat/apidocs/get-a-unit-1.md)
- [Get List of SLA Policies](https://developer.rocket.chat/apidocs/get-list-of-sla-policies.md)
- [Create SLA Policy](https://developer.rocket.chat/apidocs/create-sla-policy.md)
- [Get an SLA](https://developer.rocket.chat/apidocs/get-an-sla.md)
- [Update an SLA](https://developer.rocket.chat/apidocs/update-an-sla.md)
- [Delete an SLA](https://developer.rocket.chat/apidocs/delete-an-sla.md)

### Omnichannel / Livechat — Canned Responses & Transcripts

- [Create or Update a Canned Response](https://developer.rocket.chat/apidocs/create-or-update-or-delete-a-canned-response.md)
- [List All Canned Responses](https://developer.rocket.chat/apidocs/list-all-canned-responses.md)
- [Get User Canned Responses](https://developer.rocket.chat/apidocs/get-user-canned-responses.md)
- [Get a Canned Response](https://developer.rocket.chat/apidocs/get-a-canned-response.md)
- [Delete a Canned Response](https://developer.rocket.chat/apidocs/delete-a-canned-response.md)
- [Request Omnichannel Transcript](https://developer.rocket.chat/apidocs/request-livechat-transcript.md)
- [Send Omnichannel Transcript](https://developer.rocket.chat/apidocs/send-livechat-transcript.md)
- [Delete Omnichannel Transcript](https://developer.rocket.chat/apidocs/delete-livechat-transcript.md)
- [Request PDF Transcript](https://developer.rocket.chat/apidocs/request-pdf-transcript.md)

### Omnichannel / Livechat — Advanced Analytics

- [Get Agent Analytics Overview](https://developer.rocket.chat/apidocs/get-agent-analytics-overview.md)
- [Get Analytics Overview](https://developer.rocket.chat/apidocs/get-analytics-overview.md)
- [Get Agent Departments](https://developer.rocket.chat/apidocs/get-agent-departments.md)
- [Get Agent Average Service Time](https://developer.rocket.chat/apidocs/get-agent-average-service-time.md)
- [Get Agent Total Service Time](https://developer.rocket.chat/apidocs/get-agent-total-service-time.md)
- [Get History of Agents Available for Service](https://developer.rocket.chat/apidocs/get-history-of-agents-available-for-service.md)
- [Get Conversation Metrics](https://developer.rocket.chat/apidocs/get-conversation-metrics.md)
- [Get Agent Service Time Metrics](https://developer.rocket.chat/apidocs/get-agent-service-time-metrics.md)
- [Get Chat Metrics](https://developer.rocket.chat/apidocs/get-chat-metrics.md)
- [Get Chat Metrics by Time](https://developer.rocket.chat/apidocs/get-chat-metrics-by-time.md)
- [Get Chats Status](https://developer.rocket.chat/apidocs/get-chats-status.md)
- [Get Chat Status of Agents](https://developer.rocket.chat/apidocs/get-chat-status-of-agents.md)
- [Get Status of Agents](https://developer.rocket.chat/apidocs/get-status-of-agents.md)
- [Get Chats Status for Departments](https://developer.rocket.chat/apidocs/get-chats-status-for-departments.md)
- [Get Chat Times](https://developer.rocket.chat/apidocs/get-chat-times.md)
- [Get Analytics Chart Data](https://developer.rocket.chat/apidocs/get-analytics-chart-data.md)
- [Get Conversations by Status](https://developer.rocket.chat/apidocs/get-conversations-by-status.md)
- [Get Conversations by Departments](https://developer.rocket.chat/apidocs/get-conversations-by-departments.md)
- [Get Conversations by Tags](https://developer.rocket.chat/apidocs/get-conversations-by-tags.md)
- [Get Conversation by Agents](https://developer.rocket.chat/apidocs/get-conversation-by-agents.md)
- [Get Conversations By Source](https://developer.rocket.chat/apidocs/get-conversations-by-source.md)

### Omnichannel / Livechat — Inquiries & Configuration

- [Get Inquiries List](https://developer.rocket.chat/apidocs/get-inquiries-list.md)
- [Take Inquiry](https://developer.rocket.chat/apidocs/take-inquiry.md)
- [Get Inquiry by Room](https://developer.rocket.chat/apidocs/get-inquiry-by-room.md)
- [Set SLA Policy to Inquiry](https://developer.rocket.chat/apidocs/set-sla-policy-to-inquiry.md)
- [List Queued User Inquiries](https://developer.rocket.chat/apidocs/list-queued-user-inquiries.md)
- [Move Chat to Inquiry](https://developer.rocket.chat/apidocs/move-chat-to-inquiry.md)
- [Set up Omnichannel webhook](https://developer.rocket.chat/apidocs/set-up-omnichannel-webhook.md)
- [Test the Webhook Integration](https://developer.rocket.chat/apidocs/test-the-webhook-integration.md)
- [Get Livechat Configurations](https://developer.rocket.chat/apidocs/get-livechat-configurations.md)
- [Get Livechat Integrations](https://developer.rocket.chat/apidocs/get-livechat-integrations.md)
- [Get Livechat Queue](https://developer.rocket.chat/apidocs/get-livechat-queue.md)
- [Livechat SMS Incoming (Twilio)](https://developer.rocket.chat/apidocs/livechat-sms-incoming-twilio.md)
- [Get Livechat Routing Configuration](https://developer.rocket.chat/apidocs/get-livechat-routing-configuration.md)
- [Get Livechat Appearance](https://developer.rocket.chat/apidocs/get-livechat-appearance.md)
- [Set Livechat Appearance](https://developer.rocket.chat/apidocs/set-livechat-appearance.md)
- [Get List of Livechat Triggers](https://developer.rocket.chat/apidocs/get-list-of-livechat-triggers.md)
- [Get Livechat Trigger](https://developer.rocket.chat/apidocs/get-livechat-trigger.md)
- [Create or Update Livechat Triggers](https://developer.rocket.chat/apidocs/create-livechat-triggers.md)
- [Delete a trigger](https://developer.rocket.chat/apidocs/delete-a-trigger.md)
- [Test Trigger with External Service](https://developer.rocket.chat/apidocs/test-trigger-with-external-service.md)

### Omnichannel / Livechat — Messages

- [Send New Livechat Message](https://developer.rocket.chat/apidocs/send-new-livechat-message.md)
- [Send Array of Messages](https://developer.rocket.chat/apidocs/send-array-of-messages.md)
- [Update Livechat Message](https://developer.rocket.chat/apidocs/update-livechat-message.md)
- [Get a Livechat Message](https://developer.rocket.chat/apidocs/get-a-livechat-message.md)
- [Delete Livechat Message](https://developer.rocket.chat/apidocs/delete-livechat-message.md)
- [Get Livechat Message History](https://developer.rocket.chat/apidocs/get-livechat-message-history.md)
- [Send Offline Livechat Message](https://developer.rocket.chat/apidocs/send-offline-livechat-message.md)
- [Get Livechat Messages](https://developer.rocket.chat/apidocs/get-livechat-messages.md)
- [Send Visitor Navigation History](https://developer.rocket.chat/apidocs/send-visitor-navigation-history.md)

### Integrations & OAuth

- [Create Integration](https://developer.rocket.chat/apidocs/create-integration.md)
- [Get Integration](https://developer.rocket.chat/apidocs/get-integration.md)
- [Get Integration History](https://developer.rocket.chat/apidocs/get-integration-history.md)
- [Get List of Integrations](https://developer.rocket.chat/apidocs/get-list-of-integrations.md)
- [Update Integration](https://developer.rocket.chat/apidocs/update-integration.md)
- [Remove Integration](https://developer.rocket.chat/apidocs/remove-integration-1.md)
- [Get WebDAV Accounts](https://developer.rocket.chat/apidocs/get-webdav-accounts.md)
- [Remove WebDAV Account](https://developer.rocket.chat/apidocs/remove-webdav-account.md)
- [Create OAuth App](https://developer.rocket.chat/apidocs/create-oauth-app.md)
- [Update OAuth App](https://developer.rocket.chat/apidocs/update-oauth-app.md)
- [Get List of OAuth Apps](https://developer.rocket.chat/apidocs/get-list-of-oauth-apps.md)
- [Get OAuth App](https://developer.rocket.chat/apidocs/get-oauth-app.md)
- [Delete OAuth App](https://developer.rocket.chat/apidocs/delete-oauth-app.md)

### Banners & Push Notifications

- [Get Banner by ID](https://developer.rocket.chat/apidocs/get-banner-by-id.md)
- [Get Banners](https://developer.rocket.chat/apidocs/get-banners.md)
- [Dismiss a Banner](https://developer.rocket.chat/apidocs/dismiss-a-banner.md)
- [Get Push Notification](https://developer.rocket.chat/apidocs/get-push-notification.md)
- [Delete Push Token](https://developer.rocket.chat/apidocs/delete-push-token.md)
- [Create Push Token](https://developer.rocket.chat/apidocs/create-push-token.md)
- [Test Push Notifications](https://developer.rocket.chat/apidocs/test-push-notifications.md)
- [Get Push Info](https://developer.rocket.chat/apidocs/get-push-info.md)

### Assets, Emojis, Sounds & Statuses

- [Set Asset](https://developer.rocket.chat/apidocs/set-asset.md)
- [Unset Asset](https://developer.rocket.chat/apidocs/unset-asset.md)
- [List All Custom Emojis](https://developer.rocket.chat/apidocs/list-all-custom-emojis.md)
- [Create an Emoji](https://developer.rocket.chat/apidocs/create-an-emoji.md)
- [Delete a Custom Emoji](https://developer.rocket.chat/apidocs/delete-a-custom-emoji.md)
- [Get Updated List of Custom Emojis](https://developer.rocket.chat/apidocs/get-updated-list-of-custom-emojis.md)
- [Update a Custom Emoji](https://developer.rocket.chat/apidocs/update-a-custom-emoji.md)
- [List Custom Sounds](https://developer.rocket.chat/apidocs/list-custom-sounds.md)
- [Get Custom Sound](https://developer.rocket.chat/apidocs/get-custom-sound.md)
- [Create Custom Sound](https://developer.rocket.chat/apidocs/create-custom-sound.md)
- [Update Custom Sound](https://developer.rocket.chat/apidocs/update-custom-sound.md)
- [Delete Custom Sound](https://developer.rocket.chat/apidocs/delete-custom-sound.md)
- [List Custom User Status](https://developer.rocket.chat/apidocs/list-custom-user-status.md)
- [Create Custom Status](https://developer.rocket.chat/apidocs/create-custom-status.md)
- [Update Custom Status](https://developer.rocket.chat/apidocs/update-custom-status.md)
- [Delete Custom User Status](https://developer.rocket.chat/apidocs/delete-custom-user-status.md)

### Statistics

- [Get Statistics List](https://developer.rocket.chat/apidocs/get-statistics-list.md)
- [Get Last Statistics](https://developer.rocket.chat/apidocs/get-last-statistics.md)
- [Get New Users](https://developer.rocket.chat/apidocs/get-new-users.md)
- [Get Active Users](https://developer.rocket.chat/apidocs/get-active-users.md)
- [Get User By Time of the Day](https://developer.rocket.chat/apidocs/get-user-by-time-of-the-day.md)
- [Get Hourly Data When Chat is Busier](https://developer.rocket.chat/apidocs/get-hourly-data-when-chat-is-busier.md)
- [Get Weekly Data When Chat is Busier](https://developer.rocket.chat/apidocs/get-weekly-data-when-chat-is-busier.md)
- [Get Number of Sent Messages](https://developer.rocket.chat/apidocs/get-messages-sent.md)
- [Get Origin of Message Sent](https://developer.rocket.chat/apidocs/get-origin-of-message-sent.md)
- [Get the Most Popular Channels](https://developer.rocket.chat/apidocs/get-the-most-popular-channels.md)
- [Get Channels Engagement](https://developer.rocket.chat/apidocs/get-channels-engagement.md)

### Settings

- [Get Public Settings](https://developer.rocket.chat/apidocs/get-public-settings.md)
- [Get OAuth Settings](https://developer.rocket.chat/apidocs/get-oauth-settings.md)
- [Get Private Settings](https://developer.rocket.chat/apidocs/get-private-settings.md)
- [Add Custom OAuth](https://developer.rocket.chat/apidocs/add-custom-oauth.md)
- [Update Setting](https://developer.rocket.chat/apidocs/update-setting.md)
- [Get Setting](https://developer.rocket.chat/apidocs/get-setting.md)
- [Get OAuth Service Configuration](https://developer.rocket.chat/apidocs/get-oauth-service-configuration.md)

### Cloud & DNS

- [Manual Cloud Register](https://developer.rocket.chat/apidocs/manual-cloud-register.md)
- [Resolve DNS Text Records](https://developer.rocket.chat/apidocs/resolve-dns-text-records.md)
- [Resolve DNS URL Records](https://developer.rocket.chat/apidocs/resolve-dns-url-records.md)

### End-to-End Encryption

- [Get E2E Keys](https://developer.rocket.chat/apidocs/get-e2e-keys.md)
- [Get Users of Room Without E2E key](https://developer.rocket.chat/apidocs/get-users-of-room-without-e2e-key.md)
- [Set Room E2E Key](https://developer.rocket.chat/apidocs/set-room-e2e-key.md)
- [Set User Key](https://developer.rocket.chat/apidocs/set-user-key.md)
- [Request Subscription Keys](https://developer.rocket.chat/apidocs/request-subscription-keys.md)
- [Update User E2E Key in Room](https://developer.rocket.chat/apidocs/update-user-e2e-key-in-room.md)

### Import

- [Upload Import File](https://developer.rocket.chat/apidocs/upload-import-file.md)
- [Download Public Import File](https://developer.rocket.chat/apidocs/download-public-import-file.md)
- [Start Import](https://developer.rocket.chat/apidocs/start-import.md)
- [Get Import File Data](https://developer.rocket.chat/apidocs/get-import-file-data.md)
- [Get Import Progress](https://developer.rocket.chat/apidocs/get-import-progress.md)
- [Get Latest Import Operations](https://developer.rocket.chat/apidocs/get-latest-import-operations.md)
- [Download Pending Files](https://developer.rocket.chat/apidocs/download-pending-files.md)
- [Download Pending Avatars](https://developer.rocket.chat/apidocs/download-pending-avatars.md)
- [Get Current Import Operations](https://developer.rocket.chat/apidocs/get-current-import-operations-1.md)
- [Get List of Imports](https://developer.rocket.chat/apidocs/get-list-of-imports.md)
- [Create New Import Operation](https://developer.rocket.chat/apidocs/create-new-import-operation.md)
- [Add Users](https://developer.rocket.chat/apidocs/add-users.md)
- [Run Import Operation](https://developer.rocket.chat/apidocs/run-import-operation.md)
- [Get Import Operation Status](https://developer.rocket.chat/apidocs/get-import-operation-status.md)
- [Abort Import Operation](https://developer.rocket.chat/apidocs/abort-import-operation.md)

### Instances & Federation

- [Get Instances](https://developer.rocket.chat/apidocs/get-instances.md)
- [Add Federated Server](https://developer.rocket.chat/apidocs/add-federated-server.md)
- [Get Federated Servers](https://developer.rocket.chat/apidocs/get-federated-servers.md)
- [Remove Federated Server](https://developer.rocket.chat/apidocs/remove-federated-server.md)
- [Search Public Rooms](https://developer.rocket.chat/apidocs/search-public-rooms.md)
- [Join External Public Room](https://developer.rocket.chat/apidocs/join-external-public-room.md)

### Video Conferencing

- [Get Current Media Call State](https://developer.rocket.chat/apidocs/get-current-media-call-state.md)
- [Get Video Conference Capabilities](https://developer.rocket.chat/apidocs/get-video-conference-capabilities.md)
- [Get List of Video Conferences](https://developer.rocket.chat/apidocs/get-list-of-video-conferences.md)
- [Get Video Conference Details](https://developer.rocket.chat/apidocs/get-video-conference-details.md)
- [Get Video Conference Providers](https://developer.rocket.chat/apidocs/get-video-conference-providers.md)
- [Start Video Conference](https://developer.rocket.chat/apidocs/start-video-conference.md)
- [Join a Video Conference](https://developer.rocket.chat/apidocs/join-a-video-conference.md)
- [Cancel Video Conference](https://developer.rocket.chat/apidocs/cancel-video-conference.md)

### Moderation / Reports

- [Get Reported Messages](https://developer.rocket.chat/apidocs/get-reported-messages.md)
- [Get User's Reported Messages](https://developer.rocket.chat/apidocs/get-users-reported-messages.md)
- [Get Reports of a Message](https://developer.rocket.chat/apidocs/get-reports-of-a-message.md)
- [Get Report Information](https://developer.rocket.chat/apidocs/get-report-information.md)
- [Dismiss Reports](https://developer.rocket.chat/apidocs/dismiss-reports.md)
- [Delete Reported Messages of a User](https://developer.rocket.chat/apidocs/delete-reported-messages-of-a-user.md)
- [Dismiss User Reports](https://developer.rocket.chat/apidocs/dismiss-user-reports.md)
- [Get User Reports by User ID](https://developer.rocket.chat/apidocs/get-user-reports-by-user-id.md)
- [Get Reported Users](https://developer.rocket.chat/apidocs/get-reported-users.md)

### Sessions

- [Get Current User Sessions](https://developer.rocket.chat/apidocs/get-current-user-sessions.md)
- [Get All User Sessions](https://developer.rocket.chat/apidocs/get-all-current-user-sessions.md)
- [Get Current User Session Information](https://developer.rocket.chat/apidocs/get-all-current-user-sessions-1.md)
- [Get Session Information](https://developer.rocket.chat/apidocs/get-session-information.md)
- [Logout Current User Session](https://developer.rocket.chat/apidocs/logout-current-user-session.md)
- [Logout Session](https://developer.rocket.chat/apidocs/logout-session.md)
- [Get Password Policy](https://developer.rocket.chat/apidocs/get-password-policy.md)

### Misc

- [Shield SVG](https://developer.rocket.chat/apidocs/shield-svg.md)
- [Spotlight](https://developer.rocket.chat/apidocs/spotlight.md)
- [Execute a Meteor method call](https://developer.rocket.chat/apidocs/execute-a-meteor-method-call.md)

### Email Inbox

- [List Email Inbox](https://developer.rocket.chat/apidocs/list-email-inbox.md)
- [Set Email Inbox](https://developer.rocket.chat/apidocs/set-email-inbox.md)
- [Get Email Inbox by ID](https://developer.rocket.chat/apidocs/email-inbox-by-id.md)
- [Delete Email Inbox by ID](https://developer.rocket.chat/apidocs/delete-email-inbox-by-id.md)
- [Search Email Inbox](https://developer.rocket.chat/apidocs/search-email-inbox.md)
- [Send Test Email](https://developer.rocket.chat/apidocs/send-test-email-to-email-inbox.md)
- [Check SMTP](https://developer.rocket.chat/apidocs/check-smtp.md)

### Calendar

- [Get List of Calendar Events](https://developer.rocket.chat/apidocs/get-list-of-calendar-events.md)
- [Get Calendar Event Info](https://developer.rocket.chat/apidocs/get-calendar-event-info.md)
- [Create Calendar Event](https://developer.rocket.chat/apidocs/create-calendar-event.md)
- [Update Calendar Event](https://developer.rocket.chat/apidocs/update-calendar-event.md)
- [Delete Calendar Event](https://developer.rocket.chat/apidocs/delete-calendar-event.md)
- [Import Calendar Event](https://developer.rocket.chat/apidocs/import-calendar-event.md)
- [Close Chat or Perform Handover](https://developer.rocket.chat/apidocs/close-chat-or-perform-handover.md)
- [Update Jitsi Timeout](https://developer.rocket.chat/apidocs/update-jitsi-timeout.md)
- [Send a WhatsApp Template Message](https://developer.rocket.chat/apidocs/send-a-whatsapp-template-message.md)

### Licensing

- [Add License](https://developer.rocket.chat/apidocs/add-license.md)
- [Get Maximum Active User](https://developer.rocket.chat/apidocs/get-maximum-active-user.md)
- [Get Licenses](https://developer.rocket.chat/apidocs/get-licenses-1.md)
- [Update Fingerprint](https://developer.rocket.chat/apidocs/update-fingerprint.md)

### Slash Commands

- [Get Slash Command](https://developer.rocket.chat/apidocs/get-slash-commands.md)
- [List Slash Commands](https://developer.rocket.chat/apidocs/list-slash-commands.md)
- [Get Command's Preview Data](https://developer.rocket.chat/apidocs/get-commands-preview-data.md)
- [Execute command's preview item](https://developer.rocket.chat/apidocs/execute-commands-preview-item.md)
- [Execute a Slash Command](https://developer.rocket.chat/apidocs/execute-a-slash-command.md)

### Mailer

- [Send Mailer Endpoint](https://developer.rocket.chat/apidocs/send-mailer-endpoint.md)
- [Mailer Unsubscribe Endpoint](https://developer.rocket.chat/apidocs/mailer-unsubscribe-endpoint.md)

### Realtime API Endpoints

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
- [Remove Permission from Role](https://developer.rocket.chat/apidocs/remove-permission-from-role.md)
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

### Schemas

- [User](https://developer.rocket.chat/apidocs/user-schema.md)
- [Room](https://developer.rocket.chat/apidocs/room-schema.md)
- [Message](https://developer.rocket.chat/apidocs/message-schema.md)
- [Subscription](https://developer.rocket.chat/apidocs/subscription-schema.md)

---

## Note on completeness

The landing page at `https://developer.rocket.chat/apidocs#rocketchat-rest-api` is an overview/index. The actual endpoint-level reference (HTTP methods, paths, parameter schemas, request/response examples, and error details) lives on each linked sub-page above. This file contains a complete local copy of the overview, rate-limiting policy, security guidance, wrapper list, and the full navigational index. To inline every sub-page would require fetching 700+ individual articles and result in a very large document; if you need a subset (for example, only the Channels or Messages REST endpoints) pulled in with full examples, specify the section and I can expand it.
