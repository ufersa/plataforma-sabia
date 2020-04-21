const { test, trait } = use('Test/Suite')('Permission');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

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

test('GET /permissions Get a list of all permissions.', async ({ client }) => {
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

	const permissionCreated = await Permission.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(permissionCreated.toJSON());
});

test('GET /permissions/:id returns a single permission', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/permissions/${newPermission.id}`)
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
		.put(`/permissions/${newPermission.id}`)
		.send(updatedPermission)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedPermission);
});

test('DELETE /permissions/:id Tryng delete a inexistent permission.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/permissions/1`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.RESOURCE_NOT_FOUND, antl('error.resource.resourceNotFound')),
	);
});

test('DELETE /permissions/:id Delete a permission with id.', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.delete(`/permissions/${newPermission.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
