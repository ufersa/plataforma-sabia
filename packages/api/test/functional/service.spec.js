const { test, trait } = use('Test/Suite')('Service');
const Factory = use('Factory');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Service = use('App/Models/Service');
const Taxonomy = use('App/Models/Taxonomy');
const { errorPayload, errors, antl } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

const { prepareService } = require('../../app/Utils/Algolia/indexes/service');

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

test('POST /services creates a new Service', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	const serviceThumbNail = await Factory.model('App/Models/Upload').create({
		user_id: user.id,
	});

	const serviceFactory = await Factory.model('App/Models/Service').make({
		thumbnail_id: serviceThumbNail.id,
	});

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
	await serviceCreated.loadMany(['keywords', 'user.institution', 'thumbnail']);

	response.assertStatus(200);
	assert.equal(serviceCreated.user_id, user.id);
	assert.equal(serviceCreated.name, serviceFactory.name);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs(prepareService(serviceCreated)).calledOnce,
	);
});

test('PUT /services/:id returns an error if the user is not authorized', async ({ client }) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const service = await Factory.model('App/Models/Service').create({
		user_id: ownerUser.id,
	});
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

	const service = await Factory.model('App/Models/Service').create({
		user_id: ownerUser.id,
	});
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
	await serviceUpdated.loadMany(['keywords', 'user.institution', 'thumbnail']);

	response.assertStatus(200);
	response.assertJSONSubset(serviceUpdated.toJSON());
	assert.equal(payload.name, serviceUpdated.name);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs(
			prepareService({
				...serviceUpdated.toJSON(),
				objectID: `service-${serviceUpdated.id}`,
			}),
		).calledOnce,
	);
});

test('PUT /services/:id/active returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser();
	const { user: otherUser } = await createUser();

	const createdService = await Factory.model('App/Models/Service').create({
		active: 0,
		user_id: user.id,
	});

	const response = await client
		.put(`/services/${createdService.id}/active`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /services/:id/active works sucessfully', async ({ assert, client }) => {
	const { user } = await createUser();

	let createdService = await Factory.model('App/Models/Service').create({
		active: 0,
		user_id: user.id,
	});

	const response = await client
		.put(`/services/${createdService.id}/active`)
		.loginVia(user, 'jwt')
		.end();

	createdService = await Service.query()
		.select('active')
		.firstOrFail(createdService.id);

	response.assertStatus(204);
	assert.isTrue(!!createdService.active);
	assert.isTrue(AlgoliaSearch.initIndex.called);
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
	const service = await Factory.model('App/Models/Service').create({
		user_id: user.id,
	});

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

test('GET /services/my-services get authenticated user services', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	await Factory.model('App/Models/Service').createMany(7, {
		user_id: user.id,
	});

	const perPage = 5;
	const response = await client
		.get(`/services/my-services`)
		.send({ embed: true, perPage })
		.loginVia(user, 'jwt')
		.end();

	assert.equal(response.body.length, perPage);
	response.assertHeader('x-sabia-total', 7);
	response.assertHeader('x-sabia-totalpages', 2);
});
