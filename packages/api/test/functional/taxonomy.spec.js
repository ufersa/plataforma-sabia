const { test, trait } = use('Test/Suite')('Taxonomy');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');
const { defaultParams } = require('./params.spec');

const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const User = use('App/Models/User');

const taxonomy = {
	taxonomy: 'TEST_TAXONOMY',
	description: 'Test Taxonomy',
};

const adminUser = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: 'ADMIN',
};

test('GET taxonomies Get a list of all Taxonomies', async ({ client }) => {
	const response = await client.get('/taxonomies').end();

	response.assertStatus(200);
	response.assertJSONSubset([
		{
			taxonomy: 'KEYWORDS',
		},
	]);
});

test('GET taxonomies and single taxonomy with embed and parent', async ({ client }) => {
	// all taxonomies with embedding containing only parent terms.
	let taxonomies = await Taxonomy.query()
		.withFilters({ parent: 0 })
		.withParams(
			{
				params: {
					...defaultParams,
					embed: { all: true, ids: false },
				},
			},
			{ skipRelationship: ['terms'] },
		);

	let response = await client.get('/taxonomies?embed&parent=0').end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());

	// default query
	taxonomies = await Taxonomy.query().withParams({ params: defaultParams });

	response = await client.get('/taxonomies').end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());

	// all taxonomies with embedding
	taxonomies = await Taxonomy.query().withParams({
		params: {
			...defaultParams,
			embed: { all: true, ids: false },
		},
	});

	response = await client.get('/taxonomies?embed').end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());

	// all taxonomies but listing only terms children of firstTerm
	const firstTerm = await Term.query().first();
	taxonomies = await Taxonomy.query()
		.withFilters({ parent: firstTerm.id })
		.withParams({ params: defaultParams });

	response = await client.get(`/taxonomies?parent=${firstTerm.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());

	taxonomies = await Taxonomy.query()
		.withFilters({ parent: 0 })
		.withParams({
			params: { ...defaultParams, id: 1, embed: { all: true, ids: false } },
		});

	response = await client.get('/taxonomies/1/?embed&parent=0').end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());
});

test('POST /taxonomies endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/taxonomies')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'taxonomy',
				validation: 'required',
			},
			{
				field: 'description',
				validation: 'required',
			},
		]),
	);
});

test('POST /taxonomies endpoint fails when sending existing taxonomy', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/taxonomies')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send({
			taxonomy: 'KEYWORDS',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'taxonomy',
				validation: 'unique',
			},
		]),
	);
});

test('POST /taxonomies create/save a new taxonomy.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/taxonomies')
		.send(taxonomy)
		.loginVia(loggeduser, 'jwt')
		.end();

	const taxonomyCreated = await Taxonomy.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(taxonomyCreated.toJSON());
});

test('GET /taxonomies/:id trying to get an inexistent taxonomy', async ({ client }) => {
	const response = await client.get(`/taxonomies/99999`).end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Taxonomy' }),
		),
	);
});

test('GET /taxonomies/:id/terms trying to get terms of an inexistent taxonomy', async ({
	client,
}) => {
	const response = await client.get(`/taxonomies/999/terms`).end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Taxonomy' }),
		),
	);
});

test('GET /taxonomies/:id returns a single taxonomy', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const response = await client.get(`/taxonomies/${newTaxonomy.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(newTaxonomy.toJSON());
});

test('GET /taxonomies/:id is able to fetch a taxonomy by its slug', async ({ client }) => {
	const taxonomyObject = await Taxonomy.query().first();
	const response = await client.get(`/taxonomies/${taxonomyObject.taxonomy}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(taxonomyObject.toJSON());
});

test('GET /taxonomies/:id/terms get taxonomy terms', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const terms = [{ term: 'Term 01' }, { term: 'Term 02' }, { term: 'Term 03' }];

	await newTaxonomy.terms().createMany(terms);

	const response = await client.get(`/taxonomies/${newTaxonomy.id}/terms`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms);
});

test('GET /taxonomies/:id/terms is able to fetch a taxonomy by its slug', async ({ client }) => {
	const taxonomyObject = await Taxonomy.query().first();
	const terms = await Term.query()
		.where('taxonomy_id', taxonomyObject.id)
		.withParams({ params: defaultParams }, { filterById: false });
	const response = await client.get(`/taxonomies/${taxonomyObject.taxonomy}/terms`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
});

test('PUT /taxonomies/:id endpoint fails when trying to update with same taxonomy name', async ({
	client,
}) => {
	const { id } = await Taxonomy.create(taxonomy);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.put(`/taxonomies/${id}`)
		.send({
			taxonomy: 'KEYWORDS',
		})
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'taxonomy',
				validation: 'unique',
			},
		]),
	);
});

test('PUT /taxonomies/:id Update taxonomy details', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const updatedtaxonomy = {
		taxonomy: 'UPDATED_TEST_taxonomy',
		description: 'Test taxonomy updated',
	};

	const loggeduser = await User.create(adminUser);

	const response = await client
		.put(`/taxonomies/${newTaxonomy.id}`)
		.send(updatedtaxonomy)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedtaxonomy);
});

test('DELETE /taxonomies/:id Tryng to delete an inexistent taxonomy.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/taxonomies/999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Taxonomy' }),
		),
	);
});

test('DELETE /taxonomies/:id Delete a taxonomy with id.', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/taxonomies/${newTaxonomy.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /taxonomies/ Delete batch taxonomies.', async ({ client, assert }) => {
	let list_ids = await Taxonomy.createMany([
		{
			taxonomy: 'TEST_TAXONOMY1',
			description: 'Test Taxonomy',
		},
		{
			taxonomy: 'TEST_TAXONOMY2',
			description: 'Test Taxonomy',
		},
		{
			taxonomy: 'TEST_TAXONOMY3',
			description: 'Test Taxonomy',
		},
	]);

	list_ids = await list_ids.map((x) => x.id);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/taxonomies?ids=${list_ids.join()}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await Taxonomy.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
