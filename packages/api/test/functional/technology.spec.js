const { test, trait } = use('Test/Suite')('Technology');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');

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

const ownerUser = {
	email: 'ownerusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const developerUser = {
	email: 'developerusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const researcherUser = {
	email: 'researcherusertesting@gmail.com',
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

test('GET /technologies?term_id= get technologies by term id', async ({ client }) => {
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

test('GET /technologies?term= get technologies by term slug', async ({ client }) => {
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
	const loggeduser = await User.create(user);
	const DefaultUserRole = await Role.getRole('DEFAULT_USER');
	await loggeduser.role().associate(DefaultUserRole);

	const response = await client
		.get(`/technologies/99999`)
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

test('GET /technologies/:id/terms?taxonomy= get technology terms by taxonomy', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const newTechnology = await Technology.create(technology);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await newTechnology.terms().save(newTerm);

	const response = await client
		.get(`/technologies/${newTechnology.id}/terms?taxonomy=${taxonomy.taxonomy}`)
		.loginVia(loggeduser, 'jwt')
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
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const newTechnology = await Technology.create(technology);

	const ownerUserInst = await User.create(ownerUser);
	const developerUserInst = await User.create(developerUser);

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUserInst.id]);

	await newTechnology.users().attach(developerUserInst.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client
		.get(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);

	const users = await newTechnology.users().fetch();

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id/users?role= get technology users by role', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const newTechnology = await Technology.create(technology);

	const ownerUserInst = await User.create(ownerUser);
	const developerUserInst = await User.create(developerUser);

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUserInst.id]);

	await newTechnology.users().attach(developerUserInst.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client
		.get(`/technologies/${newTechnology.id}/users?role=${role}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);

	const users = await newTechnology
		.users()
		.wherePivot('role', role)
		.fetch();

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id returns a single technology', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const newTechnology = await Technology.create(technology);

	const response = await client
		.get(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	const technologyCreated = await Technology.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('POST /technologies creates/saves a new technology with users.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const developerUserInst = await User.create(developerUser);

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, users })
		.end();

	const technologyCreated = await Technology.find(response.body[0].id);

	const technologyWithUsers = await Technology.query()
		.with('users')
		.where('id', technologyCreated.id)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

/** POST technologies/:idTechnology/users */
test('POST /technologies/:idTechnology/users unauthorized user trying associates users with technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const developerUserInst = await User.create(developerUser);

	const newTechnology = await Technology.create(technology);

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];
	const response = await client
		.post(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.send({ users })
		.end();

	response.assertStatus(401);
	response.assertJSONSubset(
		errorPayload(errors.INVALID_ACCESS, antl('error.permission.invalidAccess')),
	);
});

/** POST technologies/:idTechnology/users */
test('POST /technologies/:idTechnology/users associates users with own technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(ownerUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const developerUserInst = await User.create(developerUser);
	const researcherUserInst = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);
	await newTechnology.users().attach([loggeduser.id]);

	const users = [
		{
			userId: researcherUserInst.id,
			role: 'RESEARCHER',
		},
		{
			userId: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];
	const response = await client
		.post(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.send({ users })
		.end();

	const technologyWithUsers = await Technology.query()
		.with('users')
		.where('id', newTechnology.id)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

test('POST /technologies creates/saves a new technology even if an invalid field is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

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

test('PUT /technologies/:id Unauthorized User trying ypdates technology details', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(401);
	response.assertJSONSubset(
		errorPayload(errors.INVALID_ACCESS, antl('error.permission.invalidAccess')),
	);
});

test('PUT /technologies/:id User updates own technology details', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(ownerUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id User updates technology details with direct permission', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(user);
	const DefaultUserRole = await Role.getRole('REVIEWER');
	await loggeduser.role().associate(DefaultUserRole);
	const updateTechnologiesPermission = await Permission.getPermission('update-technologies');
	await loggeduser.permissions().attach([updateTechnologiesPermission.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id Updates technology details with users', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

	const developerUserInst = await User.create(developerUser);

	const users = [
		{
			userId: loggeduser.id,
		},
		{
			userId: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];

	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, users })
		.end();

	const technologyWithUsers = await Technology.query()
		.with('users')
		.where('id', newTechnology.id)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

test('PUT /technologies/:id trying update a technology with in a inexistent term.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ term: 999 })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('PUT /technologies/:id Updates technology with a new term = termId in body', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	newTechnology.users().attach([loggeduser.id]);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			term: newTerm.id,
		})
		.end();

	response.assertStatus(200);
	const technologyTerms = await newTechnology.terms().fetch();
	newTechnology.terms = technologyTerms.toJSON();
	response.assertJSONSubset(newTechnology.toJSON());
});

test('PUT /technologies/:id Updates technology with a new term = termSlug in body', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	newTechnology.users().attach([loggeduser.id]);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
		slug: 'test-term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			term: newTerm.slug,
		})
		.end();

	response.assertStatus(200);
	const technologyTerms = await newTechnology.terms().fetch();
	newTechnology.terms = technologyTerms.toJSON();
	response.assertJSONSubset(newTechnology.toJSON());
});

test('DELETE /technologies/:id Fails if an inexistent technology is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

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

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /technologies/:idTechnology/terms/:idTerm Detach a technology term.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);
	newTechnology.users().attach([loggeduser.id]);

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

test('DELETE /technologies/:idTechnology/users/:idUser Detach a technology user.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	const ResearcherRole = await Role.getRole('RESEARCHER');
	await loggeduser.role().associate(ResearcherRole);

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
