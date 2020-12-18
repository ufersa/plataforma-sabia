const { test, trait } = use('Test/Suite')('Chat');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');
const { antl, errors, errorPayload } = require('../../app/Utils');
const { chatMessagesTypes, chatStatusesTypes } = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const ChatMessage = use('App/Models/ChatMessage');

test('GET /chat create or fetch the tecnologyOrderChat', async ({ client }) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const queryString = {
		object_id: 1,
		object_type: 'technology-order',
		target_user: seller.id,
	};

	const response = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		participants: JSON.stringify([mySelf.id, seller.id]),
		object_id: 1,
		object_type: 'technology-order',
		status: chatStatusesTypes.ACTIVE,
	});
});

test('GET /chat return stored previosly messages', async ({ client, assert }) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const queryString = {
		object_id: 1,
		object_type: 'technology-order',
		target_user: seller.id,
	};

	const firstResponse = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	await ChatMessage.create({
		type: chatMessagesTypes.TEXT,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		from_user_id: mySelf.id,
		chat_id: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(`/chat/${firstResponse.body.id}/messages`)
		.loginVia(mySelf, 'jwt')
		.end();

	assert.equal(secondResponse.body[0].type, 'text');
	assert.equal(secondResponse.body[0].from_user_id, mySelf.id);
	assert.equal(secondResponse.body[0].content.text, 'Bom dia, está disponível?');

	secondResponse.assertStatus(200);
});

test('GET /chat returns an error when the object type sent is not allowed', async ({ client }) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const queryString = {
		object_id: 1,
		object_type: 'invalid-object-type',
		target_user: seller.id,
	};

	const response = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'object_type',
				validation: 'in',
			},
		]),
	);
});

test('GET /chat/:id/messages return 403 when not allowed user try to access it', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();
	const { user: badUser } = await createUser();

	const queryString = {
		object_id: 1,
		object_type: 'technology-order',
		target_user: seller.id,
	};

	const firstResponse = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	await ChatMessage.create({
		type: 1,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		from_user_id: mySelf.id,
		chat_id: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(`/chat/${firstResponse.body.id}/messages`)
		.loginVia(badUser, 'jwt')
		.end();

	secondResponse.assertStatus(403);
});

test('GET /chat/:id/messages returns an error when the chat id is not in the correct format', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();

	const response = await client
		.get(`/chat/not-valid-uuid/messages`)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.BAD_FORMATTED_ID, antl('error.chat.badFormattedId')),
	);
});

test('POST /chat/:id return 403 when not allowed user try to access it', async ({ client }) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();
	const { user: badUser } = await createUser();

	const queryString = {
		object_id: 1,
		object_type: 'technology-order',
		target_user: seller.id,
	};

	const firstResponse = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	await ChatMessage.create({
		type: 1,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		from_user_id: mySelf.id,
		chat_id: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(`/chat/${firstResponse.body.id}/messages`)
		.loginVia(badUser, 'jwt')
		.end();

	secondResponse.assertStatus(403);
	secondResponse.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /chat/:id/messages store successfully the message', async ({ client }) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const queryString = {
		object_id: 1,
		object_type: 'technology-order',
		target_user: seller.id,
	};

	const firstResponse = await client
		.get(`/chat`)
		.send(queryString)
		.loginVia(mySelf, 'jwt')
		.end();

	const secondResponse = await client
		.post(`/chat/${firstResponse.body.id}/messages`)
		.loginVia(mySelf, 'jwt')
		.send({
			content: {
				text: 'my message',
			},
		})
		.end();

	secondResponse.assertStatus(200);
	secondResponse.assertJSONSubset({
		content: JSON.stringify({
			text: 'my message',
		}),
	});
});
