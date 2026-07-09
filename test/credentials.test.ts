import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { RocketchatApi } from '../credentials/RocketchatApi.credentials';
import { RocketchatOAuth2Api } from '../credentials/RocketchatOAuth2Api.credentials';

describe('RocketchatApi credential', () => {
	const credential = new RocketchatApi();

	it('has required metadata', () => {
		assert.equal(credential.name, 'rocketchatApi');
		assert.equal(credential.displayName, 'Rocket.Chat API');
		assert.match(credential.documentationUrl, /developer\.rocket\.chat/);
	});

	it('defines baseUrl, userId, and authToken properties', () => {
		const names = credential.properties.map((p) => p.name);
		assert.ok(names.includes('baseUrl'));
		assert.ok(names.includes('userId'));
		assert.ok(names.includes('authToken'));
	});

	it('marks authToken as a password field', () => {
		const authToken = credential.properties.find((p) => p.name === 'authToken');
		assert.deepStrictEqual(authToken?.typeOptions, { password: true });
	});

	it('injects X-Auth-Token and X-User-Id headers', () => {
		const headers = credential.authenticate.properties.headers as Record<string, string>;
		assert.equal(headers['X-Auth-Token'], '={{$credentials?.authToken}}');
		assert.equal(headers['X-User-Id'], '={{$credentials?.userId}}');
	});

	it('tests credentials against /api/v1/me', () => {
		assert.equal(credential.test.request.method, 'GET');
		assert.equal(credential.test.request.url, '/api/v1/me');
		assert.equal(credential.test.request.baseURL, '={{$credentials?.baseUrl}}');
	});

	it('references existing SVG icon files', () => {
		const icon = credential.icon as { light: string; dark: string };
		assert.match(icon.light, /^file:\.\.\/icons\//);
		assert.match(icon.dark, /^file:\.\.\/icons\//);
	});
});

describe('RocketchatOAuth2Api credential', () => {
	const credential = new RocketchatOAuth2Api();

	it('extends oAuth2Api', () => {
		assert.ok(credential.extends?.includes('oAuth2Api'));
	});

	it('has required metadata', () => {
		assert.equal(credential.name, 'rocketchatOAuth2Api');
		assert.equal(credential.displayName, 'Rocket.Chat OAuth2 API');
	});

	it('exposes baseUrl, userId, and OAuth2 flow properties', () => {
		const names = credential.properties.map((p) => p.name);
		assert.ok(names.includes('baseUrl'));
		assert.ok(names.includes('userId'));
		assert.ok(names.includes('grantType'));
		assert.ok(names.includes('authUrl'));
		assert.ok(names.includes('accessTokenUrl'));
		assert.ok(names.includes('scope'));
		assert.ok(names.includes('authentication'));
	});

	it('uses authorization code grant and body authentication', () => {
		const grantType = credential.properties.find((p) => p.name === 'grantType');
		const authentication = credential.properties.find((p) => p.name === 'authentication');
		assert.equal(grantType?.default, 'authorizationCode');
		assert.equal(authentication?.default, 'body');
	});

	it('maps OAuth2 access token and user ID to Rocket.Chat headers', () => {
		const headers = credential.authenticate.properties.headers as Record<string, string>;
		assert.equal(headers['X-Auth-Token'], '={{$credentials.oauthTokenData.access_token}}');
		assert.equal(headers['X-User-Id'], '={{$credentials.userId}}');
	});

	it('tests credentials against /api/v1/me', () => {
		assert.equal(credential.test.request.method, 'GET');
		assert.equal(credential.test.request.url, '/api/v1/me');
	});
});
