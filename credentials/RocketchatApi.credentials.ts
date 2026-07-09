import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class RocketchatApi implements ICredentialType {
	name = 'rocketchatApi';

	displayName = 'Rocket.Chat API';

	icon: Icon = {
		light: 'file:../icons/rocketchat.svg',
		dark: 'file:../icons/rocketchat.dark.svg',
	};

	documentationUrl = 'https://developer.rocket.chat/apidocs#rocketchat-rest-api/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://chat.example.com',
			required: true,
			description: 'URL of the Rocket.Chat server, without a trailing slash',
		},
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: 'Rocket.Chat user ID for the personal access token owner',
		},
		{
			displayName: 'Auth Token',
			name: 'authToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Rocket.Chat personal access token',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Auth-Token': '={{$credentials?.authToken}}',
				'X-User-Id': '={{$credentials?.userId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/api/v1/me',
			method: 'GET',
		},
	};
}
