import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Rocketchat } from '../nodes/Rocketchat/Rocketchat.node';
import { channelDescription } from '../nodes/Rocketchat/resources/channel';
import { groupDescription } from '../nodes/Rocketchat/resources/group';
import { messageDescription } from '../nodes/Rocketchat/resources/message';
import { roomDescription } from '../nodes/Rocketchat/resources/room';
import { userDescription } from '../nodes/Rocketchat/resources/user';

describe('Rocketchat node description', () => {
	const node = new Rocketchat();
	const description = node.description;

	it('has required metadata', () => {
		assert.equal(description.name, 'rocketchat');
		assert.equal(description.displayName, 'Rocket.Chat');
		assert.equal(description.version, 1);
		assert.equal(description.usableAsTool, true);
	});

	it('points to existing SVG icon files relative to the node file', () => {
		const icon = description.icon as { light: string; dark: string };
		assert.match(icon.light, /^file:\.\.\/\.\.\/icons\/[\w.-]+\.svg$/);
		assert.match(icon.dark, /^file:\.\.\/\.\.\/icons\/[\w.-]+\.svg$/);
	});

	it('registers both credentials gated by authentication value', () => {
		const names = description.credentials?.map((c) => c.name) ?? [];
		assert.ok(names.includes('rocketchatApi'));
		assert.ok(names.includes('rocketchatOAuth2Api'));

		const tokenCred = description.credentials?.find((c) => c.name === 'rocketchatApi');
		const oauthCred = description.credentials?.find((c) => c.name === 'rocketchatOAuth2Api');
		assert.ok(tokenCred?.displayOptions?.show?.authentication?.includes('accessToken'));
		assert.ok(oauthCred?.displayOptions?.show?.authentication?.includes('oAuth2'));
	});

	it('sets baseURL from credentials', () => {
		assert.equal(description.requestDefaults?.baseURL, '={{$credentials.baseUrl}}');
	});

	it('includes all five resources in the resource selector', () => {
		const resource = description.properties.find((p) => p.name === 'resource');
		const values = resource?.options?.map((o) => (o as { value: string }).value) ?? [];
		assert.deepStrictEqual(values, ['channel', 'group', 'message', 'room', 'user']);
	});

	it('wires all resource descriptions into the node properties', () => {
		const resourceNames = description.properties.map((p) => p.name);
		const importedCount =
			messageDescription.length +
			channelDescription.length +
			groupDescription.length +
			roomDescription.length +
			userDescription.length;
		assert.ok(resourceNames.length >= 2 + importedCount);
	});
});
