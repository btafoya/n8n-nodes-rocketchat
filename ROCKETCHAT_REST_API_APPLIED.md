# Rocket.Chat REST API Reference — Sections Applied to This Project

> This document contains the full endpoint-level reference for the Rocket.Chat REST API operations implemented by `@btafoya/n8n-nodes-rocketchat`.
> Sources are the raw Markdown pages under `https://developer.rocket.chat/apidocs/`.

## Implemented operation map

| n8n Resource | n8n Operation | Rocket.Chat Endpoint | Method |
|--------------|---------------|----------------------|--------|
| Channel | Create | `/api/v1/channels.create` | `POST` |
| Channel | Archive | `/api/v1/channels.archive` | `POST` |
| Channel | Delete | `/api/v1/channels.delete` | `POST` |
| Group | Create | `/api/v1/groups.create` | `POST` |
| Group | Archive | `/api/v1/groups.archive` | `POST` |
| Group | Delete | `/api/v1/groups.delete` | `POST` |
| Message | Send | `/api/v1/chat.sendMessage` | `POST` |
| Message | Update | `/api/v1/chat.update` | `POST` |
| Message | Delete | `/api/v1/chat.delete` | `POST` |
| Room | Get Info | `/api/v1/rooms.info` | `GET` |
| Room | Get Members | `/api/v1/channels.members` or `/api/v1/groups.members` | `GET` |
| User | List | `/api/v1/users.list` | `GET` |
| User | Get | `/api/v1/users.info` | `GET` |
| User | Invite To Room | `/api/v1/channels.invite` or `/api/v1/groups.invite` | `POST` |
| User | Kick From Room | `/api/v1/channels.kick` or `/api/v1/groups.kick` | `POST` |

### Credential authentication

- **Personal Access Token** — send `X-Auth-Token` and `X-User-Id` headers with every request. The credential test calls `GET /api/v1/me`.
- **OAuth2** — authorize at `{baseUrl}/oauth/authorize`, exchange at `{baseUrl}/oauth/token`, default scope `users:read rooms:read chat:write`; the access token is then sent as `X-Auth-Token` together with `X-User-Id`.

## Authentication

<!-- Source: https://developer.rocket.chat/apidocs/login-with-username-and-password.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Login with Username and Password

> -  Although none of the body parameters are required, it's mandatory to include  either the `user` AND `password`  or only the `resume` parameter.

- To authenticate a request, you need to pass the `userId` and `authToken` values from this JSON response object as headers in the request. The `authToken` is passed as `X-Auth-Token` header, while the `userId` as `X-User-Id` header.

-  If LDAP authentication is enabled, you must maintain the login in the same way as you normally do. Similarly, if 2FA is enabled for an LDAP user, everything stays the same.
  
### Changelog
| Version      | Description | 
 | ---------------- | ------------|
 |1.0.0            | Added `avatarUrl` property to response       |
 |0.64.0            | Added `me` property.      |
 |0.60.0            | Added      |

## OpenAPI

````json POST /api/v1/login
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Authentication"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "Authentication"
    },
    {
      "name": "Two-Factor Authentication"
    }
  ],
  "paths": {
    "/api/v1/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "Login with Username and Password",
        "description": "-  Although none of the body parameters are required, it's mandatory to include  either the `user` AND `password`  or only the `resume` parameter.\n\n- To authenticate a request, you need to pass the `userId` and `authToken` values from this JSON response object as headers in the request. The `authToken` is passed as `X-Auth-Token` header, while the `userId` as `X-User-Id` header.\n\n-  If LDAP authentication is enabled, you must maintain the login in the same way as you normally do. Similarly, if 2FA is enabled for an LDAP user, everything stays the same.\n  \n### Changelog\n| Version      | Description | \n | ---------------- | ------------|\n |1.0.0            | Added `avatarUrl` property to response       |\n |0.64.0            | Added `me` property.      |\n |0.60.0            | Added      |",
        "operationId": "post-api-v1-login",
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "user": {
                    "type": "string",
                    "description": "Your user name or email.",
                    "example": "myusername"
                  },
                  "password": {
                    "type": "string",
                    "description": "Your pasword.",
                    "example": "my$up3erP@ssw0rd"
                  },
                  "resume": {
                    "type": "string",
                    "description": "Your previously issued `authToken`.",
                    "example": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq"
                  },
                  "code": {
                    "type": "string",
                    "description": "The 2FA code. It is required if your account has two-factor authentication enabled .",
                    "example": "2246d10"
                  }
                }
              },
              "examples": {
                "Example": {
                  "value": {
                    "user": "test@rocket.test",
                    "password": "vanvica32"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "authToken": {
                          "type": "string"
                        },
                        "userId": {
                          "type": "string"
                        },
                        "me": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "emails": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "address": {
                                    "type": "string"
                                  },
                                  "verified": {
                                    "type": "boolean"
                                  }
                                }
                              }
                            },
                            "status": {
                              "type": "string"
                            },
                            "statusConnection": {
                              "type": "string"
                            },
                            "username": {
                              "type": "string"
                            },
                            "utcOffset": {
                              "type": "integer"
                            },
                            "active": {
                              "type": "boolean"
                            },
                            "roles": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "settings": {
                              "type": "object",
                              "properties": {
                                "preferences": {
                                  "type": "object"
                                }
                              }
                            },
                            "avatarUrl": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  },
                  "x-examples": {
                    "Example": {
                      "status": "success",
                      "data": {
                        "authToken": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq",
                        "userId": "aobEdbYhXfu5hkeqG",
                        "me": {
                          "_id": "aYjNnig8BEAWeQzMh",
                          "name": "Rocket Cat",
                          "emails": [
                            {
                              "address": "rocket.cat@rocket.chat",
                              "verified": "false"
                            }
                          ],
                          "status": "offline",
                          "statusConnection": "offline",
                          "username": "rocket.cat",
                          "utcOffset": "-3",
                          "active": "true",
                          "roles": [
                            "admin"
                          ],
                          "settings": {
                            "preferences": {}
                          },
                          "avatarUrl": "http://localhost:3000/avatar/test"
                        }
                      }
                    }
                  }
                },
                "examples": {
                  "Login successful": {
                    "value": {
                      "status": "success",
                      "data": {
                        "authToken": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq",
                        "userId": "aobEdbYhXfu5hkeqG",
                        "me": {
                          "_id": "aYjNnig8BEAWeQzMh",
                          "name": "Rocket Cat",
                          "emails": [
                            {
                              "address": "rocket.cat@rocket.chat",
                              "verified": "false"
                            }
                          ],
                          "status": "offline",
                          "statusConnection": "offline",
                          "username": "rocket.cat",
                          "utcOffset": "-3",
                          "active": "true",
                          "roles": [
                            "admin"
                          ],
                          "settings": {
                            "preferences": {}
                          },
                          "avatarUrl": "http://localhost:3000/avatar/test"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

<!-- Source: https://developer.rocket.chat/apidocs/get-profile-information.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Profile Information

> Quick information about the authenticated user.
### Changelog
 | Version      | Description | 
 | ---------------- | ------------|
 |1.0.0            | Added `avatarUrl` property to response       |
 |0.68.0            | Added `customFields` property.      |
 |0.48.0            | Added      |

## OpenAPI

````json GET /api/v1/me
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Authentication"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "Authentication"
    },
    {
      "name": "Two-Factor Authentication"
    }
  ],
  "paths": {
    "/api/v1/me": {
      "get": {
        "tags": [
          "Authentication"
        ],
        "summary": "Get Profile Information",
        "description": "Quick information about the authenticated user.\n### Changelog\n | Version      | Description | \n | ---------------- | ------------|\n |1.0.0            | Added `avatarUrl` property to response       |\n |0.68.0            | Added `customFields` property.      |\n |0.48.0            | Added      |",
        "operationId": "get-api-v1-me",
        "parameters": [
          {
            "name": "X-User-Id",
            "in": "header",
            "description": "The user ID of the user.",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "X-Auth-Token",
            "in": "header",
            "description": "The authorization token of the user.",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK \n\nThe `customFields` parameter won't be returned if it doesn't exist on the workspace.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "emails": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "address": {
                            "type": "string"
                          },
                          "verified": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "status": {
                      "type": "string"
                    },
                    "statusConnection": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "utcOffset": {
                      "type": "integer"
                    },
                    "active": {
                      "type": "boolean"
                    },
                    "roles": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "settings": {
                      "type": "object",
                      "properties": {
                        "preferences": {
                          "type": "object",
                          "properties": {
                            "enableAutoAway": {
                              "type": "boolean"
                            },
                            "idleTimeoutLimit": {
                              "type": "integer"
                            },
                            "desktopNotificationDuration": {
                              "type": "integer"
                            },
                            "audioNotifications": {
                              "type": "string"
                            },
                            "desktopNotifications": {
                              "type": "string"
                            },
                            "mobileNotifications": {
                              "type": "string"
                            },
                            "unreadAlert": {
                              "type": "boolean"
                            },
                            "useEmojis": {
                              "type": "boolean"
                            },
                            "convertAsciiEmoji": {
                              "type": "boolean"
                            },
                            "autoImageLoad": {
                              "type": "boolean"
                            },
                            "saveMobileBandwidth": {
                              "type": "boolean"
                            },
                            "collapseMediaByDefault": {
                              "type": "boolean"
                            },
                            "hideUsernames": {
                              "type": "boolean"
                            },
                            "hideRoles": {
                              "type": "boolean"
                            },
                            "hideFlexTab": {
                              "type": "boolean"
                            },
                            "hideAvatars": {
                              "type": "boolean"
                            },
                            "roomsListExhibitionMode": {
                              "type": "string"
                            },
                            "sidebarViewMode": {
                              "type": "string"
                            },
                            "sidebarHideAvatar": {
                              "type": "boolean"
                            },
                            "sidebarShowUnread": {
                              "type": "boolean"
                            },
                            "sidebarShowFavorites": {
                              "type": "boolean"
                            },
                            "sendOnEnter": {
                              "type": "string"
                            },
                            "messageViewMode": {
                              "type": "integer"
                            },
                            "emailNotificationMode": {
                              "type": "string"
                            },
                            "roomCounterSidebar": {
                              "type": "boolean"
                            },
                            "newRoomNotification": {
                              "type": "string"
                            },
                            "newMessageNotification": {
                              "type": "string"
                            },
                            "muteFocusedConversations": {
                              "type": "boolean"
                            },
                            "notificationsSoundVolume": {
                              "type": "integer"
                            }
                          }
                        }
                      }
                    },
                    "customFields": {
                      "type": "object",
                      "properties": {
                        "twitter": {
                          "type": "string"
                        }
                      }
                    },
                    "avatarUrl": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean"
                    }
                  },
                  "x-examples": {
                    "Example 1": {
                      "_id": "aobEdbYhXfu5hkeqG",
                      "name": "Example User",
                      "emails": [
                        {
                          "address": "example@example.com",
                          "verified": "true"
                        }
                      ],
                      "status": "offline",
                      "statusConnection": "offline",
                      "username": "example",
                      "utcOffset": "0",
                      "active": "true",
                      "roles": [
                        "user",
                        "admin"
                      ],
                      "settings": {
                        "preferences": {
                          "enableAutoAway": "false",
                          "idleTimeoutLimit": "300",
                          "desktopNotificationDuration": "0",
                          "audioNotifications": "mentions",
                          "desktopNotifications": "mentions",
                          "mobileNotifications": "mentions",
                          "unreadAlert": "true",
                          "useEmojis": "true",
                          "convertAsciiEmoji": "true",
                          "autoImageLoad": "true",
                          "saveMobileBandwidth": "true",
                          "collapseMediaByDefault": "false",
                          "hideUsernames": "false",
                          "hideRoles": "false",
                          "hideFlexTab": "false",
                          "hideAvatars": "false",
                          "roomsListExhibitionMode": "category",
                          "sidebarViewMode": "medium",
                          "sidebarHideAvatar": "false",
                          "sidebarShowUnread": "false",
                          "sidebarShowFavorites": "true",
                          "sendOnEnter": "normal",
                          "messageViewMode": "0",
                          "emailNotificationMode": "all",
                          "roomCounterSidebar": "false",
                          "newRoomNotification": "door",
                          "newMessageNotification": "chime",
                          "muteFocusedConversations": "true",
                          "notificationsSoundVolume": "100"
                        }
                      },
                      "customFields": {
                        "twitter": "@userstwi"
                      },
                      "avatarUrl": "http://localhost:3000/avatar/test",
                      "success": "true"
                    }
                  }
                },
                "examples": {
                  "User profile": {
                    "value": {
                      "_id": "aobEdbYhXfu5hkeqG",
                      "name": "Example User",
                      "emails": [
                        {
                          "address": "example@example.com",
                          "verified": "true"
                        }
                      ],
                      "status": "offline",
                      "statusConnection": "offline",
                      "username": "example",
                      "utcOffset": "0",
                      "active": "true",
                      "roles": [
                        "user",
                        "admin"
                      ],
                      "settings": {
                        "preferences": {
                          "enableAutoAway": "false",
                          "idleTimeoutLimit": "300",
                          "desktopNotificationDuration": "0",
                          "audioNotifications": "mentions",
                          "desktopNotifications": "mentions",
                          "mobileNotifications": "mentions",
                          "unreadAlert": "true",
                          "useEmojis": "true",
                          "convertAsciiEmoji": "true",
                          "autoImageLoad": "true",
                          "saveMobileBandwidth": "true",
                          "collapseMediaByDefault": "false",
                          "hideUsernames": "false",
                          "hideRoles": "false",
                          "hideFlexTab": "false",
                          "hideAvatars": "false",
                          "roomsListExhibitionMode": "category",
                          "sidebarViewMode": "medium",
                          "sidebarHideAvatar": "false",
                          "sidebarShowUnread": "false",
                          "sidebarShowFavorites": "true",
                          "sendOnEnter": "normal",
                          "messageViewMode": "0",
                          "emailNotificationMode": "all",
                          "roomCounterSidebar": "false",
                          "newRoomNotification": "door",
                          "newMessageNotification": "chime",
                          "muteFocusedConversations": "true",
                          "notificationsSoundVolume": "100"
                        }
                      },
                      "customFields": {
                        "twitter": "@userstwi"
                      },
                      "avatarUrl": "http://localhost:3000/avatar/test",
                      "success": "true"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---


<!-- Source: https://developer.rocket.chat/apidocs/generate-personal-access-token.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate Personal Access Token

> Permission required: `create-personal-access-tokens`. 

* This endpoint requires <a href="https://developer.rocket.chat/apidocs/introduction-to-two-factor-authentication" target="_blank">two-factor authentication</a>.

* Note that the generated access tokens are irrecoverable, so storing them safely is essential. If a token is lost or forgotten, it can be regenerated or deleted.
* When making calls to the API that mandate authentication, include the generated token in the `X-Auth-Token` header and your user ID in the `X-User-Id` header to authenticate the requests.
Visit the <a href="https://docs.rocket.chat/docs/manage-personal-access-tokens" target="_blank"> Personal Access Token user guide</a> for more details.

### Changelog
| Version      | Description |
| ---------------- | ------------|
|3.1.0            | Added `bypassTwoFactor` param       |
|0.69.0            | Added       |

## OpenAPI

````json POST /api/v1/users.generatePersonalAccessToken
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "User Management"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "LDAP"
    },
    {
      "name": "Permissions"
    },
    {
      "name": "Roles"
    },
    {
      "name": "Users"
    }
  ],
  "paths": {
    "/api/v1/users.generatePersonalAccessToken": {
      "parameters": [],
      "post": {
        "summary": "Generate Personal Access Token",
        "operationId": "post-api-v1-users.generatePersonalAccessToken",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Success Example": {
                    "value": {
                      "token": "2jdk99wuSjXPO201XlAks9sjDjAhSJmskAKW301mSuj9Sk",
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    },
                    "errorType": {
                      "type": "string"
                    },
                    "details": {
                      "type": "object",
                      "properties": {
                        "method": {
                          "type": "string"
                        },
                        "codeGenerated": {
                          "type": "boolean"
                        },
                        "availableMethods": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {}
                          }
                        }
                      }
                    }
                  }
                },
                "examples": {
                  "Example 1": {
                    "value": {
                      "success": "false",
                      "error": "TOTP Required [totp-required]",
                      "errorType": "totp-required",
                      "details": {
                        "method": "password",
                        "codeGenerated": "false",
                        "availableMethods": []
                      }
                    }
                  },
                  "Example 2": {
                    "value": {
                      "success": "false",
                      "error": "The 'tokenName' param is required"
                    }
                  },
                  "Example 3": {
                    "value": {
                      "success": "false",
                      "error": "Not Authorized [not-authorized]",
                      "errorType": "not-authorized",
                      "details": {
                        "method": "personalAccessTokens:generateToken"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          }
        },
        "description": "Permission required: `create-personal-access-tokens`. \n\n* This endpoint requires <a href=\"https://developer.rocket.chat/apidocs/introduction-to-two-factor-authentication\" target=\"_blank\">two-factor authentication</a>.\n\n* Note that the generated access tokens are irrecoverable, so storing them safely is essential. If a token is lost or forgotten, it can be regenerated or deleted.\n* When making calls to the API that mandate authentication, include the generated token in the `X-Auth-Token` header and your user ID in the `X-User-Id` header to authenticate the requests.\nVisit the <a href=\"https://docs.rocket.chat/docs/manage-personal-access-tokens\" target=\"_blank\"> Personal Access Token user guide</a> for more details.\n\n### Changelog\n| Version      | Description |\n| ---------------- | ------------|\n|3.1.0            | Added `bypassTwoFactor` param       |\n|0.69.0            | Added       |",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          },
          {
            "$ref": "#/components/parameters/x-2fa-code"
          },
          {
            "$ref": "#/components/parameters/x-2fa-method"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "tokenName": {
                    "type": "string",
                    "description": "The name of the token."
                  },
                  "bypassTwoFactor": {
                    "type": "boolean",
                    "description": "If 2FA requirement should be ignored when using this token.",
                    "default": "false"
                  }
                },
                "required": [
                  "tokenName"
                ]
              },
              "examples": {
                "Example 1": {
                  "value": {
                    "tokenName": "mypersonaltoken",
                    "bypassTwoFactor": "false"
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Users"
        ]
      }
    }
  },
  "components": {
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    },
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The authenticated user token.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The authenticated user ID.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      },
      "x-2fa-code": {
        "name": "x-2fa-code",
        "in": "header",
        "description": "Enter the 2FA code. This parameter is required if 2FA is enabled in your workspace. See the <a href=\"https://developer.rocket.chat/apidocs/introduction-to-two-factor-authentication\" target=\"_blank\">Introduction to Two-Factor Authentication</a> document for details.",
        "schema": {
          "type": "string"
        },
        "example": "148750"
      },
      "x-2fa-method": {
        "name": "x-2fa-method",
        "in": "header",
        "schema": {
          "type": "string"
        },
        "description": "Enter the method with which you get the 2FA code. It can be `email`, `totp`, or `password`. This parameter is required if 2FA is enabled in your workspace."
      }
    }
  }
}
````



