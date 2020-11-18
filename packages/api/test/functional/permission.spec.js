const { test, trait } = use('Test/Suite')('Permission');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');

const permission = {
	permission: 'TEST_PERMISSION',
	description: 'Test Permission',
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
	await Permission.create(permission);

	const response = await client.get('/permissions').end();

	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const loggeduser = await createUser(noAuthorizedUser);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /permissions Get a list of all permissions.', async ({ client }) => {
	const loggeduser = await createUser(adminUser);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('POST /permissions endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await createUser(adminUser);

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

	const loggeduser = await createUser(adminUser);

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
	const loggeduser = await createUser(adminUser);

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

	const loggeduser = await createUser(adminUser);

	const response = await client
		.get(`/permissions/${newPermission.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newPermission.toJSON());
});

test('PUT /permissions/:id endpoint fails when trying to update with same permission name', async ({
	client,
}) => {
	await Permission.create(permission);
	const { id } = await Permission.create({
		permission: 'TEST_PERMISSION2',
		description: 'Test permission 2',
	});

	const loggeduser = await createUser(adminUser);

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

	const loggeduser = await createUser(adminUser);

	const response = await client
		.put(`/permissions/${newPermission.id}`)
		.send(updatedPermission)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedPermission);
});

test('DELETE /permissions/:id Tryng to delete an inexistent permission.', async ({ client }) => {
	const loggeduser = await createUser(adminUser);

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

	const loggeduser = await createUser(adminUser);

	const response = await client
		.delete(`/permissions/${newPermission.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /permissions/ Delete batch permissions.', async ({ client, assert }) => {
	let list_ids = await Permission.createMany([
		{
			permission: 'TEST_PERMISSION1',
			description: 'Test Permission',
		},
		{
			permission: 'TEST_PERMISSION2',
			description: 'Test Permission',
		},
		{
			permission: 'TEST_PERMISSION3',
			description: 'Test Permission',
		},
	]);

	list_ids = await list_ids.map((x) => x.id);

	const loggeduser = await createUser(adminUser);

	const response = await client
		.delete(`/permissions?ids=${list_ids.join()}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await Permission.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
