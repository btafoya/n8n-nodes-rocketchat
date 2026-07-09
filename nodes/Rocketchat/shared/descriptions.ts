import type { INodeProperties } from 'n8n-workflow';

export const roomIdField: INodeProperties = {
	displayName: 'Room ID',
	name: 'roomId',
	type: 'string',
	default: '',
	required: true,
	description: 'ID of the Rocket.Chat room',
};

export const userIdField: INodeProperties = {
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	default: '',
	required: true,
	description: 'Rocket.Chat user ID',
};

export const nameField: INodeProperties = {
	displayName: 'Name',
	name: 'name',
	type: 'string',
	default: '',
	required: true,
	description: 'Name of the channel or group',
};

export const textField: INodeProperties = {
	displayName: 'Text',
	name: 'text',
	type: 'string',
	typeOptions: { rows: 4 },
	default: '',
	required: true,
	description: 'Message text',
};

export const messageIdField: INodeProperties = {
	displayName: 'Message ID',
	name: 'messageId',
	type: 'string',
	default: '',
	required: true,
	description: 'ID of the message',
};

export const roomTypeField: INodeProperties = {
	displayName: 'Room Type',
	name: 'roomType',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Channel', value: 'channel' },
		{ name: 'Group', value: 'group' },
	],
	default: 'channel',
	description: 'Whether the room is a public channel or a private group',
};
