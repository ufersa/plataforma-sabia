const { test, trait } = use('Test/Suite')('Service');
const Bull = use('Rocketseat/Bull');
const Factory = use('Factory');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Service = use('App/Models/Service');
const ServiceOrder = use('App/Models/ServiceOrder');
const ServiceOrderReview = use('App/Models/ServiceOrderReview');
const Taxonomy = use('App/Models/Taxonomy');
const { errorPayload, errors, antl, serviceOrderStatuses } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /services returns all services', async ({ client }) => {
	const services = await Factory.model('App/Models/Service').createMany(5);

	const response = await client.get('/services').end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...services.rows });
});

test('GET /services/:id returns a service', async ({ client }) => {
	const service = await Factory.model('App/Models/Service').create();

	const response = await client.get(`/services/${service.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(service.toJSON());
});

test('GET /services/orders Lists user responsible service orders', async ({ client }) => {
	const { user: requester } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrders = await requester.serviceOrders().createMany([
		{
			service_id: service.id,
			quantity: 2,
			status: serviceOrderStatuses.REQUESTED,
		},
		{
			service_id: service.id,
			quantity: 3,
			status: serviceOrderStatuses.REQUESTED,
		},
		{
			service_id: service.id,
			quantity: 4,
			status: serviceOrderStatuses.REQUESTED,
		},
	]);

	const response = await client
		.get('/services/orders')
		.loginVia(responsible, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...serviceOrders.rows });
});

test('GET /services/orders/reviews Lists user responsible service order reviews', async ({
	client,
}) => {
	const { user: requester } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrders = await requester.serviceOrders().createMany([
		{
			service_id: service.id,
			quantity: 2,
			status: serviceOrderStatuses.REQUESTED,
		},
		{
			service_id: service.id,
			quantity: 3,
			status: serviceOrderStatuses.REQUESTED,
		},
		{
			service_id: service.id,
			quantity: 4,
			status: serviceOrderStatuses.REQUESTED,
		},
	]);

	const serviceOrderReviews = await requester.serviceOrderReviews().createMany([
		{
			service_order_id: serviceOrders[0].id,
			content: 'review 1',
			rating: 3,
			positive: JSON.stringify(['positive 1', 'positive 2']),
			negative: JSON.stringify(['negative 1', 'negative 2']),
		},
		{
			service_order_id: serviceOrders[1].id,
			content: 'review 2',
			rating: 4,
			positive: JSON.stringify(['positive 1', 'positive 2']),
			negative: JSON.stringify(['negative 1', 'negative 2']),
		},
		{
			service_order_id: serviceOrders[2].id,
			content: 'review 3',
			rating: 5,
			positive: JSON.stringify(['positive 1', 'positive 2']),
			negative: JSON.stringify(['negative 1', 'negative 2']),
		},
	]);

	const response = await client
		.get('/services/orders/reviews')
		.loginVia(responsible, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...serviceOrderReviews.rows });
});

test('POST /services creates a new Service', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	const serviceFactory = await Factory.model('App/Models/Service').make();

	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const response = await client
		.post('/services')
		.loginVia(user, 'jwt')
		.send({
			...serviceFactory.toJSON(),
			keywords: keywordTermsIds,
		})
		.end();

	const serviceCreated = await Service.findOrFail(response.body.id);
	await serviceCreated.loadMany(['keywords', 'user.institution']);

	response.assertStatus(200);
	response.assertJSONSubset(serviceCreated.toJSON());
	assert.equal(serviceCreated.user_id, user.id);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...serviceCreated.toJSON(),
			objectID: `service-${serviceCreated.id}`,
		}).calledOnce,
	);
});

test('POST /services/orders creates a new Service Order', async ({ client, assert }) => {
	await Bull.reset();

	const { user: loggedUser } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });

	const services = await Factory.model('App/Models/Service').createMany(3);
	await Promise.all([services.map((service) => service.user().associate(responsible))]);

	const payload = services.map((service) => ({ service_id: service.id, quantity: 2 }));

	const response = await client
		.post('/services/orders')
		.loginVia(loggedUser, 'jwt')
		.send({ services: payload })
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	assert.equal(response.body[0].user_id, loggedUser.id);
	assert.equal(response.body[0].status, serviceOrderStatuses.REQUESTED);
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});
	const serviceOrderReviewFactory = await Factory.model('App/Models/ServiceOrderReview').make();

	const response = await client
		.post(`/services/orders/${serviceOrder.id}/reviews`)
		.loginVia(otherUser, 'jwt')
		.send({
			...serviceOrderReviewFactory.toJSON(),
			positive: ['positive 1', 'positive 2'],
			negative: ['negative 1', 'negative 2'],
		})
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});
	const serviceOrderReviewFactory = await Factory.model('App/Models/ServiceOrderReview').make();

	const response = await client
		.post(`/services/orders/${serviceOrder.id}/reviews`)
		.loginVia(user, 'jwt')
		.send({
			...serviceOrderReviewFactory.toJSON(),
			positive: ['positive 1', 'positive 2'],
			negative: ['negative 1', 'negative 2'],
		})
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

test('PUT /services/:id returns an error if the user is not authorized', async ({ client }) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(ownerUser);
	await service.keywords().attach(keywordTermsIds);

	const updatedService = await Factory.model('App/Models/Service').make();

	const response = await client
		.put(`/services/${service.id}`)
		.loginVia(otherUser, 'jwt')
		.send({
			...updatedService.toJSON(),
			keywords: keywordTermsIds,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /services/:id service responsible user can update it', async ({ client, assert }) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(ownerUser);
	await service.keywords().attach(keywordTermsIds);

	const payload = {
		...service.toJSON(),
		name: 'Updated Service name',
		keywords: keywordTermsIds,
	};

	const response = await client
		.put(`/services/${service.id}`)
		.loginVia(ownerUser, 'jwt')
		.send(payload)
		.end();

	const serviceUpdated = await Service.findOrFail(response.body.id);
	await serviceUpdated.loadMany(['keywords', 'user.institution']);

	response.assertStatus(200);
	response.assertJSONSubset(serviceUpdated.toJSON());
	assert.equal(payload.name, serviceUpdated.name);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...serviceUpdated.toJSON(),
			objectID: `service-${serviceUpdated.id}`,
		}).calledOnce,
	);
});

test('PUT /services/orders/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});

	const response = await client
		.put(`services/orders/${serviceOrder.id}/perform`)
		.loginVia(responsible, 'jwt')
		.end();

	response.assertStatus(200);
	const serviceOrderPerformed = await ServiceOrder.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(serviceOrderPerformed.status, serviceOrderStatuses.PERFORMED);
});

test('PUT /services/orders/reviews/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});

	const serviceOrderReview = await user.serviceOrderReviews().create({
		service_order_id: serviceOrder.id,
		content: 'review 1',
		rating: 3,
		positive: JSON.stringify(['positive 1', 'positive 2']),
		negative: JSON.stringify(['negative 1', 'negative 2']),
	});

	const updatedReview = {
		content: 'update content review',
		rating: 4,
		positive: JSON.stringify(['update positive 1', 'update positive 2']),
		negative: JSON.stringify(['update negative 1', 'update negative 2']),
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});

	const serviceOrderReview = await user.serviceOrderReviews().create({
		service_order_id: serviceOrder.id,
		content: 'review 1',
		rating: 3,
		positive: JSON.stringify(['positive 1', 'positive 2']),
		negative: JSON.stringify(['negative 1', 'negative 2']),
	});

	const updatedReview = {
		content: 'update content review',
		rating: 4,
		positive: ['update positive 1', 'update positive 2'],
		negative: ['update negative 1', 'update negative 2'],
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

test('DELETE /services/:id returns an error if the user is not authorized', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const service = await Factory.model('App/Models/Service').create();

	const response = await client
		.delete(`/services/${service.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /services/:id deletes a service', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(user);

	const response = await client
		.delete(`/services/${service.id}`)
		.loginVia(user, 'jwt')
		.end();

	const serviceFromDatabase = await Service.query()
		.where({ id: service.id })
		.first();

	response.assertStatus(200);
	assert.isNull(serviceFromDatabase);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().deleteObject.withArgs(service.toJSON().objectID).calledOnce,
	);
});

test('DELETE /services/orders/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: responsible } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});

	const serviceOrderReview = await user.serviceOrderReviews().create({
		service_order_id: serviceOrder.id,
		content: 'review 1',
		rating: 3,
		positive: JSON.stringify(['positive 1', 'positive 2']),
		negative: JSON.stringify(['negative 1', 'negative 2']),
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

	const service = await Factory.model('App/Models/Service').create();
	await service.user().associate(responsible);

	const serviceOrder = await user.serviceOrders().create({
		service_id: service.id,
		quantity: 2,
		status: serviceOrderStatuses.REQUESTED,
	});

	const serviceOrderReview = await user.serviceOrderReviews().create({
		service_order_id: serviceOrder.id,
		content: 'review 1',
		rating: 3,
		positive: JSON.stringify(['positive 1', 'positive 2']),
		negative: JSON.stringify(['negative 1', 'negative 2']),
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
