const { test, trait } = use('Test/Suite')('Disclaimers');
const Disclaimer = use('App/Models/Disclaimer');
const { roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

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

const exDisclaimer = {
	description: 'Declaro ciência dos Termos e Condições de Uso.',
	required: 1,
	type: 'privacypolicy',
	version: '1',
};

test('POST /disclaimers', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.post('/disclaimers')
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send(exDisclaimer)
		.end();

	const disclaimerCreated = await Disclaimer.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(disclaimerCreated.toJSON());
});

test('PUT /disclaimers', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const disclaimerSalved = await Disclaimer.first();

	const response = await client
		.put(`/disclaimers/${disclaimerSalved.id}/`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send({ ...disclaimerSalved.toJSON(), description: 'test' })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ id: disclaimerSalved.id, description: 'test' });
});

test('DELETE /disclaimers', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const disclaimerSalved = await Disclaimer.first();

	const response = await client
		.delete(`/disclaimers/${disclaimerSalved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });
});

test('/disclaimers make sure the user role is admin', async ({ client }) => {
	const { user: loggedUser } = await createUser({
		userAppend: { role: roles.DEFAULT_USER },
	});
	const disclaimerSalved = await Disclaimer.first();

	let response = await client
		.post('/disclaimers')
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send(disclaimerSalved.toJSON())
		.end();
	response.assertStatus(403);
	response.assertJSONSubset({
		error: {
			error_code: 'UNAUTHORIZED_ACCESS',
			message: 'You do not have permission to access this resource',
		},
	});

	response = await client
		.put(`/disclaimers/${disclaimerSalved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send({ ...disclaimerSalved.toJSON(), description: 'New description' })
		.end();
	response.assertStatus(403);
	response.assertJSONSubset({
		error: {
			error_code: 'UNAUTHORIZED_ACCESS',
			message: 'You do not have permission to access this resource',
		},
	});

	response = await client
		.delete(`/disclaimers/${disclaimerSalved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.end();
	response.assertStatus(403);
	response.assertJSONSubset({
		error: {
			error_code: 'UNAUTHORIZED_ACCESS',
			message: 'You do not have permission to access this resource',
		},
	});
});

test('POST /auth/register the endpoint fails when the user does not accept all the terms of use', async ({
	client,
	assert,
}) => {
	const allDisclaimers = await Disclaimer.query()
		.where('type', 'termsOfUseRegister')
		.fetch();

	const disclamers = await allDisclaimers
		.toJSON()
		.map((disclamer) => disclamer.id)
		.slice(1);

	const response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({ ...user, scope: 'web', disclamers })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});
