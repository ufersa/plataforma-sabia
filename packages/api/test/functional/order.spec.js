const { test, trait } = use('Test/Suite')('Order');
const Factory = use('Factory');
const TechnologyOrder = use('App/Models/TechnologyOrder');
const ServiceOrder = use('App/Models/ServiceOrder');
const ServiceOrderReview = use('App/Models/ServiceOrderReview');
const Permission = use('App/Models/Permission');
const Bull = use('Rocketseat/Bull');
const {
	antl,
	errors,
	errorPayload,
	orderStatuses,
	serviceOrderStatuses,
	roles,
} = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /orders returns all orders in buyer view', async ({ client }) => {
	const { user: buyer } = await createUser({ append: { status: 'verified' } });
	const { user: technologySeller } = await createUser({ append: { status: 'verified' } });
	const { user: serviceSeller } = await createUser({ append: { status: 'verified' } });

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([technologySeller.id]);
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technology.id,
		user_id: buyer.id,
	});
	const service = await Factory.model('App/Models/Service').create({
		user_id: serviceSeller.id,
	});
	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		service_id: service.id,
		user_id: buyer.id,
	});

	const response = await client
		.get('/orders?fromCurrentUser')
		.loginVia(buyer, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset([
		{
			...technologyOrder.toJSON(),
			technology_id: technology.id,
			type: 'technology',
		},
		{
			...serviceOrder.toJSON(),
			service_id: service.id,
			type: 'service',
		},
	]);
});

test('GET /orders returns all orders in seller view', async ({ client }) => {
	const { user: seller } = await createUser({ append: { status: 'verified' } });
	const { user: technologyBuyer } = await createUser({ append: { status: 'verified' } });
	const { user: serviceBuyer } = await createUser({ append: { status: 'verified' } });

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([seller.id]);
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technology.id,
		user_id: technologyBuyer.id,
	});
	const service = await Factory.model('App/Models/Service').create({
		user_id: seller.id,
	});
	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		service_id: service.id,
		user_id: serviceBuyer.id,
	});

	const response = await client
		.get('/orders')
		.loginVia(seller, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset([
		{
			...technologyOrder.toJSON(),
			technology_id: technology.id,
			type: 'technology',
		},
		{
			...serviceOrder.toJSON(),
			service_id: service.id,
			type: 'service',
		},
	]);
});

test('GET /orders returns all orders if user has permissions', async ({ client, assert }) => {
	const { user: userWithPermissions } = await createUser({ append: { status: 'verified' } });
	const { user: seller } = await createUser({ append: { status: 'verified' } });
	const { user: technologyBuyer } = await createUser({ append: { status: 'verified' } });
	const { user: serviceBuyer } = await createUser({ append: { status: 'verified' } });

	const listTechnologiesOrdersPermission = await Permission.getPermission(
		'list-technologies-orders',
	);
	const listServicesOrdersPermission = await Permission.getPermission('list-services-orders');
	await userWithPermissions
		.permissions()
		.attach([(listTechnologiesOrdersPermission.id, listServicesOrdersPermission.id)]);

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([seller.id]);
	await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technology.id,
		user_id: technologyBuyer.id,
	});
	const service = await Factory.model('App/Models/Service').create({
		user_id: seller.id,
	});
	await Factory.model('App/Models/ServiceOrder').create({
		service_id: service.id,
		user_id: serviceBuyer.id,
	});

	const response = await client
		.get('/orders')
		.loginVia(userWithPermissions, 'jwt')
		.end();
	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 2);
});

test('GET /orders/:id?orderType=technology returns a technology order', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technology.id,
		user_id: user.id,
	});

	const response = await client
		.get(`/orders/${technologyOrder.id}?orderType=technology`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...technologyOrder.toJSON(), technology_id: technology.id });
});

test('GET /orders/:id?orderType=service returns a service order', async ({ client }) => {
	const { user: requester } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		service_id: service.id,
		user_id: requester.id,
	});

	const response = await client
		.get(`/orders/${serviceOrder.id}?orderType=service`)
		.loginVia(requester, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...serviceOrder.toJSON(), service_id: service.id });
});

