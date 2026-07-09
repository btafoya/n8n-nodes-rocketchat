import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class RocketchatOAuth2Api implements ICredentialType {
	name = 'rocketchatOAuth2Api';

	displayName = 'Rocket.Chat OAuth2 API';

	extends = ['oAuth2Api'];

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
			description: 'Rocket.Chat user ID used for the X-User-Id header',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: '={{$credentials.baseUrl}}/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '={{$credentials.baseUrl}}/oauth/token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'users:read rooms:read chat:write',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Auth-Token': '={{$credentials.oauthTokenData.access_token}}',
				'X-User-Id': '={{$credentials.userId}}',
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
