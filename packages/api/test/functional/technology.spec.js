const { test, trait } = use('Test/Suite')('Technology');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const User = use('App/Models/User');

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 10,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 365,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
	status: 'DRAFT',
};

const technology2 = {
	title: 'Test Title 2',
	description: 'Test description 2',
	private: 1,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 20,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose 2',
	secondary_purpose: 'Test secondary purpose 2',
	application_mode: 'Test application mode 2',
	application_examples: 'Test application example 2',
	installation_time: 700,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
	status: 'DRAFT',
};

const updatedTechnology = {
	title: 'Updated Test Title',
	description: 'Updated description',
	private: 0,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 20,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Updated Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 2000,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
	status: 'SUBMITED',
};

const invalidField = {
	invalid_field: 'Invalid field',
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

test('GET /technologies get list of technologies', async ({ client }) => {
	await Technology.create(technology);

	const response = await client.get('/technologies').end();

	response.assertStatus(200);
	response.assertJSONSubset([technology]);
});

test('GET technologies?term_id= get technologies by term id', async ({ client }) => {
	const tech1 = await Technology.create(technology);
	const tech2 = await Technology.create(technology2);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await tech1.terms().attach([testTerm.id]);
	await tech2.terms().attach([testTerm.id]);

	const response = await client.get(`/technologies?term_id=${testTerm.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset([tech1.toJSON(), tech2.toJSON()]);
});

test('GET technologies?term= get technologies by term slug', async ({ client }) => {
	const tech1 = await Technology.create(technology);
	const tech2 = await Technology.create(technology2);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
		slug: 'test-term',
	});

	await tech1.terms().attach([testTerm.id]);
	await tech2.terms().attach([testTerm.id]);

	const response = await client.get(`/technologies?term=${testTerm.slug}`).end();

	response.assertStatus(200);
	response.assertJSONSubset([tech1.toJSON(), tech2.toJSON()]);
});

test('GET /technologies fails with an inexistent technology', async ({ client }) => {
	const response = await client.get('/technologies/12312').end();

	response.assertStatus(400);
});

test('GET /technologies/:id/terms?taxonomy= get technology terms by taxonomy', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await newTechnology.terms().save(newTerm);

	const response = await client
		.get(`/technologies/${newTechnology.id}/terms?taxonomy=${taxonomy.taxonomy}`)
		.end();

	response.assertStatus(200);

	const terms = await Term.query()
		.whereHas('technologies', (builder) => {
			builder.where('id', newTechnology.id);
		})
		.where('taxonomy_id', testTaxonomy.id)
		.fetch();

	response.assertJSONSubset(terms.toJSON());
});

test('GET /technologies/:id/users get technology users', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const ownerUser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUser.id]);

	await newTechnology.users().attach(developerUser.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client.get(`/technologies/${newTechnology.id}/users`).end();

	response.assertStatus(200);

	const users = await newTechnology.users().fetch();

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id/users?role= get technology users by role', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const ownerUser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUser.id]);

	await newTechnology.users().attach(developerUser.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client.get(`/technologies/${newTechnology.id}/users?role=${role}`).end();

	response.assertStatus(200);

	const users = await newTechnology
		.users()
		.wherePivot('role', role)
		.fetch();

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id returns a single technology', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const response = await client.get(`/technologies/${newTechnology.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	const technologyCreated = await Technology.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('POST /technologies calls algoliasearch.saveObject with default category if no term is provided', async ({
	assert,
	client,
}) => {
	const defaultCategory = 'Não definida';
	const loggeduser = await User.create(user);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	const createdTechnology = await Technology.find(response.body.id);

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category: defaultCategory,
		}).calledOnce,
	);
});

test('POST /technologies calls algoliasearch.saveObject with default category if no category term is provided', async ({
	assert,
	client,
}) => {
	const defaultCategory = 'Não definida';

	const noCategoryTaxonomy = await Taxonomy.create(taxonomy);
	const noCategoryTerm = await noCategoryTaxonomy.terms().create({
		term: 'No Category term',
	});

	const loggeduser = await User.create(user);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, terms: [noCategoryTerm.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category: defaultCategory,
		}).calledOnce,
	);
});

