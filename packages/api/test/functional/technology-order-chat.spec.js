const { test, trait } = use('Test/Suite')('TechnologyOrder');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const TechnologyOrderChatMessage = use('App/Models/TechnologyOrderChatMessage');

test('GET /technologies/:technologyId}/orders/:orderId/chat', async ({ client }) => {
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
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		participants: JSON.stringify([mySelf.id, seller.id]),
		technologyOrderId: technologyOrder.body.id,
		status: 1,
		messages: [],
	});
});

test('GET /technologies/:technologyId}/orders/:orderId/chat return stored previosly messages', async ({
	client,
	assert,
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

	await TechnologyOrderChatMessage.create({
		type: 1,
		content: JSON.stringify({
			text: 'Bom dia, está disponível?',
		}),
		fromUserId: mySelf.id,
		chatId: firstResponse.body.id,
	});

	const secondResponse = await client
		.get(`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat`)
		.loginVia(mySelf, 'jwt')
		.end();

	assert.equal(secondResponse.body.messages[0].type, 1);
	assert.equal(secondResponse.body.messages[0].fromUserId, mySelf.id);
	assert.equal(secondResponse.body.messages[0].content.text, 'Bom dia, está disponível?');

	secondResponse.assertStatus(200);
});

test('GET /technologies/:technologyId}/orders/:orderId/chat/:id return 404 when not allowed user try to access it', async ({
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

	secondResponse.assertStatus(404);
});

test('POST /technologies/:technologyId}/orders/:orderId/chat/:id return 404 when not allowed user try to access it', async ({
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
		.post(
			`/technologies/${technology.id}/orders/${technologyOrder.body.id}/chat/${firstResponse.body.id}`,
		)
		.loginVia(badUser, 'jwt')
		.end();

	secondResponse.assertStatus(404);
});

test('POST /technologies/:technologyId}/orders/:orderId/chat/:id store successfuly the message', async ({
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
		type: 1,
	});
});
