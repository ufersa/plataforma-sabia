const { test, trait } = use('Test/Suite')('Disclaimers');
const Disclaimer = use('App/Models/Disclaimer');
const Taxonomy = use('App/Models/Taxonomy');
const Factory = use('Factory');
const { roles } = require('../../app/Utils');
const { errorPayload, errors, antl } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('POST /disclaimers works successfully.', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const disclaimer = await Factory.model('App/Models/Disclaimer').create();

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

test('PUT /disclaimers works successfully', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });

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

test('DELETE /disclaimers works successfully', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });

	const disclaimerSalved = await Disclaimer.first();

	const response = await client
		.delete(`/disclaimers/${disclaimerSalved.id}`)
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
	const disclaimerSalved = await Disclaimer.first();

	let response = await client
		.post('/disclaimers')
		.loginVia(loggedUser, 'jwt')
		.send(disclaimerSalved.toJSON())
		.end();
	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	response = await client
		.put(`/disclaimers/${disclaimerSalved.id}`)
		.loginVia(loggedUser, 'jwt')
		.header('Accept', 'application/json')
		.send({ ...disclaimerSalved.toJSON(), description: 'New description' })
		.end();
	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	response = await client
		.delete(`/disclaimers/${disclaimerSalved.id}`)
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
		.send({ ...userJson, scope: 'web', disclamers })
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

	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	let categories = await categoryTaxonomy.terms().createMany([
		{
			term: 'Category 1',
		},
		{
			term: 'Category 2',
		},
		{
			term: 'Category 3',
		},
	]);
	categories = categories.map((category) => category.id);

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
		.send({ categories, disclamers })
		.end();

	response.assertStatus(401);
	assert.equal(response.body.error.error_code, 'TERMSOFUSE');
});
