const { test, trait } = use('Test/Suite')('Term');
const Term = use('App/Models/Term');
const TermMeta = use('App/Models/TermMeta');
const Taxonomy = use('App/Models/Taxonomy');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { defaultParams } = require('./params.spec');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const term = {
	term: 'test term',
	taxonomy: 'KEYWORDS',
};

const taxonomy = {
	taxonomy: 'TEST_TAXONOMY',
	description: 'Test Taxonomy.',
};

test('GET terms Get a list of all terms', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({ term: 'testTerm' });

	const response = await client.get('/terms?perPage=1&order=desc').end();

	response.assertStatus(200);
	response.assertJSONSubset([testTerm.toJSON()]);
});

test('GET terms and single term with embed and parent', async ({ client }) => {
	// all parent terms with embedding
	let terms = await Term.query()
		.withFilters({ parent: 0 })
		.withParams({
			params: {
				...defaultParams,
				embed: { all: true, ids: false },
			},
		});

	let response = await client.get('/terms?embed&parent=0').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// default query
	terms = await Term.query().withParams({ params: defaultParams });

	response = await client.get('/terms').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// all terms with embedding
	terms = await Term.query().withParams({
		params: {
			...defaultParams,
			embed: { all: true, ids: false },
		},
	});

	response = await client.get('/terms?embed').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// terms that has firstTerm as a parent
	const firstTerm = await Term.query().first();

	terms = await Term.query()
		.withFilters({ parent: firstTerm.id })
		.withParams({ params: defaultParams }, { filterById: false });

	response = await client.get(`/terms?parent=${firstTerm.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// single term with embed
	terms = await Term.query().withParams({
		params: {
			...defaultParams,
			id: firstTerm.id,
			embed: { all: true, ids: false },
		},
	});

	response = await client.get(`/terms/${firstTerm.id}/?embed`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
});

test('POST /terms endpoint fails when sending invalid payload', async ({ client }) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.post('/terms')
		.header('Accept', 'application/json')
		.loginVia(loggedUser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'term',
				validation: 'required',
			},
			{
				field: 'taxonomy',
				validation: 'required',
			},
		]),
	);
});

test('POST /terms trying save a term in a inexistent taxonomy.', async ({ client }) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.post('/terms')
		.send({
			term: 'test term',
			taxonomy: 999,
		})
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Taxonomy' }),
		),
	);
});

test('POST /terms trying save a duplicated taxonomy term.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const testTaxonomy = await Taxonomy.create(taxonomy);

	await testTaxonomy.terms().create({
		term: 'test term',
	});

	const response = await client
		.post('/terms')
		.send({
			term: 'test term',
			taxonomy: testTaxonomy.id,
		})
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.UNIQUE_TERM_ERROR, antl('error.term.uniqueTermError')),
	);
});

test('POST /terms create/save a new Term.', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.post('/terms')
		.send(term)
		.loginVia(loggedUser, 'jwt')
		.end();

	const termCreated = await Term.find(response.body.id);

	await termCreated.load('taxonomy');

	response.assertStatus(200);
	response.body.parent_id = null;
	assert.equal(termCreated.slug, 'keywords-test-term');
	response.assertJSONSubset(termCreated.toJSON());
});

test('POST /terms create/save a new Term with Metadata.', async ({ client }) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const metas = [
		{
			meta_key: 'test-meta-key-1',
			meta_value: 'test meta value 1',
		},
		{
			meta_key: 'test-meta-key-2',
			meta_value: 'test meta value 2',
		},
		{
			meta_key: 'test-meta-key-3',
			meta_value: 'test meta value 3',
		},
	];

	const response = await client
		.post('/terms')
		.send({ ...term, metas })
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas,
	});
});

test('GET /terms/:id trying get an inexistent Term', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.get(`/terms/99999`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('GET /terms/:id returns a single Term', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser();

	const response = await client
		.get(`/terms/${newTerm.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTerm.toJSON());
});

test('GET /terms/:id is able to fetch a term by its slug', async ({ client }) => {
	const termObject = await Term.query().first();
	const response = await client.get(`/terms/${termObject.slug}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(termObject.toJSON());
});

test('PUT /terms/:id trying update a term in a inexistent taxonomy', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const updatedTerm = {
		term: 'Updated Test Term',
		taxonomy_id: 999,
	};

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Taxonomy' }),
		),
	);
});

test('PUT /terms/:id Update Term details', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const updatedTerm = {
		term: 'Updated Test Term',
		taxonomy_id: 1,
	};

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		term: updatedTerm.term,
	});
});

test('PUT /terms/:id update Term with new metadata', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const updatedTerm = newTerm.toJSON();

	const newMeta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};

	updatedTerm.metas = [newMeta];

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas: [newMeta],
	});
});

test('PUT /terms/:id update Term metadata value', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const meta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};
	const metaInst = await TermMeta.create(meta);
	await newTerm.metas().save(metaInst);

	const updatedTerm = newTerm.toJSON();
	updatedTerm.metas = [
		{
			meta_key: 'new-meta-key',
			meta_value: 'updated meta value',
		},
	];

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas: [
			{
				meta_key: 'new-meta-key',
				meta_value: 'updated meta value',
			},
		],
	});
});

test('PUT /terms/:id/meta update metadata value', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const meta = {
		meta_key: 'meta-key',
		meta_value: 'meta value',
	};
	const metaInst = await TermMeta.create(meta);
	await newTerm.metas().save(metaInst);

	const updatedMeta = {
		meta_key: 'meta-key',
		meta_value: 'updated meta value',
	};

	const response = await client
		.put(`/terms/${newTerm.id}/meta`)
		.send(updatedMeta)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedMeta);
});

test('PUT /terms/:id/meta creates a new term metadata', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const meta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};

	const response = await client
		.put(`/terms/${newTerm.id}/meta`)
		.send(meta)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(meta);
});

test('PUT /terms/:id deletes metadata with empty meta array', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const meta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};
	const metaInst = await TermMeta.create(meta);
	await newTerm.metas().save(metaInst);

	const updatedTerm = newTerm.toJSON();
	updatedTerm.metas = [];

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas: [],
	});
});

test('DELETE /terms/:id Tryng delete a inexistent Term.', async ({ client }) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.delete(`/terms/999`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('DELETE /terms/:id Delete a Term with id.', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const { user: loggedUser } = await createUser({
		append: { role: roles.RESEARCHER },
	});

	const response = await client
		.delete(`/terms/${newTerm.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /terms/ Delete batch terms.', async ({ client, assert }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);
	let list_ids = await testTaxonomy.terms().createMany([
		{
			term: 'test term1',
		},
		{
			term: 'test term2',
		},
		{
			term: 'test term3',
		},
	]);

	list_ids = await list_ids.map((item) => item.id);

	let check_create_terms = await Term.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(check_create_terms.toJSON().length, 3);

	const { user: loggedUser } = await createUser();

	const response = await client
		.delete(`/terms?ids=${list_ids.join()}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	check_create_terms = await Term.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(check_create_terms.toJSON().length, 0);
});
