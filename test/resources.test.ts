import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { channelDescription } from '../nodes/Rocketchat/resources/channel';
import { groupDescription } from '../nodes/Rocketchat/resources/group';
import { messageDescription } from '../nodes/Rocketchat/resources/message';
import { roomDescription } from '../nodes/Rocketchat/resources/room';
import { userDescription } from '../nodes/Rocketchat/resources/user';
import type { INodeProperties } from 'n8n-workflow';

const resources: Record<string, INodeProperties[]> = {
	message: messageDescription,
	channel: channelDescription,
	group: groupDescription,
	room: roomDescription,
	user: userDescription,
};

describe('Resource descriptions', () => {
	it('every resource starts with an operation selector', () => {
		for (const [resource, descriptions] of Object.entries(resources)) {
			const operation = descriptions[0];
			assert.equal(operation.name, 'operation', `${resource}: first property should be operation`);
			assert.equal(operation.type, 'options');
			assert.ok(operation.displayOptions?.show?.resource?.includes(resource));
		}
	});

	it('every operation defines a request method and URL', () => {
		for (const [resource, descriptions] of Object.entries(resources)) {
			const operation = descriptions[0];
			const options = operation.options ?? [];
			for (const option of options) {
				assert.match(option.routing?.request?.method as string, /^(GET|POST)$/, `${resource}/${option.value}`);
				const url = option.routing?.request?.url as string;
				if (url.startsWith('={{')) {
					assert.ok(url.includes('/api/v1/'), `${resource}/${option.value}`);
				} else {
					assert.match(url, /^\/api\/v1\//, `${resource}/${option.value}`);
				}
			}
		}
	});

	it('body operations send JSON objects', () => {
		for (const [resource, descriptions] of Object.entries(resources)) {
			const operation = descriptions[0];
			for (const option of operation.options ?? []) {
				if (option.routing?.send?.type === 'body') {
					assert.match(option.routing.send.value as string, /^=\{\{/, `${resource}/${option.value}`);
				}
			}
		}
	});

	it('query operations send query objects', () => {
		for (const [resource, descriptions] of Object.entries(resources)) {
			const operation = descriptions[0];
			for (const option of operation.options ?? []) {
				if (option.routing?.send?.type === 'query') {
					assert.match(option.routing.send.value as string, /^=\{\{/, `${resource}/${option.value}`);
				}
			}
		}
	});

	it('field properties have displayName, name, type, and default', () => {
		for (const descriptions of Object.values(resources)) {
			for (const prop of descriptions.slice(1)) {
				assert.ok(prop.displayName);
				assert.ok(prop.name);
				assert.ok(prop.type);
				assert.ok(prop.default !== undefined);
			}
		}
	});
});

describe('Message resource', () => {
	it('has send, update, and delete operations', () => {
		const values = messageDescription[0].options?.map((o) => (o as { value: string }).value);
		assert.deepStrictEqual(values, ['send', 'update', 'delete']);
	});

	it('send maps to chat.sendMessage', () => {
		const send = messageDescription[0].options?.find((o) => o.value === 'send');
		assert.equal(send?.routing?.request?.url, '/api/v1/chat.sendMessage');
	});
});

describe('Channel and Group resources', () => {
	it('have create, archive, and delete operations', () => {
		const channelValues = channelDescription[0].options?.map((o) => o.value);
		const groupValues = groupDescription[0].options?.map((o) => o.value);
		assert.deepStrictEqual(channelValues, ['create', 'archive', 'delete']);
		assert.deepStrictEqual(groupValues, ['create', 'archive', 'delete']);
	});

	it('use channel and group specific endpoints', () => {
		const channelCreate = channelDescription[0].options?.find((o) => o.value === 'create');
		const groupCreate = groupDescription[0].options?.find((o) => o.value === 'create');
		assert.equal(channelCreate?.routing?.request?.url, '/api/v1/channels.create');
		assert.equal(groupCreate?.routing?.request?.url, '/api/v1/groups.create');
	});
});

describe('Room resource', () => {
	it('has getInfo and getMembers operations', () => {
		const values = roomDescription[0].options?.map((o) => o.value);
		assert.deepStrictEqual(values, ['getInfo', 'getMembers']);
	});

	it('routes getMembers through channel or group endpoint based on roomType', () => {
		const getMembers = roomDescription[0].options?.find((o) => o.value === 'getMembers');
		assert.ok(getMembers?.routing?.request?.url?.includes('roomType'));
	});
});

describe('User resource', () => {
	it('has list, get, invite, and kick operations', () => {
		const values = userDescription[0].options?.map((o) => o.value);
		assert.deepStrictEqual(values, ['list', 'get', 'invite', 'kick']);
	});

	it('list operation requires no additional fields', () => {
		const list = userDescription[0].options?.find((o) => o.value === 'list');
		assert.equal(list?.routing?.request?.url, '/api/v1/users.list');
	});
});
