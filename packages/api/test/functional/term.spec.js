const { test, trait } = use('Test/Suite')('Term');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { defaultParams } = require('./params.spec');

const Term = use('App/Models/Term');
const TermMeta = use('App/Models/TermMeta');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');

const term = {
	term: 'test term',
	taxonomy: 'KEYWORDS',
};

const taxonomy = {
	taxonomy: 'TEST_TAXONOMY',
	description: 'Test Taxonomy.',
};

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const researcherUser = {
	email: 'researcherusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.RESEARCHER,
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
		.withParams({ ...defaultParams, embed: { all: true, ids: false } })
		.withFilters({ parent: 0 })
		.fetch();

	let response = await client.get('/terms?embed&parent=0').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// default query
	terms = await Term.query()
		.withParams({ ...defaultParams })
		.fetch();

	response = await client.get('/terms').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// all terms with embedding
	terms = await Term.query()
		.withParams({ ...defaultParams, embed: { all: true, ids: false } })
		.fetch();

	response = await client.get('/terms?embed').end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// terms that has firstTerm as a parent
	const firstTerm = await Term.query().first();

	terms = await Term.query()
		.withParams({ ...defaultParams })
		.withFilters({ parent: firstTerm.id })
		.fetch();

	response = await client.get(`/terms?parent=${firstTerm.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());

	// single term with embed
	terms = await Term.query()
		.withParams({ ...defaultParams, id: firstTerm.id })
		.firstOrFail();

	response = await client.get(`/terms/${firstTerm.id}/?embed`).end();

	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
});

test('POST /terms endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/terms')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
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
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/terms')
		.send({
			term: 'test term',
			taxonomy: 999,
		})
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

test('POST /terms create/save a new Term.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/terms')
		.send(term)
		.loginVia(loggeduser, 'jwt')
		.end();

	const termCreated = await Term.find(response.body.id);

	await termCreated.load('taxonomy');

	response.assertStatus(200);
	response.body.parent_id = null;
	response.assertJSONSubset(termCreated.toJSON());
});

test('POST /terms create/save a new Term with Metadata.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

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
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas,
	});
});

test('GET /terms/:id trying get an inexistent Term', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get(`/terms/99999`)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/terms/${newTerm.id}`)
		.loginVia(loggeduser, 'jwt')
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
		taxonomyId: 999,
	};

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
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

test('PUT /terms/:id Update Term details', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const updatedTerm = {
		term: 'Updated Test Term',
		taxonomyId: 1,
	};

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(researcherUser);

	const updatedTerm = newTerm.toJSON();

	const newMeta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};

	updatedTerm.metas = [newMeta];

	const response = await client
		.put(`/terms/${newTerm.id}`)
		.send(updatedTerm)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(researcherUser);

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
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(researcherUser);

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
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedMeta);
});

test('PUT /terms/:id/meta creates a new term metadata', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const loggeduser = await User.create(researcherUser);

	const meta = {
		meta_key: 'new-meta-key',
		meta_value: 'new meta value',
	};

	const response = await client
		.put(`/terms/${newTerm.id}/meta`)
		.send(meta)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(meta);
});

test('PUT /terms/:id deletes metadata with empty meta array', async ({ client }) => {
	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const loggeduser = await User.create(researcherUser);

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
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		metas: [],
	});
});

test('DELETE /terms/:id Tryng delete a inexistent Term.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.delete(`/terms/999`)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.delete(`/terms/${newTerm.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