---

## Users

<!-- Source: https://developer.rocket.chat/apidocs/get-users-list.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Users List

> - Gets all of the users in the system and their information. The result is limited to what the request sender has permission to view.
- This endpoint supports filtering users using the `query` parameter. It can be used to locate a user record and retrieve the corresponding `userId` for use with the `users.info` endpoint.
- The `query` parameter is considered unsafe and is deprecated. Its support is expected to be removed in a future major version. There is currently no direct replacement for email-based user lookup.

**Permissons required**:
- `view-d-room`: Required to view direct messages
- `view-full-other-user-info`: Required to view complete user information (e.g., account creation date, last login)
- `view-outside-room`: (Only required if the setting `Apply_permission_view-outside-room` is enabled on under **Settings** > **General** > **Rest API**). Required to view rooms that the user is not a member of.

### Changelog
| Version      | Description |
| ---------------- | ------------|
|8.4.0             | Added `email` query parameter for filtering |
|0.49.0            | `Count` and `offset` query parameters supported.       |
|0.35.0            | Added       |

## OpenAPI

````json GET /api/v1/users.list
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "User Management"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "LDAP"
    },
    {
      "name": "Permissions"
    },
    {
      "name": "Roles"
    },
    {
      "name": "Users"
    }
  ],
  "paths": {
    "/api/v1/users.list": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get Users List",
        "description": "- Gets all of the users in the system and their information. The result is limited to what the request sender has permission to view.\n- This endpoint supports filtering users using the `query` parameter. It can be used to locate a user record and retrieve the corresponding `userId` for use with the `users.info` endpoint.\n- The `query` parameter is considered unsafe and is deprecated. Its support is expected to be removed in a future major version. There is currently no direct replacement for email-based user lookup.\n\n**Permissons required**:\n- `view-d-room`: Required to view direct messages\n- `view-full-other-user-info`: Required to view complete user information (e.g., account creation date, last login)\n- `view-outside-room`: (Only required if the setting `Apply_permission_view-outside-room` is enabled on under **Settings** > **General** > **Rest API**). Required to view rooms that the user is not a member of.\n\n### Changelog\n| Version      | Description |\n| ---------------- | ------------|\n|8.4.0             | Added `email` query parameter for filtering |\n|0.49.0            | `Count` and `offset` query parameters supported.       |\n|0.35.0            | Added       |",
        "operationId": "get-api-v1-users.list",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          },
          {
            "$ref": "#/components/parameters/query"
          },
          {
            "$ref": "#/components/parameters/fields"
          },
          {
            "$ref": "#/components/parameters/offset"
          },
          {
            "$ref": "#/components/parameters/count"
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "sort",
            "description": "Sort the users in ascending (`1`) or descending (`-1`) order. The value must be entered as a JSON string. The options are as follows: * `status`: Sort by users' status. For example, `sort={\"status\":1}` (this maps to the `active` status). * `createdAt`: Sort by the time of user creation. For example, `sort={\"createdAt\":-1}` * `name`: Sort by user name. For example, `sort={\"name\":1}`"
          },
          {
            "name": "email",
            "in": "query",
            "required": "false",
            "description": "Filter users by email address. Minimum length: 1 character.",
            "schema": {
              "type": "string",
              "minLength": "1",
              "nullable": "true"
            },
            "example": "user@example.com"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "users": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "username": {
                            "type": "string"
                          },
                          "emails": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "address": {
                                  "type": "string"
                                },
                                "verified": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "type": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string"
                          },
                          "active": {
                            "type": "boolean"
                          },
                          "roles": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "name": {
                            "type": "string"
                          },
                          "lastLogin": {
                            "type": "string"
                          },
                          "nameInsensitive": {
                            "type": "string"
                          },
                          "avatarETag": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "count": {
                      "type": "integer"
                    },
                    "offset": {
                      "type": "integer"
                    },
                    "total": {
                      "type": "integer"
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Success Example": {
                    "value": {
                      "users": [
                        {
                          "_id": "DGsmi2J4WjizYn7jc",
                          "username": "uniqueusername",
                          "emails": [
                            {
                              "address": "email@user.tld",
                              "verified": "false"
                            }
                          ],
                          "type": "user",
                          "status": "offline",
                          "active": "true",
                          "roles": [
                            "bot",
                            "user"
                          ],
                          "name": "name",
                          "nameInsensitive": "name"
                        },
                        {
                          "_id": "uZ5JvvioeHK8Coyqe",
                          "active": "true",
                          "type": "user",
                          "status": "offline",
                          "roles": [
                            "anonymous",
                            "user"
                          ],
                          "lastLogin": "2023-05-16T20:50:33.579Z",
                          "username": "user-0",
                          "nameInsensitive": ""
                        },
                        {
                          "_id": "aspKK7FHe7iQgzexX",
                          "active": "true",
                          "type": "user",
                          "status": "offline",
                          "roles": [
                            "anonymous",
                            "user"
                          ],
                          "lastLogin": "2023-05-12T10:44:46.703Z",
                          "username": "user-00",
                          "name": "User 00",
                          "emails": [
                            {
                              "address": "user00@mail.cm",
                              "verified": "false"
                            }
                          ],
                          "nameInsensitive": "user 00"
                        }
                      ],
                      "count": "3",
                      "offset": "0",
                      "total": "3",
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The authenticated user token.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The authenticated user ID.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      },
      "query": {
        "name": "query",
        "in": "query",
        "required": "false",
        "schema": {},
        "description": "This parameter allows you to use [MongoDB query](https://www.mongodb.com/docs/manual/reference/operator/query/) operators to search for specific data. For example, to query users with a name that contains the letter \"g\": query=`{ \"name\": { \"$regex\": \"g\" } }`. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#query-and-fields) to learn more. ",
        "allowEmptyValue": "false"
      },
      "fields": {
        "name": "fields",
        "in": "query",
        "required": "false",
        "schema": {},
        "description": " This parameter accepts a JSON object with properties that have a value of 1 or 0 to include or exclude them in the response. For example, to only retrieve the usernames of users: fields=`{ \"username\": 1 }`. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#query-and-fields) to learn more."
      },
      "offset": {
        "name": "offset",
        "in": "query",
        "required": "false",
        "schema": {
          "type": "integer"
        },
        "example": "50",
        "description": "Number of items to \"skip\" in the query, i.e. requests return count items, skipping the first offset items. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more."
      },
      "count": {
        "name": "count",
        "in": "query",
        "required": "false",
        "schema": {
          "type": "integer"
        },
        "example": "50",
        "description": "How many items to return. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more."
      }
    },
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

<!-- Source: https://developer.rocket.chat/apidocs/get-users-info.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Get User's Info

> - Retrieves information about a user. The result is limited only to what you have access to view.
- This endpoint supports lookup by `userId`, `username`, `importId`, `email`, or `freeSwitchExtension`. Provide exactly one of these parameters per request.
- From version `7.0.0`, this endpoint no longer supports the `fields` parameter, even when the `ALLOW_UNSAFE_QUERY_AND_FIELDS_API_PARAMS: true` environment variable is set. Instead, use the `includeUserRooms` parameter.

### Changelog
| Version      | Description |
| ---------------- | ------------|
|8.5.0             | Added `freeSwitchExtension` query parameter for user lookup |
|8.4.0             | Added `email` query parameter for user lookup |
|7.0.0             | Removed the `fields` query parameter       |
|3.4.0             | Added `unread` property inside `rooms` object       |
|0.70.0            | Added `rooms` property to response if the user request it and has the `view-other-user-channels` permission       |
|0.49.0            | Updated to support `userId` or `username`       |
|0.48.0            | Renamed to `users.info`       |
|0.35.0            | Added       |

## OpenAPI

