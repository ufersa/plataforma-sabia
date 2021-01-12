const { test, trait } = use('Test/Suite')('Service');
const Factory = use('Factory');
const { errorPayload, errors, antl } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

const Service = use('App/Models/Service');
const Taxonomy = use('App/Models/Taxonomy');

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

	response.assertStatus(200);
	assert.equal(serviceCreated.user_id, user.id);
	response.assertJSONSubset(serviceCreated.toJSON());
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
	await service.terms().attach(keywordTermsIds);

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
	await service.terms().attach(keywordTermsIds);

	const updatedService = await Factory.model('App/Models/Service').make();

	const response = await client
		.put(`/services/${service.id}`)
		.loginVia(ownerUser, 'jwt')
		.send({
			...updatedService.toJSON(),
			name: 'Updated Service name',
			keywords: keywordTermsIds,
		})
		.end();
	const serviceUpdated = await Service.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(serviceUpdated.name, 'Updated Service name');
	response.assertJSONSubset(serviceUpdated.toJSON());
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
});
