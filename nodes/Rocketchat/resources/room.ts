import type { INodeProperties } from 'n8n-workflow';

import { roomIdField, roomTypeField } from '../shared/descriptions';

const showOnlyForRooms = {
	resource: ['room'],
};

export const roomDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRooms,
		},
		options: [
			{
				name: 'Get Info',
				value: 'getInfo',
				action: 'Get room information',
				description: 'Retrieve information about a room',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/rooms.info',
					},
					send: {
						type: 'query',
						value: '={{ { roomId: $parameter.roomId } }}',
					},
				},
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				action: 'Get room members',
				description: 'List members of a channel or group',
				routing: {
					request: {
						method: 'GET',
						url: '={{ $parameter.roomType === "channel" ? "/api/v1/channels.members" : "/api/v1/groups.members" }}',
					},
					send: {
						type: 'query',
						value: '={{ { roomId: $parameter.roomId } }}',
					},
				},
			},
		],
		default: 'getInfo',
	},
	{
		...roomIdField,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getInfo', 'getMembers'],
			},
		},
	},
	{
		...roomTypeField,
		displayOptions: {
			show: {
				resource: ['room'],
				operation: ['getMembers'],
			},
		},
	},
];
