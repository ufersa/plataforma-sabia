const { test, trait } = use('Test/Suite')('Term');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');

const Term = use('App/Models/Term');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');

const term = {
	term: 'test term',
	slug: 'test-term',
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

	const loggeduser = await User.create(user);

	const response = await client
		.get('/terms?perPage=1&order=desc')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([testTerm.toJSON()]);
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

test('GET /terms/:id trying get an inexistent Term', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get(`/terms/999`)
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
