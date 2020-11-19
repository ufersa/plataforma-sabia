const { test, trait } = use('Test/Suite')('Role');
const Role = use('App/Models/Role');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const role = {
	role: 'TEST_ROLE',
	description: 'Test Role',
};

const noAuthorizedRole = {
	role: 'NO_AUTHORIZED_ROLE',
	description: 'No Authorized User Role',
};

test('try to access resource without authorization', async ({ client }) => {
	await Role.create(role);

	const response = await client.get('/roles').end();

	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const { user: loggedUser } = await createUser({
		userAppend: { role: noAuthorizedRole.role },
	});

	const response = await client
		.get('/roles')
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET roles Get a list of all roles', async ({ client }) => {
	await Role.create(role);

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.get('/roles')
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([role]);
});

test('POST /roles endpoint fails when sending invalid payload', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.post('/roles')
		.header('Accept', 'application/json')
		.loginVia(loggedUser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'role',
				validation: 'required',
			},
			{
				field: 'description',
				validation: 'required',
			},
		]),
	);
});

test('POST /roles endpoint fails when sending existing role', async ({ client }) => {
	await Role.create(role);

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.post('/roles')
		.header('Accept', 'application/json')
		.loginVia(loggedUser, 'jwt')
		.send(role)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'role',
				validation: 'unique',
			},
		]),
	);
});

test('POST /roles create/save a new role.', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.post('/roles')
		.send(role)
		.loginVia(loggedUser, 'jwt')
		.end();

	const roleCreated = await Role.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(roleCreated.toJSON());
});

test('GET /roles/:id returns a single role', async ({ client }) => {
	const newRole = await Role.create(role);

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.get(`/roles/${newRole.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newRole.toJSON());
});

test('PUT /roles/:id endpoint no update role name', async ({ client, assert }) => {
	const role1 = await Role.create({
		role: 'TEST_ROLE_1',
		description: 'Test role 1',
	});
	const role2 = await Role.create({
		role: 'TEST_ROLE_2',
		description: 'Test role 2',
	});

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.put(`/roles/${role1.id}`)
		.send(role2.toJSON())
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	assert.equal(response.body.role, role1.role);
});

test('PUT /roles/:id Update role details', async ({ client, assert }) => {
	const newRole = await Role.create(role);

	const updatedRole = {
		role: 'UPDATED_TEST_ROLE',
		description: 'Test role updated',
	};

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.put(`/roles/${newRole.id}`)
		.send(updatedRole)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.equal(response.body.description, updatedRole.description);
	assert.equal(response.body.role, newRole.role);
});

test('DELETE /roles/:id Tryng to delete an inexistent role.', async ({ client }) => {
	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.delete(`/roles/999`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Role' }),
		),
	);
});

test('DELETE /roles/:id Delete a role with id.', async ({ client }) => {
	const newRole = await Role.create(role);

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.delete(`/roles/${newRole.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /roles/ Delete batch roles.', async ({ client, assert }) => {
	let list_ids = await Role.createMany([
		{
			role: 'TEST_ROLE1',
			description: 'Test Role',
		},
		{
			role: 'TEST_ROLE2',
			description: 'Test Role',
		},
		{
			role: 'TEST_ROLE3',
			description: 'Test Role',
		},
	]);

	list_ids = await list_ids.map((item) => item.id);

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.delete(`/roles?ids=${list_ids.join()}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await Role.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