test('POST /technologies calls algoliasearch.saveObject with the category term if it is provided', async ({
	assert,
	client,
}) => {
	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');

	const term = 'Saneamento';
	const categoryTerm = await categoryTaxonomy.terms().create({
		term,
	});

	const loggeduser = await User.create(user);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, terms: [categoryTerm.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category: term,
		}).calledOnce,
	);
});

test('POST /technologies creates/saves a new technology with users.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUser.id,
			role: 'DEVELOPER',
		},
	];

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, users })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('users');

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology with terms', async ({ client }) => {
	const loggedUser = await User.create(user);
	const testTaxonomy = await Taxonomy.create(taxonomy);
	const term1 = await testTaxonomy.terms().create({
		term: 'TERM1',
	});
	const term2 = await testTaxonomy.terms().create({
		term: 'TERM2',
	});

	const response = await client
		.post('/technologies')
		.loginVia(loggedUser, 'jwt')
		.send({ ...technology, terms: [term1.id, term2.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('terms');

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology with users and terms', async ({
	client,
}) => {
	const loggedUser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const users = [
		{
			userId: loggedUser.id,
		},
		{
			userId: developerUser.id,
			role: 'DEVELOPER',
		},
	];

	const testTaxonomy = await Taxonomy.create(taxonomy);
	const term1 = await testTaxonomy.terms().create({
		term: 'TERM1',
	});
	const term2 = await testTaxonomy.terms().create({
		term: 'TERM2',
	});

	const response = await client
		.post('/technologies')
		.loginVia(loggedUser, 'jwt')
		.send({ ...technology, users, terms: [term1.id, term2.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.loadMany(['users', 'terms']);

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

/** POST technologies/:idTechnology/users */
test('POST technologies/:idTechnology/users associates users with technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const newTechnology = await Technology.create(technology);

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUser.id,
			role: 'DEVELOPER',
		},
	];
	const response = await client
		.post(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.send({ users })
		.end();

	const technologyWithUsers = await Technology.find(response.body.id);
	await technologyWithUsers.load('users');

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

test('POST /technologies creates/saves a new technology even if an invalid field is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);
	const invalidTechnology = { ...technology, ...invalidField };
	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(invalidTechnology)
		.end();

	const technologyCreated = await Technology.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('POST /technologies does not create/save a new technology if an inexistent term is provided', async ({
	client,
}) => {
	const technologyWithInvalidTerms = { ...technology, terms: [99999] };

	const loggeduser = await User.create(user);

	const response = await client
		.post(`/technologies`)
		.loginVia(loggeduser, 'jwt')
		.send(technologyWithInvalidTerms)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('PUT /technologies/:id Updates technology details', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id Updates technology details even if an invalid field is provided.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, ...invalidField })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id Updates technology details with users', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);
	const developerUser = await User.create({
		email: 'sabiatestingdeveloper@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	});

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUser.id,
			role: 'DEVELOPER',
		},
	];

	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, users })
		.end();

	const technologyWithUsers = await Technology.find(response.body.id);
	await technologyWithUsers.load('users');

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

test('PUT /technologies/:id does not update a technology if an inexistent term is provided', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ terms: [99999] })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('PUT /technologies/:id Updates technology with terms if terms[termId] is provided', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			terms: [newTerm.id],
		})
		.end();

	response.assertStatus(200);
	await newTechnology.load('terms');
	response.assertJSONSubset(newTechnology.toJSON());
});

test('PUT /technologies/:id Updates technology with terms if terms[termSlug] is provided', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
		slug: 'test-term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			terms: [newTerm.slug],
		})
		.end();

	response.assertStatus(200);
	await newTechnology.load('terms');
	response.assertJSONSubset(newTechnology.toJSON());
});

test('DELETE /technologies/:id Fails if an inexistent technology is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/technologies/999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Technology' }),
		),
	);
});

test('DELETE /technologies/:id Delete a technology with id.', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE technologies/:idTechnology/terms/:idTerm Detach a technology term.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await newTechnology.terms().attach([testTerm.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}/terms/${testTerm.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE technologies/:idTechnology/users/:idUser Detach a technology user.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);

	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}/users/${loggeduser.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
