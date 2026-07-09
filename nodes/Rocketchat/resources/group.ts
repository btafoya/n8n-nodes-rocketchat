import type { INodeProperties } from 'n8n-workflow';

import { nameField, roomIdField } from '../shared/descriptions';

const showOnlyForGroups = {
	resource: ['group'],
};

export const groupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForGroups,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a group',
				description: 'Create a private group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/groups.create',
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
				action: 'Archive a group',
				description: 'Archive a private group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/groups.archive',
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
				action: 'Delete a group',
				description: 'Delete a private group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/groups.delete',
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
				resource: ['group'],
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
				resource: ['group'],
				operation: ['create'],
			},
		},
	},
	{
		...roomIdField,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['archive', 'delete'],
			},
		},
	},
];
