const { test, trait } = use('Test/Suite')('TechnologyOrder');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');
const { antl, errors, errorPayload } = require('../../app/Utils');
const {
	technologyUseStatuses,
	fundingStatuses,
	orderStatuses,
	chatMessagesTypes,
	chatStatusesTypes,
} = require('../../app/Utils');

const TechnologyOrder = use('App/Models/TechnologyOrder');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const TechnologyOrderChatMessage = use('App/Models/TechnologyOrderChatMessage');

test('GET /technologies/:technologyId/orders/:orderId/chat create or fetch the tecnologyOrderChat', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await TechnologyOrder.create({
		quantity: 1,
		use: technologyUseStatuses.PRIVATE,
		funding: fundingStatuses.NO_NEED_FUNDING,
		status: orderStatuses.OPEN,
	});

	await Promise.all([
		technologyOrder.technology().associate(technology),
		technologyOrder.user().associate(seller),
	]);

	const response = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		participants: JSON.stringify([mySelf.id, seller.id]),
		technologyOrderId: technologyOrder.id,
		status: chatStatusesTypes.ACTIVE,
	});
});

test('GET /technologies/:technologyId/orders/:orderId/chat return stored previosly messages', async ({
	client,
	assert,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await TechnologyOrder.create({
		quantity: 1,
		use: technologyUseStatuses.PRIVATE,
		funding: fundingStatuses.NO_NEED_FUNDING,
		status: orderStatuses.OPEN,
	});

	await Promise.all([
		technologyOrder.technology().associate(technology),
		technologyOrder.user().associate(seller),
	]);

	const firstResponse = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	await TechnologyOrderChatMessage.create({
		type: chatMessagesTypes.TEXT,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		fromUserId: mySelf.id,
		chatId: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(
			`/technologies/${technology.id}/orders/${technologyOrder.id}/chat/${firstResponse.body.id}`,
		)
		.loginVia(mySelf, 'jwt')
		.end();

	assert.equal(secondResponse.body[0].type, 'text');
	assert.equal(secondResponse.body[0].fromUserId, mySelf.id);
	assert.equal(secondResponse.body[0].content.text, 'Bom dia, está disponível?');

	secondResponse.assertStatus(200);
});

test('GET /technologies/:technologyId/orders/:orderId/chat/:id return 403 when not allowed user try to access it', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();
	const { user: badUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(seller, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	const firstResponse = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	await TechnologyOrderChatMessage.create({
		type: 1,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		fromUserId: mySelf.id,
		chatId: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(
			`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat/${firstResponse.body.id}`,
		)
		.loginVia(badUser, 'jwt')
		.end();

	secondResponse.assertStatus(403);
});

test('GET /technologies/:technologyId/orders/:orderId/chat/:id return 404 when not allowed user try to access it', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(seller, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	const response = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat/not-valid-uuid`)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(400);
});

test('POST /technologies/:technologyId/orders/:orderId/chat/:id return 403 when not allowed user try to access it', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();
	const { user: badUser } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(seller, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	const firstResponse = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	await TechnologyOrderChatMessage.create({
		type: 1,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		fromUserId: mySelf.id,
		chatId: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(
			`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat/${firstResponse.body.id}`,
		)
		.loginVia(badUser, 'jwt')
		.end();

	secondResponse.assertStatus(403);
	secondResponse.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /technologies/:technologyId/orders/:orderId/chat/:id store successfully the message', async ({
	client,
}) => {
	const { user: mySelf } = await createUser();
	const { user: seller } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(seller.id);

	const technologyOrder = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(seller, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	const firstResponse = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	const secondResponse = await client
		.post(
			`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat/${firstResponse.body.id}`,
		)
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