````json GET /api/v1/users.info
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "User Management"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "LDAP"
    },
    {
      "name": "Permissions"
    },
    {
      "name": "Roles"
    },
    {
      "name": "Users"
    }
  ],
  "paths": {
    "/api/v1/users.info": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get User's Info",
        "description": "- Retrieves information about a user. The result is limited only to what you have access to view.\n- This endpoint supports lookup by `userId`, `username`, `importId`, `email`, or `freeSwitchExtension`. Provide exactly one of these parameters per request.\n- From version `7.0.0`, this endpoint no longer supports the `fields` parameter, even when the `ALLOW_UNSAFE_QUERY_AND_FIELDS_API_PARAMS: true` environment variable is set. Instead, use the `includeUserRooms` parameter.\n\n### Changelog\n| Version      | Description |\n| ---------------- | ------------|\n|8.5.0             | Added `freeSwitchExtension` query parameter for user lookup |\n|8.4.0             | Added `email` query parameter for user lookup |\n|7.0.0             | Removed the `fields` query parameter       |\n|3.4.0             | Added `unread` property inside `rooms` object       |\n|0.70.0            | Added `rooms` property to response if the user request it and has the `view-other-user-channels` permission       |\n|0.49.0            | Updated to support `userId` or `username`       |\n|0.48.0            | Renamed to `users.info`       |\n|0.35.0            | Added       |",
        "operationId": "get-api-v1-users.info",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          },
          {
            "name": "userId",
            "in": "query",
            "description": "The `userId` of the user. Alternatively, you can use `username`, `importId`, `email`, or `freeSwitchExtension` to retrieve user information.",
            "required": "false",
            "schema": {
              "type": "string"
            },
            "example": "W7NHuX5ri2e3mu2Fc"
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "username",
            "description": "The username of the user. Alternatively, you can use `userId`, `importId`, `email`, or `freeSwitchExtension` to retrieve user information."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "importId",
            "description": "The import ID of the user. Alternatively, you can use `userId`, `username`, `email`, or `freeSwitchExtension` to retrieve user information."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "includeUserRooms",
            "description": "Whether to include the list of rooms the user is a member of."
          },
          {
            "name": "email",
            "in": "query",
            "required": "false",
            "description": "Filter the results by entering the user's email. Alternatively, you can use `userId`, `username`, `importId`, or `freeSwitchExtension` to retrieve user information.",
            "schema": {
              "type": "string"
            },
            "example": "john@example.com"
          },
          {
            "name": "freeSwitchExtension",
            "in": "query",
            "required": "false",
            "description": "The FreeSwitch voice call extension assigned to the user. Alternatively, you can use `userId`, `username`, `importId`, or `email` to retrieve user information.",
            "schema": {
              "type": "string"
            },
            "example": "1234"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "user": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "createdAt": {
                          "type": "string"
                        },
                        "username": {
                          "type": "string"
                        },
                        "emails": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "address": {
                                "type": "string"
                              },
                              "verified": {
                                "type": "boolean"
                              }
                            }
                          }
                        },
                        "type": {
                          "type": "string"
                        },
                        "status": {
                          "type": "string"
                        },
                        "active": {
                          "type": "boolean"
                        },
                        "roles": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "name": {
                          "type": "string"
                        },
                        "requirePasswordChange": {
                          "type": "boolean"
                        },
                        "lastLogin": {
                          "type": "string"
                        },
                        "statusConnection": {
                          "type": "string"
                        },
                        "utcOffset": {
                          "type": "integer"
                        },
                        "freeSwitchExtension": {
                          "type": "string"
                        },
                        "canViewAllInfo": {
                          "type": "boolean"
                        }
                      }
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Success Example": {
                    "value": {
                      "user": {
                        "_id": "5fRTXMt7DMJbpPJfh",
                        "createdAt": "2023-07-10T16:44:58.548Z",
                        "services": {
                          "password": "true",
                          "email2fa": {
                            "enabled": "true",
                            "changedAt": "2023-07-10T16:44:58.546Z"
                          },
                          "resume": {
                            "loginTokens": [
                              {
                                "when": "2023-10-05T18:55:02.996Z",
                                "hashedToken": "..."
                              },
                              {
                                "when": "2023-10-05T19:09:30.415Z",
                                "hashedToken": "...."
                              },
                              {
                                "when": "2023-10-10T23:40:46.098Z",
                                "hashedToken": "...."
                              }
                            ]
                          }
                        },
                        "username": "test.john",
                        "emails": [
                          {
                            "address": "test.john@test.com",
                            "verified": "true"
                          }
                        ],
                        "type": "user",
                        "status": "offline",
                        "active": "true",
                        "roles": [
                          "user",
                          "admin"
                        ],
                        "name": "Test John",
                        "requirePasswordChange": "false",
                        "lastLogin": "2023-10-10T23:40:46.093Z",
                        "statusConnection": "offline",
                        "utcOffset": "1",
                        "statusText": "",
                        "avatarETag": "GFoEi6wv3uAxnzDcD",
                        "nickname": "tesuser2",
                        "freeSwitchExtension": "1234",
                        "canViewAllInfo": "true",
                        "rooms": [
                          {
                            "_id": "651667dda2f73c7460e18cce",
                            "unread": "1",
                            "rid": "JKa7R9zu2DinBhBN9",
                            "name": "Livestream",
                            "t": "c"
                          },
                          {
                            "_id": "64ac358a79f5c6e276cfe718",
                            "unread": "0",
                            "rid": "GENERAL",
                            "name": "general",
                            "t": "c"
                          },
                          {
                            "_id": "64aca0e5aa5ad4273bfbfdb8",
                            "unread": "0",
                            "rid": "6GFJ3tbmHiyHbahmC",
                            "name": "test-audit",
                            "t": "c"
                          },
                          {
                            "_id": "64adb09baa5ad4273bfc0cc0",
                            "unread": "0",
                            "rid": "64adb09baa5ad4273bfc0cbf",
                            "name": "test-room",
                            "t": "c",
                            "roles": [
                              "owner"
                            ]
                          },
                          {
                            "_id": "64fd791c2c26843a68c1f7e5",
                            "unread": "0",
                            "rid": "siyr2oWQJBjQjhLwr",
                            "name": "try",
                            "t": "c",
                            "roles": []
                          },
                          {
                            "_id": "g5xHGWAGLA7vZXwW8",
                            "rid": "5fRTXMt7DMJbpPJfhrbAXPnMktTFbNpwtJ",
                            "name": "roxie",
                            "t": "d",
                            "unread": "2"
                          },
                          {
                            "_id": "64ef8a982c26843a68c1f7ae",
                            "unread": "0",
                            "rid": "WDuJLFkjwk6L7LdFC",
                            "name": "new",
                            "t": "p",
                            "roles": [
                              "leader"
                            ]
                          }
                        ]
                      },
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    },
                    "errorType": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "Missing / invalid lookup": {
                    "value": {
                      "success": "false",
                      "error": "must have required property 'userId'\n must have required property 'username'\n must have required property 'importId'\n must match a schema in anyOf [invalid-params]",
                      "errorType": "invalid-params"
                    }
                  },
                  "User not found": {
                    "value": {
                      "success": "false",
                      "error": "User not found."
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The authenticated user token.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The authenticated user ID.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      }
    },
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

## Channels

<!-- Source: https://developer.rocket.chat/apidocs/create-channel.md -->

---
title: "Create Channel"
slug: "create-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/create-channel"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Channel

Post/api/v1/channels.create

