const { test, trait } = use('Test/Suite')('TechnologyOrder');
const Factory = use('Factory');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const Bull = use('Rocketseat/Bull');
const {
	antl,
	errors,
	errorPayload,
	fundingStatuses,
	technologyUseStatuses,
	orderStatuses,
	roles,
} = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const order = {
	quantity: 2,
	use: technologyUseStatuses.PRIVATE,
	funding: fundingStatuses.NO_NEED_FUNDING,
	comment: 'test',
	status: orderStatuses.OPEN,
};

const closedOrder = {
	quantity: 1,
	use: technologyUseStatuses.PRIVATE,
	funding: fundingStatuses.NO_NEED_FUNDING,
	comment: 'test',
	status: orderStatuses.CLOSED,
};

test('GET /orders returns all technology orders', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
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

test('GET /orders/:id returns a technology order', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
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
	const { user } = await createUser({ append: { status: 'verified' } });
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

test('POST /technologies/:id/orders creates a new technology order successfully', async ({
	client,
	assert,
}) => {
	await Bull.reset();

	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);

	const response = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.send({
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		})
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	response.assertJSONSubset({ user_id: user.id, technology_id: technology.id });
	assert.equal('add', bullCall.funcName);
	assert.equal(owner.email, bullCall.args[1].email);
	assert.equal('emails.technology-order', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('PUT orders/:id/update-status technology order status update', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: owner } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);

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
		.put(`/orders/${responsePost.body.id}/update-status`)
		.loginVia(user, 'jwt')
		.send({
			status: 'canceled',
		})
		.end();

	responsePut.assertStatus(403);
	responsePut.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	const responsePutAdmin = await client
		.put(`/orders/${newTechnologyOrder.id}/update-status`)
		.loginVia(adminUser, 'jwt')
		.send({
			status: 'canceled',
		})
		.end();

	responsePutAdmin.assertStatus(200);
	responsePutAdmin.assertJSONSubset({ status: 'canceled', technology_id: technology.id });
});

test('PUT /orders/:id/close returns an error when an unauthorized buyer attempts to close an order.', async ({
	client,
}) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(buyerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /orders/:id/close returns an error when a buyer tries to close an order for a technology with a non opened status.', async ({
	client,
}) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(closedOrder);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(sellerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.STATUS_NO_ALLOWED_FOR_OPERATION,
			antl('error.operation.statusNoAllowedForOperation', {
				op: 'CLOSE ORDER',
				status: technologyOrder.status,
			}),
		),
	);
});

test('PUT /orders/:id/close makes a seller closes an order successfully.', async ({
	client,
	assert,
}) => {
	await Bull.reset();

	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/close`)
		.loginVia(sellerUser, 'jwt')
		.send({ quantity: 3, unit_value: 100000 })
		.end();

	const orderClosed = await TechnologyOrder.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(orderClosed.status, orderStatuses.CLOSED);
	assert.equal(response.body.technology_id, technologyPurchased.id);

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(buyerUser.email, bullCall.args[1].email);
	assert.equal('emails.technology-order-closed', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('PUT /orders/:id/cancel returns an error when an unauthorized user attempts to cancel an order.', async ({
	client,
}) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();
	const { user: otherUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/cancel`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /orders/:id/cancel returns an error when a user tries to cancel an order for a technology with a non opened status.', async ({
	client,
}) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(closedOrder);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/cancel`)
		.loginVia(sellerUser, 'jwt')
		.send({ cancellation_reason: 'some reason' })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.STATUS_NO_ALLOWED_FOR_OPERATION,
			antl('error.operation.statusNoAllowedForOperation', {
				op: 'CANCEL ORDER',
				status: technologyOrder.status,
			}),
		),
	);
});

test('PUT /orders/:id/cancel makes a seller cancels an order successfully.', async ({
	client,
	assert,
}) => {
	await Bull.reset();

	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/cancel`)
		.loginVia(sellerUser, 'jwt')
		.send({ cancellation_reason: 'cancelled by seller' })
		.end();

	const orderCancellled = await TechnologyOrder.findOrFail(response.body.id);
	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	assert.equal(orderCancellled.status, orderStatuses.CANCELED);
	assert.equal(response.body.technology_id, technologyPurchased.id);
	assert.equal('add', bullCall.funcName);
	assert.equal(buyerUser.email, bullCall.args[1].email);
	assert.equal('emails.technology-order-cancelled', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('PUT /orders/:id/cancel makes a buyer cancels an order successfully.', async ({
	client,
	assert,
}) => {
	await Bull.reset();

	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await TechnologyOrder.create(order);
	await Promise.all([
		technologyOrder.technology().associate(technologyPurchased),
		technologyOrder.user().associate(buyerUser),
	]);

	const response = await client
		.put(`/orders/${technologyOrder.id}/cancel`)
		.loginVia(buyerUser, 'jwt')
		.send({ cancellation_reason: 'cancelled by buyer' })
		.end();

	const orderCancellled = await TechnologyOrder.findOrFail(response.body.id);
	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	assert.equal(orderCancellled.status, orderStatuses.CANCELED);
	assert.equal(response.body.technology_id, technologyPurchased.id);
	assert.equal('add', bullCall.funcName);
	assert.equal(sellerUser.email, bullCall.args[1].email);
	assert.equal('emails.technology-order-cancelled', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});
