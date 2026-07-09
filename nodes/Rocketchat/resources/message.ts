import type { INodeProperties } from 'n8n-workflow';

import { messageIdField, roomIdField, textField } from '../shared/descriptions';

const showOnlyForMessages = {
	resource: ['message'],
};

export const messageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForMessages,
		},
		options: [
			{
				name: 'Send',
				value: 'send',
				action: 'Send a chat message',
				description: 'Send a message to a room',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/chat.sendMessage',
					},
					send: {
						type: 'body',
						value: '={{ { message: { rid: $parameter.roomId, msg: $parameter.text } } }}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a chat message',
				description: 'Update an existing message',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/chat.update',
					},
					send: {
						type: 'body',
						value:
							'={{ { roomId: $parameter.roomId, msgId: $parameter.messageId, text: $parameter.text } } }}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a chat message',
				description: 'Delete a message by ID',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/chat.delete',
					},
					send: {
						type: 'body',
						value: '={{ { roomId: $parameter.roomId, msgId: $parameter.messageId } }}',
					},
				},
			},
		],
		default: 'send',
	},
	{
		...roomIdField,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'update', 'delete'],
			},
		},
	},
	{
		...messageIdField,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['update', 'delete'],
			},
		},
	},
	{
		...textField,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send', 'update'],
			},
		},
	},
];
