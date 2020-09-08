const { test, trait } = use('Test/Suite')('Role');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Role = use('App/Models/Role');
const User = use('App/Models/User');

const role = {
	role: 'TEST_ROLE',
	description: 'Test Role',
};

const noAuthorizedRole = {
	role: 'NO_AUTHORIZED_ROLE',
	description: 'No Authorized User Role',
};

const noAuthorizedUser = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: 'NO_AUTHORIZED_ROLE',
};

const adminUser = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: 'ADMIN',
};

test('try to access resource without authorization', async ({ client }) => {
	await Role.create(role);

	const response = await client.get('/roles').end();

	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const loggeduser = await User.create(noAuthorizedUser);

	const response = await client
		.get('/roles')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET roles Get a list of all roles', async ({ client }) => {
	await Role.create(role);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.get('/roles')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([role]);
});

test('POST /roles endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/roles')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/roles')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
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
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/roles')
		.send(role)
		.loginVia(loggeduser, 'jwt')
		.end();

	const roleCreated = await Role.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(roleCreated.toJSON());
});

test('GET /roles/:id returns a single role', async ({ client }) => {
	const newRole = await Role.create(role);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.get(`/roles/${newRole.id}`)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(adminUser);

	const response = await client
		.put(`/roles/${role1.id}`)
		.send(role2.toJSON())
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(adminUser);

	const response = await client
		.put(`/roles/${newRole.id}`)
		.send(updatedRole)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.equal(response.body.description, updatedRole.description);
	assert.equal(response.body.role, newRole.role);
});

test('DELETE /roles/:id Tryng to delete an inexistent role.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/roles/999`)
		.loginVia(loggeduser, 'jwt')
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

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/roles/${newRole.id}`)
		.loginVia(loggeduser, 'jwt')
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

	list_ids = await list_ids.map((x) => {
		return x.id;
	});

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/roles?ids=${list_ids.join()}`)
		.loginVia(loggeduser, 'jwt')
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
