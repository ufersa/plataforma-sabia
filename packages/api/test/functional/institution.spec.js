const { test, trait } = use('Test/Suite')('Institution');

const Institution = use('App/Models/Institution');
const Factory = use('Factory');
const { antl, errors, errorPayload } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const validCnpj = '24.529.265/0001-40';

test('GET /institutions returns all institutions', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();

	const response = await client
		.get('/institutions')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([institution.toJSON()]);
});

test('GET /institutions/:id returns a institution', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();

	const response = await client
		.get(`/institutions/${institution.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(institution.toJSON());
});

test('POST /institutions creates a new institution', async ({ client, assert }) => {
	const user = await Factory.model('App/Models/User').create();
	const institutionFactory = await Factory.model('App/Models/Institution').make();

	const response = await client
		.post('/institutions')
		.loginVia(user, 'jwt')
		.send({ ...institutionFactory.toJSON(), cnpj: validCnpj })
		.end();

	const institutionCreated = await Institution.findOrFail(response.body.institution.id);
	const institutionJson = await institutionCreated.toJSON();
	response.assertStatus(201);
	assert.equal(institutionJson.responsible, user.id);
	assert.equal(institutionJson.name, institutionFactory.name);
});

test('PUT /institutions/:id updates an institution', async ({ client, assert }) => {
	const user = await Factory.model('App/Models/User').create();
	const originalInstitution = await Factory.model('App/Models/Institution').create();
	await originalInstitution.responsible().associate(user);
	const modifiedInstitution = {
		...originalInstitution.toJSON(),
		name: 'any name',
		cnpj: validCnpj,
	};

	const response = await client
		.put(`/institutions/${originalInstitution.id}`)
		.loginVia(user, 'jwt')
		.send(modifiedInstitution)
		.end();

	const updatedInstitution = await Institution.query()
		.select('name', 'cnpj')
		.where({ id: originalInstitution.id })
		.first();

	response.assertStatus(204);
	assert.equal(updatedInstitution.name, modifiedInstitution.name);
	assert.equal(updatedInstitution.cnpj, validCnpj);
});

test('PUT /institutions/:id cannot update an institution with an already existing CNPJ', async ({
	client,
}) => {
	const user = await Factory.model('App/Models/User').create();
	const [alreadyExistentInstitution, anyInstitution] = await Factory.model(
		'App/Models/Institution',
	).createMany(2);
	await anyInstitution.responsible().associate(user);

	const response = await client
		.put(`/institutions/${anyInstitution.id}`)
		.loginVia(user, 'jwt')
		.send({
			...anyInstitution.toJSON(),
			cnpj: alreadyExistentInstitution.cnpj,
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'cnpj',
				validation: 'unique',
			},
		]),
	);
});

test('DELETE /institutions/:id delete an institution', async ({ client, assert }) => {
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();
	await institution.responsible().associate(user);

	const response = await client
		.delete(`/institutions/${institution.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(204);

	const institutionFromDatabase = await Institution.query()
		.where({ id: institution.id })
		.first();

	assert.isNull(institutionFromDatabase);
});

test('PUT/DELETE /institution/:id/ returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user: responsibleUser } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const institution = await Factory.model('App/Models/Institution').create();
	await institution.responsible().associate(responsibleUser);

	let responsePut = await client
		.put(`/institutions/${institution.id}`)
		.loginVia(otherUser, 'jwt')
		.send({ ...institution, name: 'New name institution' })
		.end();

	responsePut.assertStatus(403);
	responsePut.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	let responseDelete = await client
		.delete(`/institutions/${institution.id}`)
		.loginVia(otherUser, 'jwt')
		.end();

	responseDelete.assertStatus(403);
	responseDelete.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);

	responsePut = await client
		.put(`/institutions/${institution.id}`)
		.loginVia(responsibleUser, 'jwt')
		.send({ ...institution, name: 'New name institution' })
		.end();

	responsePut.assertStatus(204);

	responseDelete = await client
		.delete(`/institutions/${institution.id}`)
		.loginVia(responsibleUser, 'jwt')
		.end();

	responseDelete.assertStatus(204);
});
