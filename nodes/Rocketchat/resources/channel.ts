import type { INodeProperties } from 'n8n-workflow';

import { nameField, roomIdField } from '../shared/descriptions';

const showOnlyForChannels = {
	resource: ['channel'],
};

export const channelDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForChannels,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a channel',
				description: 'Create a public channel',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/channels.create',
					},
					send: {
						type: 'body',
						value:
							'={{ { name: $parameter.name, members: $parameter.members ? $parameter.members.split(",").map((m) => m.trim()).filter(Boolean) : [] } }}',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a channel',
				description: 'Archive a public channel',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/channels.archive',
					},
					send: {
						type: 'body',
						value: '={{ { roomId: $parameter.roomId } }}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a channel',
				description: 'Delete a public channel',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/channels.delete',
					},
					send: {
						type: 'body',
						value: '={{ { roomId: $parameter.roomId } }}',
					},
				},
			},
		],
		default: 'create',
	},
	{
		...nameField,
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Members',
		name: 'members',
		type: 'string',
		default: '',
		description: 'Comma-separated usernames to add as members',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['create'],
			},
		},
	},
	{
		...roomIdField,
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['archive', 'delete'],
			},
		},
	},
];
