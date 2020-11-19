const { test, trait } = use('Test/Suite')('TechnologyOrder');
const Factory = use('Factory');
const { antl, errorPayload, errors, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /orders returns all technologyOrder', async ({ client }) => {
	const { createdUser: user } = await createUser({ userAppend: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create();
	await Promise.all([
		technologyOrder.technology().associate(technology),
		technologyOrder.user().associate(user),
	]);

	const response = await client
		.get('/orders')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([{ ...technologyOrder.toJSON(), technology_id: technology.id }]);
});

test('GET /orders/:id returns a technologyOrder', async ({ client }) => {
	const { createdUser: user } = await createUser({ userAppend: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create();
	await Promise.all([
		technologyOrder.technology().associate(technology),
		technologyOrder.user().associate(user),
	]);

	const response = await client
		.get(`/orders/${technologyOrder.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...technologyOrder.toJSON(), technology_id: technology.id });
});

test('GET /technologies/:id/orders returns all orders for a technology', async ({ client }) => {
	const { createdUser: user } = await createUser({ userAppend: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create();
	await Promise.all([
		technologyOrder.technology().associate(technology),
		technologyOrder.user().associate(user),
	]);

	const response = await client
		.get(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([technologyOrder.toJSON()]);
});

test('POST /technologies/:id/orders creates a new technologyOrder', async ({ client }) => {
	const { createdUser: user } = await createUser({ userAppend: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();

	const response = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ user_id: user.id, technology_id: technology.id });
});

test('PUT orders/:id/update-status technologyOrder status update', async ({ client }) => {
	const { createdUser: user } = await createUser({ userAppend: { status: 'verified' } });
	const { createdUser: adminUser } = await createUser({ userAppend: { role: roles.ADMIN } });
	const technology = await Factory.model('App/Models/Technology').create();

	const responsePost = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	responsePost.assertStatus(200);
	responsePost.assertJSONSubset({
		user_id: user.id,
		technology_id: technology.id,
		status: 'open',
	});

	const newTechnologyOrder = responsePost.body;

	const responsePut = await client
		.put(`orders/${responsePost.body.id}/update-status`)
		.loginVia(user, 'jwt')
		.send({
			status: 'finish',
		})
		.end();

	responsePut.assertStatus(403);
	responsePut.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	const responsePutAdmin = await client
		.put(`orders/${newTechnologyOrder.id}/update-status`)
		.loginVia(adminUser, 'jwt')
		.send({
			status: 'finish',
		})
		.end();

	responsePutAdmin.assertStatus(200);
	responsePutAdmin.assertJSONSubset({ status: 'finish', technology_id: technology.id });
});
