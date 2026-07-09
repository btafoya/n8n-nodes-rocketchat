import type { INodeProperties } from 'n8n-workflow';

import { roomIdField, roomTypeField, userIdField } from '../shared/descriptions';

const showOnlyForUsers = {
	resource: ['user'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUsers,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List users',
				description: 'List users on the server',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/users.list',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user',
				description: 'Get information about a user',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/users.info',
					},
					send: {
						type: 'query',
						value: '={{ { userId: $parameter.userId } }}',
					},
				},
			},
			{
				name: 'Invite To Room',
				value: 'invite',
				action: 'Invite a user to a room',
				description: 'Invite a user to a channel or group',
				routing: {
					request: {
						method: 'POST',
						url: '={{ $parameter.roomType === "channel" ? "/api/v1/channels.invite" : "/api/v1/groups.invite" }}',
					},
					send: {
						type: 'body',
						value: '={{ { roomId: $parameter.roomId, userId: $parameter.userId } }}',
					},
				},
			},
			{
				name: 'Kick From Room',
				value: 'kick',
				action: 'Kick a user from a room',
				description: 'Remove a user from a channel or group',
				routing: {
					request: {
						method: 'POST',
						url: '={{ $parameter.roomType === "channel" ? "/api/v1/channels.kick" : "/api/v1/groups.kick" }}',
					},
					send: {
						type: 'body',
						value: '={{ { roomId: $parameter.roomId, userId: $parameter.userId } }}',
					},
				},
			},
		],
		default: 'list',
	},
	{
		...userIdField,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'invite', 'kick'],
			},
		},
	},
	{
		...roomIdField,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['invite', 'kick'],
			},
		},
	},
	{
		...roomTypeField,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['invite', 'kick'],
			},
		},
	},
];
