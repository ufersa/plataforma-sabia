const { test, trait } = use('Test/Suite')('Permission');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const User = use('App/Models/User');

const permission = {
	permission: 'TEST_PERMISSION',
	description: 'Test Permission',
};

const noAuthorizedRole = {
	role: 'NO_AUTHORIZED_ROLE',
	description: 'No Authorized User Role',
};

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

test('try to access resource without authorization', async ({ client }) => {
	await Permission.create(permission);

	const response = await client.get('/permissions').end();

	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const loggeduser = await User.create(user);
	const noAuthorizedUserRole = await Role.getRole('NO_AUTHORIZED_ROLE');
	await loggeduser.role().associate(noAuthorizedUserRole);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(401);
	response.assertJSONSubset(
		errorPayload(errors.INVALID_ACCESS, antl('error.permission.invalidAccess')),
	);
});

test('GET /permissions Get a list of all permissions.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('POST /permissions endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.post('/permissions')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'permission',
				validation: 'required',
			},
			{
				field: 'description',
				validation: 'required',
			},
		]),
	);
});

test('POST /permissions endpoint fails when sending existing permission', async ({ client }) => {
	await Permission.create(permission);

	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.post('/permissions')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send(permission)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'permission',
				validation: 'unique',
			},
		]),
	);
});

test('POST /permissions create/save a new permission.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

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
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.get(`/permissions/${newPermission.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([newPermission.toJSON()]);
});

test('PUT /permissions/:id endpoint fails when trying to update with same permission name', async ({
	client,
}) => {
	await Permission.create(permission);
	const { id } = await Permission.create({
		permission: 'TEST_PERMISSION2',
		description: 'Test permission 2',
	});

	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.put(`/permissions/${id}`)
		.send(permission)
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'permission',
				validation: 'unique',
			},
		]),
	);
});

test('PUT /permissions/:id Update permission details', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const updatedPermission = {
		permission: 'UPDATED_TEST_PERMISSION',
		description: 'Test permission updated',
	};

	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.put(`/permissions/${newPermission.id}`)
		.send(updatedPermission)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedPermission);
});

test('DELETE /permissions/:id Tryng to delete an inexistent permission.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.delete(`/permissions/9999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Permission' }),
		),
	);
});

test('DELETE /permissions/:id Delete a permission with id.', async ({ client }) => {
	const newPermission = await Permission.create(permission);

	const loggeduser = await User.create(user);
	const AdminRole = await Role.getRole('ADMIN');
	await loggeduser.role().associate(AdminRole);

	const response = await client
		.delete(`/permissions/${newPermission.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
