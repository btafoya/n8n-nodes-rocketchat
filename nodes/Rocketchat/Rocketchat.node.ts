import { NodeConnectionTypes } from 'n8n-workflow';
import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { channelDescription } from './resources/channel';
import { groupDescription } from './resources/group';
import { messageDescription } from './resources/message';
import { roomDescription } from './resources/room';
import { userDescription } from './resources/user';

function buildMessageRequest(
	exec: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
): IHttpRequestOptions {
	const roomId = exec.getNodeParameter('roomId', i) as string;

	if (operation === 'send') {
		const text = exec.getNodeParameter('text', i) as string;
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/chat.sendMessage',
			headers: { 'Content-Type': 'application/json' },
			body: { message: { rid: roomId, msg: text } },
		};
	}

	if (operation === 'update') {
		const messageId = exec.getNodeParameter('messageId', i) as string;
		const text = exec.getNodeParameter('text', i) as string;
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/chat.update',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId, msgId: messageId, text },
		};
	}

	if (operation === 'delete') {
		const messageId = exec.getNodeParameter('messageId', i) as string;
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/chat.delete',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId, msgId: messageId },
		};
	}

	throw new Error(`Unsupported message operation: ${operation}`);
}

function buildChannelRequest(
	exec: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
): IHttpRequestOptions {
	if (operation === 'create') {
		const name = exec.getNodeParameter('name', i) as string;
		const members = exec.getNodeParameter('members', i, '') as string;
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/channels.create',
			headers: { 'Content-Type': 'application/json' },
			body: {
				name,
				members: members ? members.split(',').map((m) => m.trim()).filter(Boolean) : [],
			},
		};
	}

	const roomId = exec.getNodeParameter('roomId', i) as string;

	if (operation === 'archive') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/channels.archive',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId },
		};
	}

	if (operation === 'delete') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/channels.delete',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId },
		};
	}

	throw new Error(`Unsupported channel operation: ${operation}`);
}

function buildGroupRequest(
	exec: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
): IHttpRequestOptions {
	if (operation === 'create') {
		const name = exec.getNodeParameter('name', i) as string;
		const members = exec.getNodeParameter('members', i, '') as string;
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/groups.create',
			headers: { 'Content-Type': 'application/json' },
			body: {
				name,
				members: members ? members.split(',').map((m) => m.trim()).filter(Boolean) : [],
			},
		};
	}

	const roomId = exec.getNodeParameter('roomId', i) as string;

	if (operation === 'archive') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/groups.archive',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId },
		};
	}

	if (operation === 'delete') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: '/api/v1/groups.delete',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId },
		};
	}

	throw new Error(`Unsupported group operation: ${operation}`);
}

function buildRoomRequest(
	exec: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
): IHttpRequestOptions {
	const roomId = exec.getNodeParameter('roomId', i) as string;

	if (operation === 'getInfo') {
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: '/api/v1/rooms.info',
			qs: { roomId },
		};
	}

	if (operation === 'getMembers') {
		const roomType = exec.getNodeParameter('roomType', i) as string;
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: roomType === 'channel' ? '/api/v1/channels.members' : '/api/v1/groups.members',
			qs: { roomId },
		};
	}

	throw new Error(`Unsupported room operation: ${operation}`);
}

function buildUserRequest(
	exec: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
): IHttpRequestOptions {
	if (operation === 'list') {
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: '/api/v1/users.list',
		};
	}

	if (operation === 'get') {
		const userId = exec.getNodeParameter('userId', i) as string;
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: '/api/v1/users.info',
			qs: { userId },
		};
	}

	const roomId = exec.getNodeParameter('roomId', i) as string;
	const userId = exec.getNodeParameter('userId', i) as string;
	const roomType = exec.getNodeParameter('roomType', i) as string;

	if (operation === 'invite') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: roomType === 'channel' ? '/api/v1/channels.invite' : '/api/v1/groups.invite',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId, userId },
		};
	}

	if (operation === 'kick') {
		return {
			method: 'POST',
			baseURL: baseUrl,
			url: roomType === 'channel' ? '/api/v1/channels.kick' : '/api/v1/groups.kick',
			headers: { 'Content-Type': 'application/json' },
			body: { roomId, userId },
		};
	}

	throw new Error(`Unsupported user operation: ${operation}`);
}

export class Rocketchat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Rocket.Chat',
		name: 'rocketchat',
		icon: {
			light: 'file:../../icons/rocketchat.svg',
			dark: 'file:../../icons/rocketchat.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Rocket.Chat REST API',
		defaults: {
			name: 'Rocket.Chat',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'rocketchatApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
			{
				name: 'rocketchatOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: ['oAuth2'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
					{
						name: 'Personal Access Token',
						value: 'accessToken',
					},
				],
				default: 'accessToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Channel', value: 'channel' },
					{ name: 'Group', value: 'group' },
					{ name: 'Message', value: 'message' },
					{ name: 'Room', value: 'room' },
					{ name: 'User', value: 'user' },
				],
				default: 'channel',
			},
			...messageDescription,
			...channelDescription,
			...groupDescription,
			...roomDescription,
			...userDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;
			const auth = this.getNodeParameter('authentication', i, 'accessToken') as string;
			const credentialType = auth === 'oAuth2' ? 'rocketchatOAuth2Api' : 'rocketchatApi';
			const credentials = (await this.getCredentials(credentialType, i)) as { baseUrl: string };

			let options: IHttpRequestOptions;

			if (resource === 'message') {
				options = buildMessageRequest(this, operation, i, credentials.baseUrl);
			} else if (resource === 'channel') {
				options = buildChannelRequest(this, operation, i, credentials.baseUrl);
			} else if (resource === 'group') {
				options = buildGroupRequest(this, operation, i, credentials.baseUrl);
			} else if (resource === 'room') {
				options = buildRoomRequest(this, operation, i, credentials.baseUrl);
			} else if (resource === 'user') {
				options = buildUserRequest(this, operation, i, credentials.baseUrl);
			} else {
				throw new Error(`Unsupported resource: ${resource}`);
			}

			const response = await this.helpers.httpRequestWithAuthentication(credentialType, options);
			returnData.push({ json: response as object });
		}

		return [returnData];
	}
}
