const { test, trait } = use('Test/Suite')('Permission');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const Permission = use('App/Models/Permission');
const User = use('App/Models/User');

const permission = {
	permission: 'TEST_PERMISSION',
	description: 'Test Permission',
};

const user = {
	username: 'sabiatestinguser',
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
};

test('try to access resource without authorization', async ({ client }) => {
	await Permission.create(permission);

	const response = await client.get('/permissions').end();

	response.assertStatus(401);
});

test('GET /permissions Show a list of all permissions.', async ({ client }) => {
	await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([permission]);
});

test('POST /permissions create/save a new permission.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post('/permissions')
		.send(permission)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /permissions/:id display a single permission', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/permissions/${newPermission.primaryKeyValue}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newPermission.toJSON());
});

test('PUT /permissions/:id Update permission details', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const updatedPermission = {
		permission: 'UPDATED_TEST_PERMISSION',
		description: 'Test permission updated',
	};

	const loggeduser = await User.create(user);

	const response = await client
		.put(`/permissions/${newPermission.primaryKeyValue}`)
		.send(updatedPermission)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedPermission);
});

test('DELETE /permissions/:id Delete a permission with id.', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/permissions/${newPermission.primaryKeyValue}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(204);
});
