const { test, trait } = use('Test/Suite')('Message');

const Message = use('App/Models/Message');
const Factory = use('Factory');
const { messageStatuses, errorPayload, errors, antl, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /messages returns user messages', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const messages = await Factory.model('App/Models/Message').createMany(10);
	await user.messages().saveMany(messages);

	const response = await client
		.get('/messages')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...messages.rows });
});

test('GET /messages/:id user read message', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const message = await Factory.model('App/Models/Message').create();
	message.status = messageStatuses.NEW;
	await message.save();
	await user.messages().save(message);

	const response = await client
		.get(`/messages/${message.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	assert.equal(response.body.status, messageStatuses.READ);
});

test('GET /messages/:id user trying to read another user message', async ({ client }) => {
	const { user: messageOwner } = await createUser({ append: { status: 'verified' } });
	const { user: loggedUser } = await createUser({ append: { status: 'verified' } });
	const message = await Factory.model('App/Models/Message').create();
	message.status = messageStatuses.NEW;
	await message.save();
	await messageOwner.messages().save(message);

	const response = await client
		.get(`/messages/${message.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Message' }),
		),
	);
});

test('GET /messages/new get total new messages', async ({ client }) => {
	const { user: messagesOwner } = await createUser({ append: { status: 'verified' } });

	const newMessages = await Factory.model('App/Models/Message').createMany(5);
	await Promise.all(
		newMessages.map(async (message) => {
			message.status = messageStatuses.NEW;
			await message.save();
		}),
	);
	await messagesOwner.messages().saveMany(newMessages);

	const response = await client
		.get('/messages/new')
		.loginVia(messagesOwner, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertStatus(200);
	response.assertJSONSubset({ total_new_messages: newMessages.length });
});

test('POST /messages returns an error when the user is not an administrator', async ({
	client,
}) => {
	const { user: comumUser } = await createUser({ append: { status: 'verified' } });

	const response = await client
		.post('/messages')
		.loginVia(comumUser, 'jwt')
		.send({
			to: 'sabiatestinge2e@gmail.com',
			subject: 'New Notification',
			content: 'You have received a new notification',
			type: 'notification',
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /messages returns an error when the recipient user does not exists', async ({
	client,
}) => {
	const { user: adminUser } = await createUser({
		append: { status: 'verified', role: roles.ADMIN },
	});

	const response = await client
		.post('/messages')
		.loginVia(adminUser, 'jwt')
		.send({
			to: 'inexistentuser@gmail.com',
			subject: 'New Notification',
			content: 'You have received a new notification',
			type: 'notification',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset({
		error: {
			error_code: 'VALIDATION_ERROR',
			message: [
				{
					message: 'The to should exist in users',
					field: 'to',
					validation: 'exists',
				},
			],
		},
	});
});

test('POST /messages Admin can creates a new message', async ({ client }) => {
	const { user: adminUser } = await createUser({
		append: { status: 'verified', role: roles.ADMIN },
	});

	const { user: recipientUser } = await createUser({
		append: { status: 'verified' },
	});

	const response = await client
		.post('/messages')
		.loginVia(adminUser, 'jwt')
		.send({
			to: recipientUser.email,
			subject: 'New Notification',
			content: 'You have received a new notification',
			type: 'notification',
		})
		.end();

	const messageCreated = await Message.findOrFail(response.body.id);
	response.body.status = messageStatuses.NEW;

	response.assertStatus(201);
	response.assertJSONSubset(messageCreated.toJSON());
});

test('PUT /messages/mark-as-read user marks messages as read', async ({ client, assert }) => {
	const { user: messagesOwner } = await createUser({ append: { status: 'verified' } });
	const newMessages = await Factory.model('App/Models/Message').createMany(3);
	await Promise.all(
		newMessages.map(async (message) => {
			message.status = messageStatuses.NEW;
			await message.save();
		}),
	);
	await messagesOwner.messages().saveMany(newMessages);
	const newMessagesIds = newMessages.map((message) => message.id);

	const response = await client
		.put('/messages/mark-as-read')
		.loginVia(messagesOwner, 'jwt')
		.send({
			messages: newMessagesIds,
		})
		.end();

	response.assertStatus(200);
	assert.equal(response.text, 3);
	const messagesMarkedAsRead = await Message.query()
		.whereIn('id', newMessagesIds)
		.fetch();
	messagesMarkedAsRead.toJSON().forEach((message) => {
		assert.equal(message.status, messageStatuses.READ);
	});
});

test('PUT /messages/mark-as-new user marks messages as new', async ({ client, assert }) => {
	const { user: messagesOwner } = await createUser({ append: { status: 'verified' } });
	const newMessages = await Factory.model('App/Models/Message').createMany(3);
	await Promise.all(
		newMessages.map(async (message) => {
			message.status = messageStatuses.READ;
			await message.save();
		}),
	);
	await messagesOwner.messages().saveMany(newMessages);
	const newMessagesIds = newMessages.map((message) => message.id);

	const response = await client
		.put('/messages/mark-as-new')
		.loginVia(messagesOwner, 'jwt')
		.send({
			messages: newMessagesIds,
		})
		.end();

	response.assertStatus(200);
	assert.equal(response.text, 3);
	const messagesMarkedAsRead = await Message.query()
		.whereIn('id', newMessagesIds)
		.fetch();
	messagesMarkedAsRead.toJSON().forEach((message) => {
		assert.equal(message.status, messageStatuses.NEW);
	});
});

test('DELETE /messages user deletes messages', async ({ client, assert }) => {
	const { user: messagesOwner } = await createUser({ append: { status: 'verified' } });
	const newMessages = await Factory.model('App/Models/Message').createMany(3);
	await Promise.all(
		newMessages.map(async (message) => {
			message.status = messageStatuses.READ;
			await message.save();
		}),
	);
	await messagesOwner.messages().saveMany(newMessages);
	const newMessagesIds = newMessages.map((message) => message.id);

	const response = await client
		.delete(`/messages?ids=${newMessagesIds.join()}`)
		.loginVia(messagesOwner, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await Message.query()
		.whereIn('id', newMessagesIds)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
