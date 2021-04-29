const { test, trait } = use('Test/Suite')('Disclaimers');
const Disclaimer = use('App/Models/Disclaimer');
const Factory = use('Factory');
const { roles } = require('../../app/Utils');
const { errorPayload, errors, antl } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('POST /disclaimers works successfully.', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const disclaimer = await Factory.model('App/Models/Disclaimer').make();

	const response = await client
		.post('/disclaimers')
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send(disclaimer.toJSON())
		.end();

	const disclaimerCreated = await Disclaimer.find(response.body.id);
	response.assertStatus(200);
	response.assertJSONSubset(disclaimerCreated.toJSON());
	assert.notEqual(disclaimerCreated.id, disclaimer.id);
});

test('PUT /disclaimers/:id works successfully', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });

	const disclaimer = await Factory.model('App/Models/Disclaimer').create();

	const response = await client
		.put(`/disclaimers/${disclaimer.id}/`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send({ ...disclaimer.toJSON(), description: 'test' })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ id: disclaimer.id, description: 'test' });
});

test('DELETE /disclaimers/:id works successfully', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });

	const disclaimer = await Factory.model('App/Models/Disclaimer').create();

	const response = await client
		.delete(`/disclaimers/${disclaimer.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });
});

test('POST /disclaimers returns an error when the user is not an administrator', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser({
		append: { role: roles.DEFAULT_USER },
	});
	const disclaimer = await Factory.model('App/Models/Disclaimer').make();

	let response = await client
		.post('/disclaimers')
		.loginVia(loggedUser, 'jwt')
		.send(disclaimer.toJSON())
		.end();
	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	const disclaimerSaved = await Factory.model('App/Models/Disclaimer').create();

	response = await client
		.put(`/disclaimers/${disclaimerSaved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send({ ...disclaimer.toJSON(), description: 'New description' })
		.end();
	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	response = await client
		.delete(`/disclaimers/${disclaimerSaved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.end();
	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /auth/register returns an error when the user does not accept all terms of use', async ({
	client,
	assert,
}) => {
	const { userJson } = await createUser();
	userJson.email = 'emailtest@disclaimers.com';

	const allDisclaimers = await Disclaimer.query()
		.where('type', 'register')
		.fetch();

	const disclamers = await allDisclaimers
		.toJSON()
		.map((disclamer) => disclamer.id)
		.slice(1);

	const response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({ ...userJson, disclamers })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});

test('POST /reviewers returns an error when the user does not accept all terms of use', async ({
	client,
	assert,
}) => {
	const { user } = await createUser();
	await user.disclaimers().detach();

	const allDisclaimers = await Disclaimer.query()
		.where('type', 'register')
		.fetch();

	const disclamers = await allDisclaimers
		.toJSON()
		.map((disclamer) => disclamer.id)
		.slice(1);

	const response = await client
		.post('/reviewers')
		.loginVia(user, 'jwt')
		.header('Accept', 'application/json')
		.send({ disclamers })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});
