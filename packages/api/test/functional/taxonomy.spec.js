const { test, trait } = use('Test/Suite')('Taxonomy');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');

const taxonomy = {
	taxonomy: 'TEST_TAXONOMY',
	description: 'Test Taxonomy',
};

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

test('GET taxonomies Get a list of all Taxonomies', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get('/taxonomies')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([
		{
			taxonomy: 'KEYWORDS',
		},
	]);
});

test('POST /taxonomies endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(user);

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
	const loggeduser = await User.create(user);

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
	const loggeduser = await User.create(user);

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
	const loggeduser = await User.create(user);

	const response = await client
		.get(`/taxonomies/999`)
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

test('GET /taxonomies/:id/terms trying to get terms of an inexistent taxonomy', async ({
	client,
}) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get(`/taxonomies/999/terms`)
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

test('GET /taxonomies/:id returns a single taxonomy', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/taxonomies/${newTaxonomy.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTaxonomy.toJSON());
});

test('GET /taxonomies/:id/terms get taxonomy terms', async ({ client }) => {
	const newTaxonomy = await Taxonomy.create(taxonomy);

	const terms = [{ term: 'Term 01' }, { term: 'Term 02' }, { term: 'Term 03' }];

	await newTaxonomy.terms().createMany(terms);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/taxonomies/${newTaxonomy.id}/terms`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(terms);
});

test('PUT /taxonomies/:id endpoint fails when trying to update with same taxonomy name', async ({
	client,
}) => {
	const { id } = await Taxonomy.create(taxonomy);

	const loggeduser = await User.create(user);

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

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/taxonomies/${newTaxonomy.id}`)
		.send(updatedtaxonomy)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedtaxonomy);
});

test('DELETE /taxonomies/:id Tryng to delete an inexistent taxonomy.', async ({ client }) => {
	const loggeduser = await User.create(user);

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

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/taxonomies/${newTaxonomy.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