test('GET /technologies/:id/orders returns all orders for a technology', async ({ client }) => {
	const { user: buyer } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser({ append: { status: 'verified' } });
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach([owner.id]);
	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technology.id,
		user_id: buyer.id,
	});

	const response = await client
		.get(`/technologies/${technology.id}/orders/`)
		.loginVia(owner, 'jwt')
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

	const technologyOrderData = await Factory.model('App/Models/TechnologyOrder').make();

	const response = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.send(technologyOrderData.toJSON())
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

	const technologyOrderData = await Factory.model('App/Models/TechnologyOrder').make();

	const responsePost = await client
		.post(`/technologies/${technology.id}/orders/`)
		.loginVia(user, 'jwt')
		.send(technologyOrderData.toJSON())
		.end();

	responsePost.assertStatus(200);
	responsePost.assertJSONSubset({
		user_id: user.id,
		technology_id: technology.id,
		status: orderStatuses.OPEN,
	});

	const newTechnologyOrder = responsePost.body;

	const responsePut = await client
		.put(`/orders/${newTechnologyOrder.id}/update-status`)
		.loginVia(user, 'jwt')
		.send({
			status: orderStatuses.CANCELED,
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
			status: orderStatuses.CANCELED,
		})
		.end();

	responsePutAdmin.assertStatus(200);
	responsePutAdmin.assertJSONSubset({
		status: orderStatuses.CANCELED,
		technology_id: technology.id,
	});
});

test('PUT /orders/:id/close returns an error when an unauthorized buyer attempts to close an order.', async ({
	client,
}) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
		status: orderStatuses.CLOSED,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
		status: orderStatuses.CLOSED,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

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

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

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

test('GET /services/orders Lists user responsible service orders', async ({ client }) => {
	const { user: requester } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrders = await Factory.model('App/Models/ServiceOrder').createMany(5, {
		service_id: service.id,
		user_id: requester.id,
	});

	const response = await client
		.get('/services/orders')
		.loginVia(responsible, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...serviceOrders.rows });
});

test('GET /services/orders/reviews Lists user responsible service order reviews', async ({
	client,
	assert,
}) => {
	const { user: requester } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrders = await Factory.model('App/Models/ServiceOrder').createMany(3, {
		service_id: service.id,
		user_id: requester.id,
	});

	await Promise.all(
		serviceOrders.map((serviceOrder) =>
			Factory.model('App/Models/ServiceOrderReview').create({
				service_order_id: serviceOrder.id,
				user_id: requester.id,
			}),
		),
	);

	const response = await client
		.get('/services/orders/reviews')
		.loginVia(responsible, 'jwt')
		.end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 3);
	assert.equal(response.body[0].user_id, requester.id);
	assert.equal(response.body[0].serviceOrder.service.user_id, responsible.id);
});

test('POST /services/orders creates a new Service Order', async ({ client, assert }) => {
	await Bull.reset();

	const { user: loggedUser } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const services = await Factory.model('App/Models/Service').createMany(3, {
		user_id: responsible.id,
	});

	const payload = services.map((service) => ({ service_id: service.id, quantity: 2 }));

	const response = await client
		.post('/services/orders')
		.loginVia(loggedUser, 'jwt')
		.send({ comment: 'test comment', services: payload })
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	assert.equal(response.body[0].user_id, loggedUser.id);
	assert.equal(response.body[0].status, serviceOrderStatuses.REQUESTED);
	assert.equal(response.body[0].comment, 'test comment');
	assert.equal('add', bullCall.funcName);
	assert.equal(responsible.email, bullCall.args[1].email);
	assert.equal('emails.service-requested', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('POST /services/orders/:id/reviews returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});
	const serviceOrderReviewFactory = await Factory.model('App/Models/ServiceOrderReview').make();

	const response = await client
		.post(`/services/orders/${serviceOrder.id}/reviews`)
		.loginVia(otherUser, 'jwt')
		.send(serviceOrderReviewFactory.toJSON())
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /services/orders/:id/reviews creates a new Service Order Review', async ({
	client,
	assert,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});
	const serviceOrderReviewFactory = await Factory.model('App/Models/ServiceOrderReview').make({
		positive: ['positive 1', 'positive 2'],
		negative: ['negative 1', 'negative 2'],
	});

	const response = await client
		.post(`/services/orders/${serviceOrder.id}/reviews`)
		.loginVia(user, 'jwt')
		.send(serviceOrderReviewFactory.toJSON())
		.end();

	const serviceOrderReviewCreated = await ServiceOrderReview.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(serviceOrderReviewCreated.user_id, user.id);
	assert.equal(serviceOrderReviewCreated.service_order_id, serviceOrder.id);

	const serviceOrderReviewCreatedJSON = serviceOrderReviewCreated.toJSON();
	serviceOrderReviewCreatedJSON.negative = JSON.stringify(serviceOrderReviewCreatedJSON.negative);
	serviceOrderReviewCreatedJSON.positive = JSON.stringify(serviceOrderReviewCreatedJSON.positive);
	response.assertJSONSubset(serviceOrderReviewCreatedJSON);
});

