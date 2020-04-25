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

const user = {
	username: 'sabiatestinguser',
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
};

test('try to access resource without authorization', async ({ client }) => {
	await Role.create(role);

	const response = await client.get('/roles').end();

	response.assertStatus(401);
});

test('GET roles Get a list of all roles', async ({ client }) => {
	await Role.create(role);

	const loggeduser = await User.create(user);

	const response = await client
		.get('/roles')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([role]);
});

test('POST /roles create/save a new role.', async ({ client }) => {
	const loggeduser = await User.create(user);

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

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/roles/${newRole.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newRole.toJSON());
});

test('PUT /roles/:id Update role details', async ({ client }) => {
	const newRole = await Role.create(role);

	const updatedRole = {
		role: 'UPDATED_TEST_ROLE',
		description: 'Test role updated',
	};

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/roles/${newRole.id}`)
		.send(updatedRole)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedRole);
});

test('DELETE /roles/:id Tryng delete a inexistent role.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/roles/999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.RESOURCE_NOT_FOUND, antl('error.resource.resourceNotFound')),
	);
});

test('DELETE /roles/:id Delete a role with id.', async ({ client }) => {
	const newRole = await Role.create(role);

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/roles/${newRole.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