Create a public channel. Optionally, include specified users. The channel creator is included as a member by default. Permission required: `create-c`. Channel naming has restraints following the regex filter `[0-9a-zA-Z-_.]+` by default. See [UTF8 Settings](https://docs.rocket.chat/docs/general#utf8) to modify regex filter for channel names. Channel names must not allow for any whitespaces.

### Changelog

| Version | Description |
| --- | --- |
| 6.4.1 | Added `excludeSelf` param |
| 0.13.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='acaaa7d2-04df-4fb4-bf2f-3cb92354f307'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='07010a2f-a4f5-4d47-a6af-55e28d950acb'>Example</option>
</select>Example

```json
{
  "name": "channelname",
  "members": [
    "rocket.cat"
  ],
  "readOnly": true,
  "excludeSelf": true,
  "customFields": {
    "type": "default"
  },
  "extraData": {
    "broadcast": true,
    "encrypted": false,
    "teamId": "658441562dd9f928ad9951aa"
  }
}
```

Expand Allobject  namestring    Required

The name of the channel.

members Array of string   

An array of the users to be added to the channel when it is created.

string    
readOnlyboolean    

Set if the channel is read only or not. It is `false` by default.

excludeSelfboolean    

If set to true, the user calling the endpoint is not automatically added as a member of the channel. The default `value` is false.

customFieldsobject  

If you have defined custom fields for your workspace, you can provide them in this object parameter. For details, see the [Custom Fields](https://docs.rocket.chat/docs/custom-fields) document.

extraDataobject  

Enter the following details for the object:

- `broadcast`: Whether the channel should be a broadcast room.
- `encrypted`: Whether the channel should be encrypted.
- `teamId`: Enter an existing team ID for this channel. You need the `create-team-channel` permission to add a team to a channel.

For more information, see [Channels](https://docs.rocket.chat/use-rocket.chat/user-guides/rooms/channels#channel-privacy-and-encryption)

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='dc5bdc49-41b3-4d2d-95db-a6982e210d0b'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='e7b34f1b-b9c0-4f75-8cca-90d6f2d5ef4f'>Example</option>
</select>Example

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "channelname",
    "t": "c",
    "usernames": [
      "example"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "example"
    },
    "ts": "2016-05-30T13:42:25.304Z"
  },
  "success": true
}
```

Expand Allobject  channelobject  _idstring    
fnamestring    
_updatedAtstring    
customFieldsobject  
namestring    
tstring    
msgsinteger    
usersCountinteger    
uobject  _idstring    
usernamestring    
namestring    

tsstring    
roboolean    
defaultboolean    
sysMesboolean    

successboolean    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='b745c2a2-8257-46bc-bbe4-6532d0031c4e'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='ebf3f53b-1d86-48a9-8af6-3d692816580e'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/archive-channel.md -->

---
title: "Archive Channel"
slug: "archive-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/archive-channel"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Archive Channel

Post/api/v1/channels.archive

Archive a channel. Permission required: `archive-room`

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='7164d8e9-5a97-45a6-98ae-d4654abfbf87'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='abbcb0c2-4dbf-47a9-b136-9986b7d48f13'>Example</option>
</select>Example

```json
{
  "roomId": "ByehQjC44FwMeiLbX"
}
```

object  roomIdstring    Required

The channel ID that you want to archive.

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='d70223bc-da2e-4583-85e6-853fa30b4905'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='f15cb7be-444a-4ee4-9553-25dadc8dd3d1'>Success</option>
</select>Success

```json
{
  "success": true
}
```

object  successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='8500c322-8455-424c-95a5-5b4b72156c3d'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='36e3a918-f916-458d-9393-0474e988d637'>Channel is already archived</option>
</select>Channel is already archived

```json
{
  "success": false,
  "error": "The channel, add-room-websocket, is archived [error-room-archived]",
  "errorType": "error-room-archived"
}
```

object  successboolean    
errorstring    
errorTypestring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='05e90f21-341b-4e09-9f23-7281daa5613e'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='cf871e0e-d067-43c6-a9ef-2135b0367ea9'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/delete-channel.md -->

---
title: "Delete Channel"
slug: "delete-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/delete-channel"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Channel

Post/api/v1/channels.delete

Delete a channel. Any of the permssions are required:

- `delete-c`: Delete a public channel.
- `delete-team-channel`: Delete a channel part of a team. You also need the `delete-c` permission.

### Changelog

| Version | Description |
| --- | --- |
| 0.71.0 | Removed `channel` property |
| 0.49.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='4c49c6e9-2430-4928-bfe3-618e80231b2b'>application/json</option>
</select>object  roomIdstring    

Enter the room ID. This parameter is required if no `roomName` is provided.

ExampleByehQjC44FwMeiLbX
roomNamestring    

Enter the room name. This parameter is required if no `roomId` is provided.

Examplegeneral

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='e0dbc7e6-40b1-4dab-adb1-615597d604a2'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='04d142c8-e357-4ebe-8b15-45d797ddee67'>Success</option>
</select>Success

```json
{
  "success": true
}
```

object  successboolean    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='95c97848-5f56-423d-958c-a86173505d26'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='ba63b0ac-a007-450c-a6dc-3a04cf761eb6'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/add-users-to-channel.md -->

---
title: "Add Users to Channel"
slug: "add-users-to-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/add-users-to-channel"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Users to Channel

Post/api/v1/channels.invite

Add a user or bulk users to a channel.

For a user to invite other users, they must match at least one of the following premises:

- The user is part of a room of any type and has the `add-user-to-joined-room` permission.
- The user is part of a public room `(t: 'c')` and has the `add-user-to-any-c-room` permission.
- The user is part of a private room `(t: 'p')` and has the `add-user-to-any-p-room` permission.

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='031d4738-91e8-4f00-9f6a-ef2bb4372678'>application/json</option>
</select>Expand Allobject  OneOfobjectobjectroomIdstring    Required

The channel's ID.

ExamplenSYqWzZ4GsKTX4dyK
userIdstring    Required

The user id to be invited.

ExampleByehQjC44FwMeiLbX

objectobjectroomIdstring    Required

The channel's id

ExamplenSYqWzZ4GsKTX4dyK
userIds Array of object   Required

An array of the userId of users to be invited

object  typestring    
valuestring    

		
			

You can enter the user ID of one user or add multiple users. Use any one of the objects above as the body parameters.

		
		
Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='fd810cdd-a9ae-4ab3-a1a4-1b72c4258b18'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='31fd327d-8938-4aaf-a9fb-bdca02266993'>Add bulk users</option>
<option value='2bdcb50d-8c5d-46de-a432-a003d3686959'>Add a user</option>
</select>Add bulk users

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1"
    ],
    "msgs": 1,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```

Add a user

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "c",
    "name": "testing",
    "usernames": "testing",
    "msgs": 1,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```

Expand Allobject  channelobject  _idstring    
fnamestring    
customFieldsobject  
descriptionstring    
broadcastboolean    
encryptedboolean    
federatedboolean    
namestring    
tstring    
msgsinteger    
usersCountinteger    
uobject  _idstring    
usernamestring    

tsstring    
roboolean    
defaultboolean    
sysMesboolean    
_updatedAtstring    
lmstring    
lastMessageobject  _idstring    
tstring    
msgstring    
groupableboolean    
blocks Array of object   object  typestring    
blockIdstring    
callIdstring    
appIdstring    

tsstring    
uobject  _idstring    
usernamestring    
namestring    

ridstring    
_updatedAtstring    
urls Array of object   object  
mentions Array of object   object  
channels Array of object   object  

successboolean    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='c47ac289-1b45-42c2-a1e7-573d2287c05c'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='da2aa557-b42e-45af-84cf-bbf0d66fd2e9'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/remove-user-from-channel.md -->

---
title: "Remove User from Channel"
slug: "remove-user-from-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/remove-user-from-channel"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove User from Channel

Post/api/v1/channels.kick

Remove a user from the channel.

Permissions required:

- `remove-user`: To remove a user from any room.
- `kick-user-from-any-c-room`: To remove a user from a public channel. You also need the `remove-user` permission.

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Body parameters<select class='api-response-data' aria-label='Media type'><option value='c0da1512-a443-41c9-b509-83ceb6dd4ec9'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='48136622-2063-40fb-8270-e937e303104e'>Example</option>
</select>Example

```json
{
  "roomId": "WDuJLFkjwk6L7LdFC",
  "userId": "rYhzFRd2QZjNwAAXX"
}
```

object  roomIdstring    Required

The channel's id

userIdstring    Required

The id of the user to be removed.

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='d9f633b8-3680-4dbe-9a69-8b5e9f77b82a'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='3e41c168-72cc-4583-9fbb-808668ddffa7'>Example</option>
</select>Example

```json
{
  "channel": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "c",
    "usernames": [
      "testing1"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```

Expand Allobject  channelobject  _idstring    
fnamestring    
customFieldsobject  
topicstring    
broadcastboolean    
encryptedboolean    
namestring    
tstring    
msgsinteger    
usersCountinteger    
uobject  _idstring    
usernamestring    

tsstring    
roboolean    
defaultboolean    
sysMesboolean    
_updatedAtstring    
lastMessageobject  _idstring    
ridstring    
msgstring    
tsstring    
uobject  _idstring    
usernamestring    
namestring    

_updatedAtstring    
urls Array of object   object  
mentions Array of object   object  
channels Array of object   object  
md Array of object   object  typestring    
value Array of object   object  typestring    
valuestring    

lmstring    

successboolean    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='141b6588-816f-429b-abc6-5bb2d26e4ef9'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='670c2195-6f67-4076-9915-04fbfb849536'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/get-members-of-a-channel.md -->

---
title: "Get Members of a Channel"
slug: "get-members-of-a-channel"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/get-members-of-a-channel"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Members of a Channel

Get/api/v1/channels.members

Lists all channel users. The list of elements a user can use to sort the list is limited. The current sortable element is: `username`.

If the channel is a broadcast channel, you need the `view-broadcast-member-list` permission.

### Changelog

| Version | Description |
| --- | --- |
| 0.59.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Query parametersroomIdstring

The room ID. It is required if the `roomName` is not provided.

Exampledlpfuijw7ej
roomNamestring

The room name. It is required if the `roomId` is not provided.

Examplegeneral
statusarray of string

The user's status (search filter).

Example['online', 'away']
filterstring

Extra search filters to be applied to the fields defined in the `Accounts_SearchFields`setting.

Examplemy-nickname
sort

List of fields to order by, and in which direction. This is a JSON object, with properties listed in desired order, with values of 1 for ascending, or -1 for descending. For example, {"value": -1, "_id": 1}. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

countinteger

The number of items to return. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

Example50
offsetinteger

Number of items to "skip" in the query, i.e. requests return count items, skipping the first offset items. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

Example50

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='5393a63e-4865-4556-a40f-9ff77a5f0dac'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='55b91551-b792-4e52-ad2b-130707f6f2a5'>Success</option>
</select>Success

```json
{
  "members": [
    {
      "_id": "rbAXPnMktTFbNpwtJ",
      "username": "roxie",
      "status": "offline",
      "_updatedAt": "2023-09-24T22:27:33.610Z",
      "name": "test test",
      "nickname": "baby girl"
    },
    {
      "_id": "5fRTXMt7DMJbpPJfh",
      "username": "test.test",
      "status": "offline",
      "_updatedAt": "2023-09-16T08:33:38.123Z",
      "name": "Testtest",
      "avatarETag": "GFoEi6wv3uAxnzDcD",
      "nickname": "test.test"
    }
  ],
  "count": 2,
  "offset": 0,
  "total": 2,
  "success": true
}
```

Expand Allobject  members Array of object   object  _idstring    
usernamestring    
statusstring    
_updatedAtstring    
namestring    
nicknamestring    
avatarETagstring    

countinteger    
offsetinteger    
totalinteger    
successboolean    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='2b7cdbb7-b4d7-45e4-84d9-b703fdc06a0b'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='b337f6cb-852c-4188-abf9-b0144136d09d'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

## Groups

<!-- Source: https://developer.rocket.chat/apidocs/create-group.md -->

---
title: "Create Group"
slug: "create-group"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/create-group"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Group

Post/api/v1/groups.create

Create a new private channel, optionally including specified users. Refer to the [Channels](https://docs.rocket.chat/docs/channels) documents for information on the available room options.

The following permissions are required:

- `create-p`: This permission is required to create a private channel.
- `create-team-group`: This permission is required if you want to create a private channel from an existing team.

### Changelog

| Version | Description |
| --- | --- |
| 6.4.1 | Added `excludeSelf` param |
| 0.35.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='51dac5a3-5620-431d-82a4-a8021fb4bc5d'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='c5d39950-f247-4c70-b8e0-1dfabece6714'>Example</option>
</select>Example

```json
{
  "name": "groupname",
  "members": [
    "rocket.cat"
  ],
  "readOnly": true,
  "excludeSelf": true,
  "customFields": {
    "type": "default"
  },
  "extraData": {
    "broadcast": true,
    "encrypted": false,
    "teamId": "658441562dd9f928ad9951aa"
  }
}
```

Expand Allobject  namestring    Required

The name of the new private group.

Examplegroupname
readOnlyboolean    

Set if the private channel is read-only or not. The default value is false.

Examplefalse
members Array of string   

The users to add to the private channel when it is created.

string    Examplerocket.cat
excludeSelfboolean    

If set to true, the user calling the endpoint is not added as a member of the private channel. The default value is false.

Examplefalse
customFieldsobject  

You add custom fields for private rooms using this parameter. Enter the key and value that you want to associate with this room. For example, `{ &quot;company&quot;: &quot;sell-and-more&quot; }`. The custom fields are not displayed in the workspace UI.

extraDataobject  

Enter the following details for the object:

Note: For more information, see [Channels](https://docs.rocket.chat/docs/channels).

broadcastboolean    

Whether the group should be a broadcast group. False by default.

encryptedboolean    

Whether the group should be encrypted. False by default.

teamIdstring    

Enter the team ID for which you want to create a group. You will get an error if the team does not exist.

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='4680dfb4-4aeb-4207-b6f9-1050377f0cc1'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='aa0dac08-7d2b-4131-b7f7-1698044f6050'>Success</option>
</select>Success

```json
{
  "group": {
    "_id": "NtR6RQ7NvzA9ejecX",
    "name": "testing",
    "t": "p",
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "tester"
    },
    "ts": "2016-12-09T16:53:06.761Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T16:53:06.761Z"
  },
  "success": true
}
```

Expand Allobject  groupobject  _idstring    
namestring    
tstring    
msgsinteger    
uobject  _idstring    
usernamestring    

tsstring    
roboolean    
sysMesboolean    
_updatedAtstring    

successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='c602f78a-0cd5-459a-b3c7-430768d62bca'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='f8b8eb98-4aa3-461a-b512-dcaa88864fad'>Example 1</option>
</select>Example 1

```json
{
  "success": false,
  "error": "Body param \"name\" is required"
}
```

object  successboolean    
errorstring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='ce28cbe0-9fc0-49df-a20d-caec875bb489'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='f70fb381-e90a-4b4f-8ed5-73dde08534a1'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/archive-a-group.md -->

---
title: "Archive a Group"
slug: "archive-a-group"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/archive-a-group"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Archive a Group

Post/api/v1/groups.archive

Archive a private channel. You need the `archive-room` permission.

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='67b50de9-1077-4040-94a8-57feef8a58ea'>application/json</option>
</select>object  roomIdstring    Required

The group ID that you want to archive. You can find the IDs by using any of the following endpoints:

- [Get List of User Groups](https://developer.rocket.chat/apidocs/get-list-of-user-groups): This endpoint returns all private channels in the workspace, if you have the required permissions to view them.
- [Get Groups](https://developer.rocket.chat/apidocs/get-groups): This endpoint returns the private channels that you are a member of.

ExampleByehQjC44FwMeiLbX

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='e756d9d8-19fd-47cf-a701-f4e0ea4b2c79'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='10da5a5e-e760-4603-9c5b-e9686166e3c2'>Success</option>
</select>Success

```json
{
  "success": true
}
```

object  successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='428ecdad-22db-42e6-97e1-0fed6ab152fd'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='26b5fb70-2759-487c-a80f-f34a8139f2bc'>No permission</option>
</select>No permission

```json
{
  "success": false,
  "error": "Not authorized [error-not-authorized]",
  "errorType": "error-not-authorized",
  "details": {
    "method": "archiveRoom"
  }
}
```

Expand Allobject  successboolean    
errorstring    
errorTypestring    
detailsobject  methodstring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='e1a2a8a8-a885-43d4-827b-9ad9fd953b7d'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='10a1fc96-545e-4c9b-9364-fa73ecc87095'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/delete-group.md -->

---
title: "Delete Group"
slug: "delete-group"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/delete-group"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Group

Post/api/v1/groups.delete

Delete a private room.

The following permissions are required:

- `delete-p`: To delete a private channel.
- `delete-team-group`: To delete a private channel that is part of a team.

### Changelog

| Version | Description |
| --- | --- |
| 0.71.0 | Removed `group` property |
| 0.49.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='096899a9-fa5a-4b00-a295-5ef6a70abd89'>application/json</option>
</select>object  roomIdstring    

Enter the room ID. This parameter is required if no `roomName` is provided. You can find the IDs by using any of the following endpoints:

- [Get List of User Groups](https://developer.rocket.chat/apidocs/get-list-of-user-groups): This endpoint returns all private channels in the workspace, if you have the required permissions to view them.
- [Get Groups](https://developer.rocket.chat/apidocs/get-groups): This endpoint returns the private channels that you are a member of.

ExampleByehQjC44FwMeiLbX
roomNamestring    

Enter the room name. This parameter is required if no `roomId` is provided.

Exampleprivate-abc

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='45517120-58f5-43b6-88cd-ca76c2b61955'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='12acfdef-6380-4120-8ff2-b8bd793816fe'>Success</option>
</select>Success

```json
{
  "success": true
}
```

object  successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='00b43873-55b6-4712-a076-de1ae74db513'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='44dffb73-4108-4d31-a967-15c7f95a480c'>No permission</option>
</select>No permission

```json
{
  "success": false,
  "error": "Not allowed [error-not-allowed]",
  "errorType": "error-not-allowed",
  "details": {
    "method": "eraseRoom"
  }
}
```

Expand Allobject  successboolean    
errorstring    
errorTypestring    
detailsobject  methodstring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='530b5daf-4d5d-40d8-b19d-bf4000762dd0'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='44bef515-2671-4d70-ad4f-98f1026c1c77'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/invite-users-to-group.md -->

---
title: "Invite Users to Group"
slug: "invite-users-to-group"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/invite-users-to-group"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Invite Users to Group

Post/api/v1/groups.invite

Invite one user or bulk users to a private channel. Any of the following permissions are required:

- `add-user-to-joined-room`: This permission is required if you want to add users to the channel that you have joined.
- `add-user-to-any-p-room`: This permission is required to add users to any private channel.

You can identify the group by `roomId` or `roomName`, and the user(s) by `userId`, `username`, `userIds`, or `usernames`.

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='79abc7c1-75f6-4046-a8ae-5194e79854c0'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='a220f264-4310-4aea-90f2-1a4ea758661f'>Invite by IDs</option>
<option value='cc964768-fed0-4925-bf77-91ff724d0669'>Invite by names</option>
<option value='4cbe9820-fb1c-4e40-b442-a49503be8ea5'>Invite multiple users by ID</option>
<option value='57204285-1631-49b4-9765-af9e15d23f57'>Invite multiple users by username</option>
</select>Invite by IDs

```json
{
  "roomId": "ByehQjC44FwMeiLbX",
  "userId": "nSYqWzZ4GsKTX4dyK"
}
```

Invite by names

```json
{
  "roomName": "private-abc",
  "username": "john.doe"
}
```

Invite multiple users by ID

```json
{
  "roomId": "ByehQjC44FwMeiLbX",
  "userIds": [
    "nSYqWzZ4GsKTX4dyK",
    "SYqWzZ4Gsasdfgh"
  ]
}
```

Invite multiple users by username

```json
{
  "roomName": "private-abc",
  "usernames": [
    "john.doe",
    "jane.doe"
  ]
}
```

object  roomIdstring    

The group ID. This parameter is required if no `roomName` is provided. You can find the IDs by using any of the following endpoints:

- [Get List of User Groups](https://developer.rocket.chat/apidocs/get-list-of-user-groups): This endpoint returns all private channels in the workspace, if you have the required permissions to view them.
- [Get Groups](https://developer.rocket.chat/apidocs/get-groups): This endpoint returns the private channels that you are a member of.

ExampleByehQjC44FwMeiLbX
roomNamestring    

The group name. This parameter is required if no `roomId` is provided.

Exampleprivate-abc
userIdstring    

The ID of the user to be invited. This parameter is required if no `username`, `userIds`, or `usernames` is provided.

ExamplenSYqWzZ4GsKTX4dyK
usernamestring    

The username of the user to be invited. This parameter is required if no `userId`, `userIds`, or `usernames` is provided.

Examplejohn.doe
userIds Array of string   

An array of user IDs to invite. This parameter is required if no `userId`, `username`, or `usernames` is provided.

Example[
  "nSYqWzZ4GsKTX4dyK",
  "SYqWzZ4Gsasdfgh"
]string    
usernames Array of string   

An array of usernames to invite. This parameter is required if no `userId`, `username`, or `userIds` is provided.

Example[
  "john.doe",
  "jane.doe"
]string    

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='a8d0333e-973f-4686-af99-289db7f21a52'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='9a1971da-080d-4220-9e87-33c23e7a5901'>Success</option>
</select>Success

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "ts": "2016-11-30T21:23:04.737Z",
    "t": "p",
    "name": "testing",
    "usernames": [
      "testing",
      "testing1"
    ],
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "msgs": 1,
    "_updatedAt": "2016-12-09T12:50:51.575Z",
    "lm": "2016-12-09T12:50:51.555Z"
  },
  "success": true
}
```

Expand Allobject  groupobject  _idstring    
tsstring    
tstring    
namestring    
usernames Array of string   string    
uobject  _idstring    
usernamestring    

msgsinteger    
_updatedAtstring    
lmstring    

successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='a3139f5a-5029-4690-a823-ef81d90a4a10'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='3669d12e-c1e4-485f-90cd-1197aefa6258'>Room parameter required</option>
<option value='51e462e3-c8c5-491b-854e-ed8bc984a129'>User parameter required</option>
<option value='d7c92a80-bb5b-44ab-be47-ba60c22dc63f'>Permission required</option>
</select>Room parameter required

```json
{
  "success": false,
  "error": "The parameter \"roomId\" or \"roomName\" is required [error-room-param-not-provided]",
  "errorType": "error-room-param-not-provided"
}
```

User parameter required

```json
{
  "success": false,
  "error": "Please provide \"userId\" or \"username\" or \"userIds\" or \"usernames\" as param [error-users-params-not-provided]",
  "errorType": "error-users-params-not-provided"
}
```

Permission required

```json
{
  "success": false,
  "error": "Not allowed [error-not-allowed]",
  "errorType": "error-not-allowed",
  "details": {
    "method": "addUsersToRoom"
  }
}
```

Expand Allobject  successboolean    
errorstring    
errorTypestring    
detailsobject  methodstring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='4c8340f2-c594-47cb-a3d6-d2169e833394'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='bf50907c-dd59-45b9-b226-4f9b16bfadce'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/remove-user-from-group.md -->

---
title: "Remove User from Group"
slug: "remove-user-from-group"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/remove-user-from-group"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove User from Group

Post/api/v1/groups.kick

Remove a user from the private group/channel. Permission required: `kick-user-from-any-p-room`

### Changelog

| Version | Description |
| --- | --- |
| 0.48.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Body parameters<select class='api-response-data' aria-label='Media type'><option value='5a377a4a-a13d-4681-9e81-3909f6582aac'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='ac12f10c-0b05-4260-adfa-27e3e1e61901'>Example</option>
</select>Example

```json
{
  "roomId": "ByehQjC44FwMeiLbX",
  "userId": "nSYqWzZ4GsKTX4dyK"
}
```

object  roomIdstring    Required

Enter the private room ID from which you want to remove the user.

ExampleByehQjC44FwMeiLbX
userIdstring    Required

Enter the user ID that you want to remove.

ExamplenSYqWzZ4GsKTX4dyK

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='d78d405a-deac-47b4-b3a4-56252e724e4a'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='0956edc9-b2f9-4c81-b5ad-77bbc3640db3'>Success</option>
</select>Success

```json
{
  "group": {
    "_id": "ByehQjC44FwMeiLbX",
    "name": "invite-me",
    "t": "p",
    "usernames": [
      "testing1"
    ],
    "msgs": 0,
    "u": {
      "_id": "aobEdbYhXfu5hkeqG",
      "username": "testing1"
    },
    "ts": "2016-12-09T15:08:58.042Z",
    "ro": false,
    "sysMes": true,
    "_updatedAt": "2016-12-09T15:22:40.656Z"
  },
  "success": true
}
```

Expand Allobject  groupobject  _idstring    
namestring    
tstring    
usernames Array of string   string    
msgsinteger    
uobject  _idstring    
usernamestring    

tsstring    
roboolean    
sysMesboolean    
_updatedAtstring    

successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='1cf31ae7-17e6-4b2d-840b-09dc78ce6a2e'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='c89fe3db-c842-4217-98b5-09fa1e138b5a'>No permission</option>
</select>No permission

```json
{
  "success": false,
  "error": "Not allowed [error-not-allowed]",
  "errorType": "error-not-allowed",
  "details": {
    "method": "removeUserFromRoom"
  }
}
```

Expand Allobject  successboolean    
errorstring    
errorTypestring    
detailsobject  methodstring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='dd4a654d-9926-4017-bd9e-a3d848703870'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='5a0c5f06-a081-4605-9e4c-6874347a2fdf'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

<!-- Source: https://developer.rocket.chat/apidocs/list-group-members.md -->

---
title: "List Group Members"
slug: "list-group-members"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/list-group-members"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# List Group Members

Get/api/v1/groups.members

Lists the members of a private group.

Permission required if the room is broadcast.: `view-broadcast-member-list`

### Changelog

| Version | Description |
| --- | --- |
| 0.59.0 | Added |

Header parametersX-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f
X-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ

Query parametersroomIdstring

The room ID. It is required if the `roomName` is not provided.

Exampledlpfuijw7ej
roomNamestring

The room name. It is required if the `roomId` is not provided.

Examplegeneral
sort

List of fields to order by, and in which direction. This is a JSON object, with properties listed in desired order, with values of 1 for ascending, or -1 for descending. For example, {"value": -1, "_id": 1}. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

countinteger

The number of items to return. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

Example50
offsetinteger

Number of items to "skip" in the query, i.e. requests return count items, skipping the first offset items. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#pagination) to learn more.

Example50
statusarray of string

The user's status (search filter).

Example["online", "away"]
filterstring

Extra search filters to be applied to the fields defined in the `Accounts_SearchFields` setting.

Responses200

OK

<select class='api-response-data' aria-label='Media type'><option value='a4111de3-9f18-46df-bc47-92a9fde91deb'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='d7613282-edcf-4e02-a9e1-683392858a08'>Success</option>
</select>Success

```json
{
  "members": [
    {
      "_id": "Q4GkX6RMepGDdQ7YJ",
      "status": "online",
      "name": "Marc Pow",
      "utcOffset": -3,
      "username": "marc.pow"
    },
    {
      "_id": "rocket.cat",
      "name": "Rocket.Cat",
      "username": "rocket.cat",
      "status": "online",
      "utcOffset": 0
    }
  ],
  "count": 2,
  "offset": 0,
  "total": 2,
  "success": true
}
```

Expand Allobject  members Array of object   object  _idstring    
statusstring    
namestring    
utcOffsetinteger    
usernamestring    

countinteger    
offsetinteger    
totalinteger    
successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='679a0427-68c2-43bb-9ed3-497cebb151f1'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='d0006e7e-fe8f-44b3-8c79-252a2d1b6781'>Example 1</option>
</select>Example 1

```json
{
  "success": false,
  "error": "The parameter \"roomId\" or \"roomName\" is required [error-room-param-not-provided]",
  "errorType": "error-room-param-not-provided"
}
```

object  successboolean    
errorstring    
errorTypestring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='8de6d82f-041f-4ff6-b28a-4178a8fdf68c'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='a1eb2c13-7572-41e7-a2a3-f0d6019d25e8'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

## Rooms

<!-- Source: https://developer.rocket.chat/apidocs/get-room-information.md -->

---
title: "Get Room Information"
slug: "get-room-information"
updated: 2026-07-07T08:12:18Z
published: 2026-07-07T08:12:18Z
canonical: "developer.rocket.chat/get-room-information"
stale: true
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Room Information

Get/api/v1/rooms.info

Retrieves the information about the room.

### Changelog

| Version | Description |
| --- | --- |
| 0.72.0 | Added |

Header parametersX-User-IdstringRequired

The `userId` of the authenticated user.

ExamplerbAXPnMktTFbNpwtJ
X-Auth-TokenstringRequired

The `authToken` of the authenticated user.

ExampleRScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f

Query parametersroomIdstring

The room ID. It is required if the `roomName` is not provided.

Exampledlpfuijw7ej
roomNamestring

The room name. It is required if the `roomId` is not provided.

Examplegeneral
fieldsstring

This parameter accepts a JSON object with properties that have a value of 1 or 0 to include or exclude them in the response. For example, to only retrieve the usernames of users: `fields={ &quot;username&quot;: 1 }`. Refer to the [official documentation](https://developer.rocket.chat/apidocs/query-parameters#query-and-fields) to learn more.

Responses200

OK

The response includes the following objects:

- `parent`: Represents the parent of a room. For discussions, this is the room where the discussion was created, identified by `prid`. For rooms inside a team, the parent will be the team's main room, identified by `team.roomId`. For other rooms, this property is undefined.
- `team`: Represents the team a room is part of. For rooms inside a team, this is the team identified by the `teamId` property. For everything else, this is undefined.

<select class='api-response-data' aria-label='Media type'><option value='7a7d1203-7dd6-4cb9-b1c7-dd0417e0e23d'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='a37a8b16-f6df-49fa-aa9c-8ed8610fc273'>Success</option>
</select>Success

```json
{
  "room": {
    "_id": "66ed2dba40141d95f32c292b",
    "fname": "new-channel",
    "_updatedAt": "2024-09-20T12:29:08.284Z",
    "customFields": {},
    "topic": "",
    "broadcast": false,
    "encrypted": false,
    "name": "new-channel",
    "t": "p",
    "msgs": 3,
    "usersCount": 2,
    "u": {
      "_id": "C38WSSzrGd2NCjzqJ",
      "username": "test.cat",
      "name": "test.cat"
    },
    "ts": "2024-09-20T08:09:30.417Z",
    "ro": false,
    "teamId": "66c82d78237405fc05fc1ef1",
    "default": false,
    "sysMes": true,
    "lastMessage": {
      "_id": "xZhJfE4rmaosjHZCe",
      "rid": "66ed2dba40141d95f32c292b",
      "msg": "testing",
      "alias": null,
      "ts": "2024-09-20T12:27:53.356Z",
      "u": {
        "_id": "C38WSSzrGd2NCjzqJ",
        "username": "test.cat",
        "name": "test.cat"
      },
      "_updatedAt": "2024-09-20T12:27:53.397Z",
      "urls": [],
      "mentions": [],
      "channels": [],
      "md": [
        {
          "type": "PARAGRAPH",
          "value": [
            {
              "type": "PLAIN_TEXT",
              "value": "testing"
            }
          ]
        }
      ]
    },
    "lm": "2024-09-20T12:27:53.356Z"
  },
  "team": {
    "_id": "66c82d78237405fc05fc1ef1",
    "name": "test-team",
    "type": 0,
    "roomId": "66c82d78237405fc05fc1eef"
  },
  "parent": {
    "_id": "66c82d78237405fc05fc1eef",
    "fname": "test-team",
    "name": "test-team",
    "t": "c"
  },
  "success": true
}
```

Expand Allobject  roomobject  _idstring    
tsstring    
tstring    
namestring    
usernames Array of object   object  
msgsinteger    
usersCountinteger    
_updatedAtstring    
uobject  _idstring    
usernamestring    
namestring    

defaultboolean    
lastMessageobject  _idstring    
tstring    
ridstring    
tsstring    
msgstring    
aliasstring   | null  
attachments Array of object   object  
fileobject  _idstring    
namestring    
typestring    

uobject  _idstring    
usernamestring    
namestring    

groupableboolean    
dridstring    
_updatedAtstring    

lmstring    

successboolean    

400

Bad Request

<select class='api-response-data' aria-label='Media type'><option value='318309ec-585d-409c-8384-3894f325b42b'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='55486914-890c-4696-a99c-23f07c65ed16'>Example 1</option>
</select>Example 1

```json
{
  "success": false,
  "error": "The parameter \"roomId\" or \"roomName\" is required [error-roomid-param-not-provided]",
  "errorType": "error-roomid-param-not-provided"
}
```

object  successboolean    
errorstring    
errorTypestring    

401

Unauthorized

<select class='api-response-data' aria-label='Media type'><option value='f6e693d7-d729-4348-b430-59d883a0ff16'>application/json</option>
</select><select class='select-example' aria-label='Media type'><option value='093315b7-c0ea-45ba-b837-e4de443388e5'>Authorization Error</option>
</select>Authorization Error

```json
{
  "status": "error",
  "message": "You must be logged in to do this."
}
```

object  statusstring    
messagestring


---

## Messages

<!-- Source: https://developer.rocket.chat/apidocs/send-message.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Send Message

> The difference between `chat.postMessage` and `chat.sendMessage` is that `chat.sendMessage` allows for passing a value for `_id` and the other one doesn't. Also, `chat.sendMessage` only sends it to one channel whereas the other one allows for sending to more than one channel at a time.<br />

**Note**: You can only send alias and avatar properties if your user has the `message-impersonate permission`. We implemented this rule to avoid users impersonating other users. By default, only the bot role has this permission, but that can be changed in **Manage** -> **Permissions** -> **message-impersonate**.

### Change Log
| Version | Description                         |
| ------- | ----------------------------------- |
| 6.8.0   | Allow custom fields in messages     |      
| 6.4.0   | Add `previewUrls` param             |
| 2.4.0   | Added validation on user's identity |
| 0.60.0  | Added                               |

## OpenAPI

````json POST /api/v1/chat.sendMessage
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Messaging"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "Chat"
    },
    {
      "name": "DM"
    },
    {
      "name": "Auto-Translate"
    }
  ],
  "paths": {
    "/api/v1/chat.sendMessage": {
      "post": {
        "tags": [
          "Chat"
        ],
        "summary": "Send Message",
        "description": "The difference between `chat.postMessage` and `chat.sendMessage` is that `chat.sendMessage` allows for passing a value for `_id` and the other one doesn't. Also, `chat.sendMessage` only sends it to one channel whereas the other one allows for sending to more than one channel at a time.<br />\n\n**Note**: You can only send alias and avatar properties if your user has the `message-impersonate permission`. We implemented this rule to avoid users impersonating other users. By default, only the bot role has this permission, but that can be changed in **Manage** -> **Permissions** -> **message-impersonate**.\n\n### Change Log\n| Version | Description                         |\n| ------- | ----------------------------------- |\n| 6.8.0   | Allow custom fields in messages     |      \n| 6.4.0   | Add `previewUrls` param             |\n| 2.4.0   | Added validation on user's identity |\n| 0.60.0  | Added                               |",
        "operationId": "post-api-v1-chat.sendMessage",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          }
        ],
        "requestBody": {
          "description": "**Some important things to note about the `previewUrls` parameter include:**\n* If the `previewUrls` array is empty, no URL will be previewed.\n* If the `previewUrls` parameter isn't sent, all URLs (up to a maximum of five external URLs) will be previewed.\n* If the message contains attachments or quotes, no URL is previewed.\n* Internal URLs are not considered in the `previewUrls` array.\n* A maximum of five external URLs is previewed  per message. If there are more than 5 external URLs, no URL is previewed.\n> URLs that include the same text as the <a href='https://docs.rocket.chat/docs/general' target='_blank'>**Site URL**</a> are referred to as Internal URLs.",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "message"
                ],
                "properties": {
                  "message": {
                    "type": "object",
                    "properties": {
                      "t": {
                        "type": "string",
                        "description": "The message type e.g. e2e"
                      },
                      "rid": {
                        "type": "string",
                        "description": "The room ID where the message is to be sent."
                      },
                      "msg": {
                        "type": "string",
                        "description": "The message text to send, it is optional because of attachments."
                      },
                      "alias": {
                        "type": "string",
                        "description": "This will cause the message's name to appear as the given alias, but your username will still be displayed. Requires the `impersonate-other-user` permission"
                      },
                      "emoji": {
                        "type": "string",
                        "description": "If provided, the avatar will be displayed as the emoji. "
                      },
                      "avatar": {
                        "type": "string",
                        "description": "If provided, the avatar will be displayed as the provided image url. Requires the  `impersonate-other-user` permission."
                      },
                      "attachments": {
                        "type": "array",
                        "description": "The attachment is an array of objects with any of the following properties. One attachment can have many sections, including:\n* General\n* Author Information\n* Title Information\n* Image\n* Audio\n* Video\n* Table/Fields",
                        "items": {
                          "type": "object",
                          "properties": {
                            "audio_url": {
                              "type": "string",
                              "description": "Audio file to attach. See <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio' target='_blank'>HTML audio element</a> for information."
                            },
                            "author_icon": {
                              "type": "string",
                              "description": "Displays a tiny icon to the left of the author's name."
                            },
                            "author_link": {
                              "type": "string",
                              "description": "Providing this makes the author name clickable and points to this link."
                            },
                            "author_name": {
                              "type": "string",
                              "description": "Name of the author."
                            },
                            "collapsed": {
                              "type": "boolean",
                              "description": "Causes the image, audio, and video sections to be displayed as collapsed when set to true."
                            },
                            "color": {
                              "type": "string",
                              "description": "See <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/background-color' target='_blank'>background-css</a> for the supported format."
                            },
                            "fields": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "short": {
                                    "type": "boolean",
                                    "description": "Whether this field should be a short field."
                                  },
                                  "title": {
                                    "type": "string",
                                    "description": "The title of this field."
                                  },
                                  "value": {
                                    "type": "string",
                                    "description": "The value of this field, displayed underneath the title value."
                                  }
                                },
                                "required": [
                                  "title",
                                  "value"
                                ]
                              }
                            },
                            "image_url": {
                              "type": "string",
                              "description": "The image to display, will be big and easy to see."
                            },
                            "message_link": {
                              "type": "string",
                              "description": "Only applicable if the `ts` parameter is provided, as it makes the time clickable to this link."
                            },
                            "text": {
                              "type": "string",
                              "description": "The text to display for this attachment, it is different than the message's text."
                            },
                            "thumb_url": {
                              "type": "string",
                              "description": "An image that displays to the left of the text, looks better when this is relatively small."
                            },
                            "title": {
                              "type": "string",
                              "description": "Title to display for this attachment, displays under the author."
                            },
                            "title_link": {
                              "type": "string",
                              "description": "Providing this makes the title clickable, pointing to this link."
                            },
                            "title_link_download": {
                              "type": "boolean",
                              "description": "When this is true, a download icon appears and clicking this saves the link to file."
                            },
                            "ts": {
                              "type": "string",
                              "description": "Displays the time next to the text portion."
                            },
                            "video_url": {
                              "type": "string",
                              "description": "Video file to attach. See the <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video' target='blank'>HTML video element</a> for information."
                            }
                          }
                        }
                      },
                      "tmid": {
                        "type": "string",
                        "description": "The message ID to create a thread."
                      },
                      "tshow": {
                        "type": "string",
                        "description": "Used when replying in a thread. Message will be sent in channel also if value is true"
                      },
                      "blocks": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string"
                            },
                            "text": {
                              "type": "string"
                            }
                          }
                        },
                        "description": "A message block is an array of objects with any of the following properties. To view the example on how to use this parameter, select **Show example** in this body parameters section. Above the example code block, select the drop-down menu, and select the **Message with Blocks** option. For comprehensive information on blocks, refer to the <a href='https://developer.rocket.chat/docs/blocks' target='_blank'>Apps-Engine UI Blocks documentation</a>.\nBlocks can have many sections:\n- type\n- text\n- fields"
                      },
                      "customFields": {
                        "type": "object",
                        "description": "You can add custom fields for messages. For example, set priorities for messages.\n\nYou must enable this option and define the validation in the workspace settings. See the <a href='https://docs.rocket.chat/use-rocket.chat/workspace-administration/settings/message' target='_blank'>Message</a> settings for further information.",
                        "example": {
                          "priority": "high"
                        }
                      }
                    },
                    "required": [
                      "rid"
                    ]
                  },
                  "previewUrls": {
                    "type": "array",
                    "description": "An array to define which URL previews should be retrieved from each message.",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "examples": {
                "Message with Attachments": {
                  "value": {
                    "message": {
                      "rid": "Xnb2kLD2Pnhdwe3RH",
                      "msg": "Sample message",
                      "alias": "Gruggy",
                      "emoji": ":smirk:",
                      "avatar": "http://res.guggy.com/logo_128.png",
                      "attachments": [
                        {
                          "color": "#ff0000",
                          "text": "Yay for gruggy!",
                          "ts": "2016-12-09T16:53:06.761Z",
                          "thumb_url": "http://res.guggy.com/logo_128.png",
                          "message_link": "https://google.com",
                          "collapsed": "false",
                          "author_name": "Bradley Hilton",
                          "author_link": "https://rocket.chat/",
                          "author_icon": "https://avatars.githubusercontent.com/u/850391?v=3",
                          "title": "Attachment Example",
                          "title_link": "https://youtube.com",
                          "title_link_download": "true",
                          "image_url": "http://res.guggy.com/logo_128.png",
                          "audio_url": "http://www.w3schools.com/tags/horse.mp3",
                          "video_url": "http://www.w3schools.com/tags/movie.mp4",
                          "fields": [
                            {
                              "short": "true",
                              "title": "Test",
                              "value": "Testing out something or other"
                            },
                            {
                              "short": "true",
                              "title": "Another Test",
                              "value": "[Link](https://google.com/) something and this and that."
                            }
                          ]
                        }
                      ]
                    }
                  }
                },
                "Message with Blocks": {
                  "value": {
                    "message": {
                      "rid": "GENERAL",
                      "blocks": [
                        {
                          "type": "section",
                          "text": {
                            "type": "mrkdwn",
                            "text": "*Text example* Normal message `code` here"
                          }
                        },
                        {
                          "type": "divider"
                        },
                        {
                          "type": "section",
                          "fields": [
                            {
                              "type": "mrkdwn",
                              "text": "*Field 1*"
                            },
                            {
                              "type": "mrkdwn",
                              "text": "Field 2"
                            }
                          ]
                        }
                      ]
                    }
                  }
                },
                "Message with PreviewURLs": {
                  "value": {
                    "message": {
                      "rid": "64f0f82c2c26843a68c1f7ba",
                      "msg": "This is a list of links! https://google.com https://hola.org/ https://www.usepayday.com/ https://www.getbumpa.com/ https://www.atlassian.com/software/jira http://localhost:3000/"
                    },
                    "previewUrls": [
                      "https://google.com",
                      "http://localhost:3000/",
                      "https://hola.org/",
                      "https://www.usepayday.com/",
                      "https://www.getbumpa.com/",
                      "https://www.atlassian.com/software/jira"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "object",
                      "properties": {
                        "rid": {
                          "type": "string"
                        },
                        "msg": {
                          "type": "string"
                        },
                        "ts": {
                          "type": "string"
                        },
                        "u": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "username": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        },
                        "unread": {
                          "type": "boolean"
                        },
                        "mentions": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          }
                        },
                        "channels": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          }
                        },
                        "_updatedAt": {
                          "type": "string"
                        },
                        "_id": {
                          "type": "string"
                        }
                      }
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Example 1": {
                    "value": {
                      "message": {
                        "rid": "GENERAL",
                        "msg": "123456789",
                        "ts": "2018-03-01T18:02:26.825Z",
                        "u": {
                          "_id": "i5FdM4ssFgAcQP62k",
                          "username": "rocket.cat",
                          "name": "test"
                        },
                        "unread": "true",
                        "mentions": [],
                        "channels": [],
                        "_updatedAt": "2018-03-01T18:02:26.828Z",
                        "_id": "LnCSJxxNkCy6K9X8X"
                      },
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    },
                    "errorType": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "Example 1": {
                    "value": {
                      "success": "false",
                      "error": "The \"message\" parameter must be provided. [error-invalid-params]",
                      "errorType": "error-invalid-params"
                    }
                  },
                  "Example 2": {
                    "value": {
                      "success": "false",
                      "error": "The 'rid' property on the message object is missing."
                    }
                  },
                  "Example 3": {
                    "value": {
                      "success": "false",
                      "error": "error-invalid-room"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The `authToken` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The `userId` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      }
    },
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

