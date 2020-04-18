const { test, trait } = use('Test/Suite')('Role');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

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

test('GET roles Show a list of all roles', async ({ client }) => {
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

	response.assertStatus(200);
});

test('GET /roles/:id display a single role', async ({ client }) => {
	const newRole = await Role.create(role);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/roles/${newRole.primaryKeyValue}`)
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
		.put(`/roles/${newRole.primaryKeyValue}`)
		.send(updatedRole)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedRole);
});

test('DELETE /roles/:id Delete a role with id.', async ({ client }) => {
	const newRole = await Role.create(role);

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/roles/${newRole.primaryKeyValue}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(204);
});
