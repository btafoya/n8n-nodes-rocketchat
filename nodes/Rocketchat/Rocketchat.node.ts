import { NodeConnectionTypes } from 'n8n-workflow';
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { channelDescription } from './resources/channel';
import { groupDescription } from './resources/group';
import { messageDescription } from './resources/message';
import { roomDescription } from './resources/room';
import { userDescription } from './resources/user';

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
}