<!-- Source: https://developer.rocket.chat/apidocs/update-message.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Message

> Update a specific message.

### Changelog
| Version      | Description | 
| ---------------- | ------------|
| 6.12.0           | Fixed `customFields` not updating if `text` was unchanged |
| 6.4.0            | Add previewUrls param       |        
| 0.49.0           | Added       |

## OpenAPI

````json POST /api/v1/chat.update
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Messaging"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "Chat"
    },
    {
      "name": "DM"
    },
    {
      "name": "Auto-Translate"
    }
  ],
  "paths": {
    "/api/v1/chat.update": {
      "post": {
        "tags": [
          "Chat"
        ],
        "summary": "Update Message",
        "description": "Update a specific message.\n\n### Changelog\n| Version      | Description | \n| ---------------- | ------------|\n| 6.12.0           | Fixed `customFields` not updating if `text` was unchanged |\n| 6.4.0            | Add previewUrls param       |        \n| 0.49.0           | Added       |",
        "operationId": "post-api-v1-chat.update",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "roomId": {
                    "type": "string",
                    "description": "The room ID where the message is."
                  },
                  "msgId": {
                    "type": "string",
                    "description": "The message ID to update."
                  },
                  "text": {
                    "type": "string",
                    "description": "Updated text for the message."
                  },
                  "previewUrls": {
                    "type": "array",
                    "description": "An array to define which URL previews should be retrieved from each message.",
                    "items": {
                      "type": "string"
                    }
                  },
                  "customFields": {
                    "type": "object",
                    "description": "You can add custom fields for messages. For example, set priorities for messages.\n\nYou must enable this option and define the validation in the workspace settings. See the <a href='https://docs.rocket.chat/use-rocket.chat/workspace-administration/settings/message' target='_blank'>Message</a> settings for further information.",
                    "example": {
                      "priority": "high"
                    }
                  }
                },
                "required": [
                  "roomId",
                  "msgId",
                  "text"
                ]
              },
              "examples": {
                "Example": {
                  "value": {
                    "roomId": "64f0f82c2c26843a68c1f7ba",
                    "msgId": "vzGBzSwy6jJQDwtZe",
                    "text": "Updated list of links! https://google.com https://hola.org/ https://www.usepayday.com/ https://www.getbumpa.com/ https://www.atlassian.com/software/jira http://localhost:3000/",
                    "previewUrls": [
                      "https://google.com",
                      "http://localhost:3000/"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "rid": {
                          "type": "string"
                        },
                        "msg": {
                          "type": "string"
                        },
                        "ts": {
                          "type": "string"
                        },
                        "u": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "username": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        },
                        "_updatedAt": {
                          "type": "string"
                        },
                        "urls": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "url": {
                                "type": "string"
                              },
                              "meta": {
                                "type": "object"
                              },
                              "ignoreParse": {
                                "type": "boolean"
                              }
                            }
                          }
                        },
                        "mentions": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          }
                        },
                        "channels": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          }
                        },
                        "md": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "type": {
                                "type": "string"
                              },
                              "value": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "editedAt": {
                          "type": "string"
                        },
                        "editedBy": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "username": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Example": {
                    "value": {
                      "message": {
                        "_id": "vzGBzSwy6jJQDwtZe",
                        "rid": "64f0f82c2c26843a68c1f7ba",
                        "msg": "Updated list of links! https://google.com https://hola.org/ https://www.usepayday.com/ https://www.getbumpa.com/ https://www.atlassian.com/software/jira http://localhost:3000/",
                        "ts": "2023-09-20T17:27:59.945Z",
                        "u": {
                          "_id": "rbAXPnMktTFbNpwtJ",
                          "username": "roxie",
                          "name": "test test"
                        },
                        "_updatedAt": "2023-09-20T22:22:45.793Z",
                        "urls": [
                          {
                            "url": "https://google.com",
                            "meta": {}
                          },
                          {
                            "url": "https://hola.org/",
                            "meta": {},
                            "ignoreParse": "true"
                          },
                          {
                            "url": "https://www.atlassian.com/software/jira",
                            "meta": {},
                            "ignoreParse": "true"
                          },
                          {
                            "url": "http://localhost:3000/",
                            "meta": {}
                          }
                        ],
                        "mentions": [],
                        "channels": [],
                        "md": [
                          {
                            "type": "PARAGRAPH",
                            "value": [
                              {
                                "type": "PLAIN_TEXT",
                                "value": "Updated list of links! "
                              },
                              {
                                "type": "LINK",
                                "value": {
                                  "src": {
                                    "type": "PLAIN_TEXT",
                                    "value": "https://google.com"
                                  },
                                  "label": [
                                    {
                                      "type": "PLAIN_TEXT",
                                      "value": "https://google.com"
                                    }
                                  ]
                                }
                              },
                              {
                                "type": "PLAIN_TEXT",
                                "value": " "
                              },
                              {
                                "type": "LINK",
                                "value": {
                                  "src": {
                                    "type": "PLAIN_TEXT",
                                    "value": "https://hola.org/"
                                  },
                                  "label": [
                                    {
                                      "type": "PLAIN_TEXT",
                                      "value": "https://hola.org/"
                                    }
                                  ]
                                }
                              },
                              {
                                "type": "PLAIN_TEXT",
                                "value": " "
                              },
                              {
                                "type": "LINK",
                                "value": {
                                  "src": {
                                    "type": "PLAIN_TEXT",
                                    "value": "https://www.atlassian.com/software/jira"
                                  },
                                  "label": [
                                    {
                                      "type": "PLAIN_TEXT",
                                      "value": "https://www.atlassian.com/software/jira"
                                    }
                                  ]
                                }
                              },
                              {
                                "type": "PLAIN_TEXT",
                                "value": " "
                              },
                              {
                                "type": "LINK",
                                "value": {
                                  "src": {
                                    "type": "PLAIN_TEXT",
                                    "value": "http://localhost:3000/"
                                  },
                                  "label": [
                                    {
                                      "type": "PLAIN_TEXT",
                                      "value": "http://localhost:3000/"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        ],
                        "editedAt": "2023-09-20T22:22:45.737Z",
                        "editedBy": {
                          "_id": "rbAXPnMktTFbNpwtJ",
                          "username": "roxie"
                        }
                      },
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    },
                    "errorType": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "Example 1": {
                    "value": {
                      "success": "false",
                      "error": "The required \"messageId\" param is missing. [error-messageid-param-not-provided]",
                      "errorType": "error-messageid-param-not-provided"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The `authToken` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The `userId` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      }
    },
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

<!-- Source: https://developer.rocket.chat/apidocs/delete-chat-message.md -->

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete Chat Message

> Delete a chat message. Users can delete messages only in the following cases:
  * The **Allow Message Deleting** setting is enabled in the workspace's **Message** settings.
  * If the **Block Message Deleting After (n) Minutes** message setting has a non-zero value, the `bypass-time-limit-edit-and-delete` permission is required to delete messages after the defined time limit.
  * In read-only rooms, the `post-readonly` permission is required to delete messages, or the user must be unmuted.
  * The `delete-own-message` permission is required to delete users' own messages.
  * The `delete-message` permission is required for users to delete messages from other users.

You can delete a message by its `roomId` and `msgId`, or delete a message by its `fileId` to remove the message that holds an uploaded file.

### Changelog
| Version      | Description |
| ---------------- | ------------|
| 8.6.0            | Added `fileId` to delete a message by the file it contains. |
| 0.48.0           | Added       |


## OpenAPI

````json POST /api/v1/chat.delete
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Messaging"
  },
  "servers": [
    {
      "url": "https://apiexplorer.support.rocket.chat"
    }
  ],
  "tags": [
    {
      "name": "Chat"
    },
    {
      "name": "DM"
    },
    {
      "name": "Auto-Translate"
    }
  ],
  "paths": {
    "/api/v1/chat.delete": {
      "post": {
        "tags": [
          "Chat"
        ],
        "summary": "Delete Chat Message",
        "description": "Delete a chat message. Users can delete messages only in the following cases:\n  * The **Allow Message Deleting** setting is enabled in the workspace's **Message** settings.\n  * If the **Block Message Deleting After (n) Minutes** message setting has a non-zero value, the `bypass-time-limit-edit-and-delete` permission is required to delete messages after the defined time limit.\n  * In read-only rooms, the `post-readonly` permission is required to delete messages, or the user must be unmuted.\n  * The `delete-own-message` permission is required to delete users' own messages.\n  * The `delete-message` permission is required for users to delete messages from other users.\n\nYou can delete a message by its `roomId` and `msgId`, or delete a message by its `fileId` to remove the message that holds an uploaded file.\n\n### Changelog\n| Version      | Description |\n| ---------------- | ------------|\n| 8.6.0            | Added `fileId` to delete a message by the file it contains. |\n| 0.48.0           | Added       |\n",
        "operationId": "post-api-v1-chat.delete",
        "parameters": [
          {
            "$ref": "#/components/parameters/Auth-Token"
          },
          {
            "$ref": "#/components/parameters/UserId"
          }
        ],
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Provide either `roomId` and `msgId` together, or `fileId` on its own.",
                "properties": {
                  "roomId": {
                    "type": "string",
                    "description": "The room ID. Required when deleting by `msgId`."
                  },
                  "msgId": {
                    "type": "string",
                    "description": "The ID of the message to delete. Required together with `roomId`."
                  },
                  "fileId": {
                    "type": "string",
                    "description": "The ID of the uploaded file whose message you want to delete. Use this instead of `roomId` and `msgId` to delete the message that contains the file."
                  },
                  "asUser": {
                    "type": "boolean",
                    "description": "Should the message be deleted as the user who sent it? It is `false` by default."
                  }
                }
              },
              "examples": {
                "Delete by message": {
                  "value": {
                    "roomId": "ByehQjC44FwMeiLbX",
                    "msgId": "7aDSXtjMA3KPLxLjt",
                    "asUser": "false"
                  }
                },
                "Delete by file": {
                  "value": {
                    "fileId": "9aFcj4XmgQ7eYpLbT"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    },
                    "ts": {
                      "type": "string"
                    },
                    "message": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "rid": {
                          "type": "string"
                        },
                        "u": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "username": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    },
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "examples": {
                  "Example": {
                    "value": {
                      "_id": "jEnjsxuoDJamGjbH2",
                      "ts": "1696533809813",
                      "message": {
                        "_id": "jEnjsxuoDJamGjbH2",
                        "rid": "6GFJ3tbmHiyHbahmC",
                        "u": {
                          "_id": "5fRTXMt7DMJbpPJfh",
                          "username": "test.test",
                          "name": "Testtest"
                        }
                      },
                      "success": "true"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "Invalid Message ID": {
                    "value": {
                      "success": "false",
                      "error": "No message found with the id of \\\"MvHcX2WKSrmdArmktz\\\"."
                    }
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/authorizationError"
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "Auth-Token": {
        "name": "X-Auth-Token",
        "in": "header",
        "description": "The `authToken` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "RScctEHSmLGZGywfIhWyRpyofhKOiMoUIpimhvheU3f"
      },
      "UserId": {
        "name": "X-User-Id",
        "in": "header",
        "description": "The `userId` of the authenticated user.",
        "required": "true",
        "schema": {
          "type": "string"
        },
        "example": "rbAXPnMktTFbNpwtJ"
      }
    },
    "responses": {
      "authorizationError": {
        "description": "Unauthorized",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "examples": {
              "Authorization Error": {
                "value": {
                  "status": "error",
                  "message": "You must be logged in to do this."
                }
              }
            }
          }
        }
      }
    }
  }
}
````



---

## Schemas

<!-- Source: https://developer.rocket.chat/apidocs/user-schema.md -->

---
title: "User"
slug: "user-schema"
updated: 2025-09-01T12:18:23Z
published: 2025-09-01T12:18:23Z
canonical: "developer.rocket.chat/user-schema"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# User

The **IUser** interface represents the **User** object, which defines the properties and their types that can be associated with a user. User information is stored in the `users` collection on MongoDB.

## Properties

The `User` object has the following fields and data types:

| Parameter | Data type | Description |
| --- | --- | --- |
| `_id` | String | The unique identifier for the user. |
| `createdAt` | Date | The date and time when the user was created. |
| `roles` | Array of strings | An array of role IDs associated with the user. For example, `user`, `admin`, `livechat-agent` |
| `type` | String | The type of user. For example, `user`, `app`, or `bot` |
| `active` | Boolean | Indicates whether the user is active or not. |
| `username` | String | The username of the user. |
| `nickname` | String | The user’s nickname. |
| `name` | String | The user’s name. |
| `services` | Object | Additional services associated with the user. |
| `emails` | Array of objects | An array of email objects associated with the user. |
| `status` | String | The user’s status. |
| `statusConnection` | String | The status connection of the user. |
| `lastLogin` | Date | The date and time of the user's last login. |
| `bio` | String | The user’s biography or description. |
| `avatarOrigin` | String | The origin of the user's avatar. |
| `avatarETag` | String | The ETag of the user's avatar. |
| `avatarUrl` | String | The URL of the user's avatar. |
| `utcOffset` | Number | The UTC offset of the user's timezone. |
| `language` | String | The user’s language preference. |
| `statusDefault` | String | The default status of the user. |
| `statusText` | String | The custom status text of the user. |
| `oauth` | Object | OAuth information associated with the user. |
| `_updatedAt` | Date | The date and time when the user object was last updated. |
| `e2e` | Object | End-to-end encryption information associated with the user. |
| `requirePasswordChange` | Boolean | Indicates whether the user needs to change their password. |
| `customFields` | Object | Additional custom fields associated with the user. |
| `settings` | Object | User-specific settings. |
| `defaultRoom` | String | The ID of the user's default room. |
| `ldap` | Boolean | Indicates whether the user is an LDAP user. |
| `extension` | String | The extension associated with the user. |
| `inviteToken` | String | The token for inviting the user. |
| `canViewAllInfo` | Boolean | Indicates whether the user can view all information. |
| `phone` | String | The phone number associated with the user. |
| `reason` | String | The reason associated with the user, if they are reported. |
| `federated` | Boolean | Indicates whether the user is a federated user. |
| `federation` | Object | Federation information associated with the user. |
| `banners` | Object | Banner information associated with the user. |
| `importIds` | Array of strings | An array of import IDs associated with the user. |

Refer to the main interface associated with the user object:

**Main Interface**

The main interface of a `User` object.

```typescript
interface IUser {
	_id: string;
	createdAt: Date;
	roles: IRole['_id'][];
	type: string;
	active: boolean;
	username?: string;
	nickname?: string;
	name?: string;
	services?: IUserServices;
	emails?: IUserEmail[];
	status?: UserStatus;
	statusConnection?: string;
	lastLogin?: Date;
	bio?: string;
	avatarOrigin?: string;
	avatarETag?: string;
	avatarUrl?: string;
	utcOffset?: number;
	language?: string;
	statusDefault?: UserStatus;
	statusText?: string;
	oauth?: {
		authorizedClients: string[];
	};
	_updatedAt: Date;
	e2e?: {
		private_key: string;
		public_key: string;
	};
	requirePasswordChange?: boolean;
	customFields?: {
		[key: string]: any;
	};
	settings?: IUserSettings;
	defaultRoom?: string;
	ldap?: boolean;
	extension?: string;
	inviteToken?: string;
	canViewAllInfo?: boolean;
	phone?: string;
	reason?: string;
	federated?: boolean;
	federation?: {
		avatarUrl?: string;
		searchedServerNames?: string[];
	};
	banners?: {
		[key: string]: {
			id: string;
			priority: number;
			title: string;
			text: string;
			textArguments?: string[];
			modifiers: ('large' | 'danger')[];
			link: string;
			read?: boolean;
		};
	};
	importIds?: string[];
}
```

For more information and details on the Interface and sub-interfaces, see the code here

[Rocket.Chat/IUser.ts at develop · RocketChat/Rocket.Chat](https://github.com/RocketChat/Rocket.Chat/blob/develop/packages/core-typings/src/IUser.ts)

## User object example

**Example object**

```json
{
    "_id": "gzvcvpov9G4TxbGFS",
    "createdAt": {
        "$date": "2023-03-02T17:59:43.415Z"
    },
    "services": {
        "password": {
            "bcrypt": "$2b$10$u..."
        },
        "email2fa": {
            "enabled": true,
            "changedAt": {
                "$date": "2023-03-02T17:59:43.415Z"
            }
        },
        "resume": {
            "loginTokens": []
        }
    },
    "username": "demouser",
    "emails": [
        {
            "address": "demo@email.com",
            "verified": true
        }
    ],
    "type": "user",
    "status": "offline",
    "active": true,
    "_updatedAt": {
        "$date": "2023-03-02T18:47:15.205Z"
    },
    "__rooms": [
        "GENERAL"
    ],
    "roles": [
        "user"
    ],
    "name": "demouser",
    "requirePasswordChange": false,
    "settings": {},
    "lastLogin": {
        "$date": "2023-03-02T18:14:28.122Z"
    },
    "statusConnection": "offline",
    "e2e": {
        "private_key": "{\"$binary\":\"m4E7yE/...==\"}",
        "public_key": "{\"alg\":\"RSA-OAEP-256\",\"e\":\"AQAB\",\"ext\":true,\"key_ops\":[\"encrypt\"],\"kty\":\"RSA\",\"n\":\"0pbPAF67...w\"}"
    },
    "utcOffset": 1
}
```


---

<!-- Source: https://developer.rocket.chat/apidocs/room-schema.md -->

---
title: "Room"
slug: "room-schema"
updated: 2025-09-02T13:26:58Z
published: 2025-09-02T13:26:58Z
canonical: "developer.rocket.chat/room-schema"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Room

A room in Rocket.Chat is where conversations take place. The room object represents the details of rooms created in a workspace.

There are at least two fields on the room object.

- `_id`: The room/user ID (depends on the room type).
- `t`: The room type. See the table below for details.

## Properties

The `Room` object has the following fields:

| Field | Data type | Description |
| --- | --- | --- |
| `_id` | String | The room ID. |
| `t` | String | The room type. E.g `c` = channel, `d` = direct message, `l` = livechat, `p`=private chat |
| `name` | String | The room’s name. |
| `fname` | String | The full name of the room. |
| `msgs` | Number | The number of messages in the room. |
| `default` | Boolean | Indicates if the room is the default room. |
| `broadcast` | Boolean | Indicates if the room is a broadcast room. |
| `featured` | Boolean | Indicates if the room is featured. |
| `announcement` | String | The announcement or summary of the room. |
| `joinCodeRequired` | Boolean | Indicates if a join code is required to enter the room. |
| `announcementDetails` | String | Additional details about the room announcement, such as the style. |
| `encrypted` | Boolean | Indicates if the room is encrypted. |
| `topic` | String | The topic of the room. |
| `reactWhenReadOnly` | Boolean | Indicates if reactions are allowed when the room is read-only. |
| `sysMes` | MessageTypesValues[] \| Boolean | Indicates whether system messages are enabled or an array of allowed system message types. |
| `u` | String | Information about the user who created the room (`_id`: string, `username`: string, `name`: string). |
| `uids` | Array of string | Array of user IDs in the room. |
| `lastMessage` | Object | The last message sent in the room. |
| `lm` | Date | Timestamp of the last message. |
| `usersCount` | Number | The number of users in the room. |
| `callStatus` | CallStatus | The status of a call in the room. |
| `webRtcCallStartTime` | Date | The start time of a WebRTC call in the room. |
| `servedBy` | String | Information about the user who served the room (`_id`: string). |
| `streamingOptions` | String | Options for streaming content in the room (`id`?: string, `type`?: string, `url`?: string, `thumbnail`?: string, `isAudioOnly`?: boolean, `message`?: string). |
| `prid` | String | The primary room ID (for threads). |
| `avatarETag` | String | The ETag for the room avatar. |
| `teamMain` | Boolean | Indicates if the room is the main room for a team. |
| `teamId` | String | The ID of the team the room belongs to. |
| `teamDefault` | Boolean | Indicates if the room is the default room for the team. |
| `open` | Boolean | Indicates if the room is open. |
| `autoTranslateLanguage` | String | The language used for automatic translation in the room. |
| `autoTranslate` | Boolean | Indicates if automatic translation is enabled for the room. |
| `unread` | Number | The number of unread messages in the room. |
| `alert` | Boolean | Indicates if there is an alert in the room. |
| `hideUnreadStatus` | Boolean | Indicates if the unread status is hidden. |
| `hideMentionStatus` | Boolean | Indicates if the mention status is hidden. |
| `muted` | Array of string | An array of user IDs who are muted in the room. |
| `unmuted` | Array of string | An array of user IDs who are not muted in the room. |
| `usernames` | Array of string | An array of usernames in the room. |
| `ts` | Date | Timestamp of when the room was created. |
| `cl` | Boolean | Indicates if the room is a channel. |
| `ro` | Boolean | Indicates if the room is read-only. |
| `favorite` | Boolean | Indicates if the room is marked as a favorite. |
| `archived` | Boolean | Indicates if the room is archived. |
| `description` | String | Description or summary of the room. |
| `createdOTR` | Boolean | Indicates if the room was created as an OTR (off-the-record) room. |
| `e2eKeyId` | String | Key ID for end-to-end encryption in the room. |
| `federated` | Boolean | (Deprecated) Indicates if the room is federated. |
| `customFields` | Object | (Deprecated) Custom fields for additional room information. |
| `channel` | { _id: string } | Information about the channel the room belongs to. |

## Room types

- `d`: Direct messages
- `c`: Public channel
- `p`: Private channel
- `discussions`: Team or channel discussions
- `teams`: Workspace teams
- `l`: Livechat
- `v`: Omnichannel VoIP rooms

The information that comes with the room object changes according to its type.

Direct chatPublic chat roomPrivate chat room

A DM room object contains two fields:

- `_id`: The room ID.
- `t`: The room type (in this case, the value is `d`)

For example:

```json
{
    "_id": "room-id",
    "t": "d"
}
```

A public chat room contains information about the room, as follows:

- `_id`: The room ID.
- `t`: The room type (in this case, the value is `c`).
- `name`: The room name.
- `u`: The room creator (it may return a null user).
- `topic`: (Optional) The room topic.
- `muted`: (Optional) A collection of muted users by their username.
- `jitsiTimeout`: (Optional) If the Jitsi app is used in your workspace, this parameter may be present.

For example:

```json
{
    "_id": "room-id",
    "t": "c",
    "name": "room-name",
    "u": { "_id": "user-id", "username": "username" },
    "topic": "room-topic",
    "muted": [ "username" ],
    "jitsiTimeout": { "$date": 1480377601 }
}
```

This type of room resembles a public chat room:

- `_id`: The room ID.
- `t`: The room type (in this case, the value is `p`).
- `name`: The room name.
- `u`: The room creator (it may return a null user).
- `topic`: (Optional) The room topic.
- `muted`: (Optional) A collection of muted users by their username.
- `jitsiTimeout`: (Optional) If the Jitsi app is used in your workspace, this parameter may be present.
- `ro`: Flags if the room is read-only.

For example:

```json
{
    "_id": "room-id",
    "t": "p",
    "name": "room-name",
    "u": { "_id": null, "username": null },
    "topic": "room-topic",
    "ro": false // This room is not read-only
}
```

The **IRoom** interface represents the **Room** object, defining the properties and their types that can be associated with a Room. Room information is stored in the `rocketchat_room `collection on MongoDB.

See the IRoom interface here.

[Rocket.Chat/IRoom.ts at develop · RocketChat/Rocket.Chat](https://github.com/RocketChat/Rocket.Chat/blob/develop/packages/core-typings/src/IRoom.ts)

## Room object example

**Example object**


---

<!-- Source: https://developer.rocket.chat/apidocs/message-schema.md -->

---
title: "Message"
slug: "message-schema"
updated: 2025-09-03T04:28:55Z
published: 2025-09-03T04:28:55Z
canonical: "developer.rocket.chat/message-schema"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://developer.rocket.chat/llms.txt
> Use this file to discover all available pages before exploring further.

# Message

The message object is the heart of a conversation. It encapsulates all the information needed in order to represent a single entry on a message list.

## Properties

The message object contains the following fields:

| Parameter | Data type | Description |
| --- | --- | --- |
| `_id` | String | The unique identifier for the message. |
| `rid` | String | The unique ID for the room. This will identify the room that the message belongs to. Example: '`GENERAL`' |
| `msg` | String | The content of the message. |
| `tmid` | String | The ID of the thread to which the message belongs. |
| `tshow` | Boolean | Indicates whether the thread should be shown. |
| `ts` | Date | A timestamp of when the message was created. (The date of creation on client) |
| `mentions` | Array of objects | An array of user mentions within the message. Identifies (`type`:"type of the mention; either user or tea", `_id`: ID of the user that is mentioned, `username`: username of the user that is mentioned", `name`: name of the user that is mentioned). |
| `groupable` | Boolean | Boolean that states whether or not this message should be grouped together with other messages from the same user. |
| `channels` | Array of objects | An array of channels to which the message belongs. |
| `u` | Object | The user who sent the message (either the _id or username or name). |
| `blocks` | MessageSurfaceLayout (enum) | If it is a UIkit message, then the UIkit blocks components. |
| `alias` | String | An alias for the message sender. |
| `md` | Array of object | The message's content in a markdown format. |
| `_hidden` | Boolean | Indicates whether the message is hidden. |
| `imported` | Boolean | Indicates whether the message is imported. |
| `replies` | Array of strings | An array of user IDs representing the message replies. |
| `location` | Object | The geographic location associated with the message. |
| `starred` | Array of objects | A list of users that have the message starred (list of user IDs` (_id) |
| `pinned` | Boolean | Indicates whether the message is pinned. |
| `pinnedAt` | Date | The date and time when the message was pinned. |
| `pinnedBy` | Object | Information about the user who pinned the message. |
| `unread` | Boolean | Indicates whether the message is unread. |
| `temp` | Boolean | Indicates whether the message is temporary. |
| `drid` | String | The direct room ID (if belongs to a direct room). |
| `tlm` | Date | The date and time when the last thread message was sent. |
| `dcount` | Number | The count of messages deleted in the thread. |
| `tcount` | Number | The count of messages in the thread. |
| `t` | MessageTypesValues (enum) | The [message type](/v1/docs/message#message-type). |
| `e2e` | `pending` or `done` (enum) | The end-to-end encryption status of the message. |
| `otrAck` | String | The acknowledgment status of an off-the-record message. |
| `urls` | Array of objects | An array of URLs contained within the message. |
| `actionLinks` | Array of objects (deprecated) | An array of action links associated with the message. |
| `file` | FileProp (deprecated) | The file property associated with the message. |
| `fileUpload` | Object | Information about a file upload associated with the message. |
| `files` | Array of FileProp objects | An array of file properties associated with the message. |
| `attachments` | Array of MessageAttachment objects | An array of [attachment objects](/apidocs/post-message), available only when the message has at least one attachment. |
| `reactions` | Object | Object containing reaction information associated with the message. |
| `private` | Boolean | Indicates whether the message is private. |
| `bot` | Boolean (deprecated) | Indicates whether the message is sent by a bot. |
| `sentByEmail` | Boolean | Indicates whether the message was sent by email. |
| `webRtcCallEndTs` | Date | The date and time when a WebRTC call ended. |
| `role` | String | The role associated with the message. |
| `avatar` | String | A url to an image, that is accessible to anyone, to display as the avatar instead of the message user's account avatar |
| `emoji` | String | The emoji associated with the user who sent the message. |
| `tokens` | Array of Token objects | An array of tokens extracted from the message content. |
| `html` | String | The HTML representation of the message. |
| `token` | String (deprecated) | A deprecated field used for messages sent by visitors. |
| `federation` | Object | Information about federation associated with the message. |
| `slaData` | Object (used for specific message types) | Additional data related to SLA (Service Level Agreements) change history messages. |
| `priorityData` | Object (used for specific message types) | Additional data related to priority change history messages. |

> - The user presented on `u` and `editedBy` fields are a simplified version of the user information: (`_id`: The user id, `username`: The username, *name*: The name)
> - The URL metadata contains several informational fields: (`url`: The URL itself (just as it appears on the message), `meta`: URL metadata (varies accord to the URL), `headers`: Some HTTP headers (varies accord to the URL), `parsedUrl`: The parsed URL broken into its parts)

## Message type

Some of the message types are listed below. A full list of the message-type property can be found here:

[Rocket.Chat/MessageTypes.ts at 957c69d7ebdcf4dca02e7753bfd75086be11ca44 · RocketChat/Rocket.Chat](https://github.com/RocketChat/Rocket.Chat/blob/957c69d7ebdcf4dca02e7753bfd75086be11ca44/apps/meteor/app/lib/lib/MessageTypes.ts#L315)

| Type | Description |
| --- | --- |
| `r` | Room name changed. |
| `au` | User added by. |
| `ru` | User removed by. |
| `ul` | User left. |
| `ult` | User left team. |
| `uj` | User joined channel. |
| `ujt` | User joined team. |
| `ut` | User joined conversation. |
| `rm` | Message removed. |
| `added-user-to-team` | Added user to team. |
| `removed-user-from-team` | Removed user from team. |
| `user-muted` | User muted by. |

### Attachment object

[The attachment object is fully described here](/apidocs/post-message)

```json
{
    "messages": [
        {
            "_id": "message-id",
            "rid": "room-id",
            "msg": "Hello World!",
            "ts": { "$date": 1480377601 },
            "u": {
                "_id": "user-id",
                "username": "username"
            },
            "_updatedAt": { "$date": 1480377601 }
        },
        {
            "_id": "message-id",
            "rid": "room-id",
            "msg": "Hello!",
            "ts": { "$date": 1480377601 },
            "u": {
                "_id": "user-id",
                "username": "username"
            },
            "_updatedAt": { "$date":1480377601 },
            "editedAt": { "$date": 1480377601 },
            "editedBy": {
                "_id": "user-id",
                "username": "username"
            }
        }
    ]
}
```

## Message object example

Messages are stored in the `rocketchat_message` collection on MongoDB.

The `IMessage` interface represents the structure of a message object in the Rocket.Chat It defines the properties and their types that can be associated with a message sent. You can check the `IMessage `interface here.

[Rocket.Chat/IMessage.ts at develop · RocketChat/Rocket.Chat](https://github.com/RocketChat/Rocket.Chat/blob/develop/packages/core-typings/src/IMessage/IMessage.ts)

**Example object**

```json
{
  "_id": "8gMsLe9ApZjo2D2iB",
  "rid": "EhpNtqqrMXT4QWk3z",
  "msg": "This meesage is from Rocket.Chat.",
  "ts": {
    "$date": "2023-02-09T13:35:59.484Z"
  },
  "u": {
    "_id": "rYhzFRd2QZjNwAAXX",
    "username": "rodriq",
    "name": "Rodriq"
  },
  "_updatedAt": {
    "$date": "2023-02-09T13:40:47.334Z"
  },
  "urls": [],
  "mentions": [],
  "channels": [],
  "md": [
    {
      "type": "PARAGRAPH",
      "value": [
        {
          "type": "PLAIN_TEXT",
          "value": "This meesage is from "
        },
        {
          "type": "LINK",
          "value": {
            "src": {
              "type": "PLAIN_TEXT",
              "value": "//Rocket.Chat."
            },
            "label": {
              "type": "PLAIN_TEXT",
              "value": "Rocket.Chat."
            }
          }
        }
      ]
    }
  ],
  "editedAt": {
    "$date": "2023-02-09T13:40:47.303Z"
  },
  "editedBy": {
    "_id": "rYhzFRd2QZjNwAAXX",
    "username": "rodriq"
  }
}
```


---