test('PUT /services/orders/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const response = await client
		.put(`/services/orders/${serviceOrder.id}`)
		.loginVia(otherUser, 'jwt')
		.send({
			quantity: 5,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /services/orders/:id User that requested service order can update it', async ({
	client,
	assert,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const updatedQuantity = 5;

	const response = await client
		.put(`/services/orders/${serviceOrder.id}`)
		.loginVia(user, 'jwt')
		.send({ quantity: updatedQuantity })
		.end();

	const serviceOrderUpdated = await ServiceOrder.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(serviceOrderUpdated.quantity, updatedQuantity);
});

test('PUT services/orders/:id/perform returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const response = await client
		.put(`services/orders/${serviceOrder.id}/perform`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT services/orders/:id/perform User responsible for service order can perform it', async ({
	client,
	assert,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const response = await client
		.put(`services/orders/${serviceOrder.id}/perform`)
		.loginVia(responsible, 'jwt')
		.end();

	const serviceOrderPerformed = await ServiceOrder.query()
		.select('status')
		.where({ id: response.body.id })
		.first();

	response.assertStatus(200);
	assert.equal(serviceOrderPerformed.status, serviceOrderStatuses.PERFORMED);
});

test('PUT /services/orders/reviews/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const serviceOrderReview = await Factory.model('App/Models/ServiceOrderReview').create({
		user_id: user.id,
		service_order_id: serviceOrder.id,
	});

	const updatedReview = {
		content: 'update content review',
		rating: 4,
	};

	const response = await client
		.put(`/services/orders/reviews/${serviceOrderReview.id}`)
		.loginVia(otherUser, 'jwt')
		.send(updatedReview)
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /services/orders/reviews/:id User that create service order review can update it', async ({
	client,
	assert,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const serviceOrderReview = await Factory.model('App/Models/ServiceOrderReview').create({
		user_id: user.id,
		service_order_id: serviceOrder.id,
	});

	const updatedReview = {
		content: 'update content review',
		rating: 4,
	};

	const response = await client
		.put(`/services/orders/reviews/${serviceOrderReview.id}`)
		.loginVia(user, 'jwt')
		.send(updatedReview)
		.end();

	const updatedServiceOrderReview = await ServiceOrderReview.findOrFail(response.body.id);
	response.assertStatus(200);
	assert.equal(updatedServiceOrderReview.content, updatedReview.content);
	assert.equal(updatedServiceOrderReview.rating, updatedReview.rating);
});

test('DELETE /services/orders/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const response = await client
		.delete(`/services/orders/${serviceOrder.id}`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /services/orders/:id deletes a service order', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const response = await client
		.delete(`/services/orders/${serviceOrder.id}`)
		.loginVia(user, 'jwt')
		.end();

	const serviceOrderFromDatabase = await ServiceOrder.query()
		.where({ id: serviceOrder.id })
		.first();

	response.assertStatus(200);
	assert.isNull(serviceOrderFromDatabase);
});

test('DELETE /services/orders/reviews/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const serviceOrderReview = await Factory.model('App/Models/ServiceOrderReview').create({
		user_id: user.id,
		service_order_id: serviceOrder.id,
	});

	const response = await client
		.delete(`/services/orders/reviews/${serviceOrderReview.id}`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /services/orders/reviews/:id User that create service order review can delete it', async ({
	client,
	assert,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create({
		user_id: responsible.id,
	});

	const serviceOrder = await Factory.model('App/Models/ServiceOrder').create({
		user_id: user.id,
		service_id: service.id,
	});

	const serviceOrderReview = await Factory.model('App/Models/ServiceOrderReview').create({
		user_id: user.id,
		service_order_id: serviceOrder.id,
	});

	const response = await client
		.delete(`/services/orders/reviews/${serviceOrderReview.id}`)
		.loginVia(user, 'jwt')
		.end();

	const serviceOrderReviewFromDatabase = await ServiceOrderReview.query()
		.where({ id: serviceOrderReview.id })
		.first();

	response.assertStatus(200);
	assert.isNull(serviceOrderReviewFromDatabase);
});
