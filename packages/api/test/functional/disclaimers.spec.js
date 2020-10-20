const { test, trait } = use('Test/Suite')('Disclaimers');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const TechnologyCost = use('App/Models/TechnologyCost');
const { roles } = require('../../app/Utils');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

const user = {
	email: 'sabiatestingdisclaimers@gmail.com',
	password: 'disclaimers',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.RESEARCHER,
};

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
	intellectual_property: 1,
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
};

test('POST /auth/register the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({ ...user, scope: 'web' })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});

test('POST /technologies the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});

test('PUT /technologies/:id the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const technology_up = await Technology.first();
	const loggeduser = await technology_up.users().first();
	await loggeduser.disclaimers().delete();

	const response = await client
		.put(`/technologies/${technology_up.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology_up, title: 'improved technology' })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});

test('DELETE /technologies/:id the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const technology_up = await Technology.first();
	const loggeduser = await technology_up.users().first();
	await loggeduser.disclaimers().delete();

	const response = await client
		.delete(`/technologies/${technology_up.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});

test('PUT /technologies/:id/costs the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const technologyCost = await TechnologyCost.first();
	const technology_up = await technologyCost.technology().first();
	const loggeduser = await technology_up.users().first();
	await loggeduser.disclaimers().delete();

	const response = await client
		.put(`/technologies/${technology_up.id}/costs`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...technologyCost.toJSON(), funding_value: 999 })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});
