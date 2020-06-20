const { test, trait } = use('Test/Suite')('User');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Role = use('App/Models/Role');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const adminUser = {
	email: 'sabiaadminuser@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: 'ADMIN',
};

const noAuthorizedRole = {
	role: 'NO_AUTHORIZED_ROLE',
	description: 'No Authorized User Role',
};

test('/user/me endpoint works', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get('/user/me')
		.loginVia(loggeduser, 'jwt')
		.end();

	loggeduser.password = '';
	response.assertStatus(200);
	response.assertJSONSubset({ ...loggeduser.toJSON(), full_name: 'FirstName LastName' });
});

test('/user/me errors out if no jwt token provided', async ({ client }) => {
	const response = await client.get('/user/me').end();

	response.assertStatus(401);
});

test('try to access resource without authorization', async ({ client }) => {
	await User.create(user);

	const response = await client.get('/users').end();

	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const loggeduser = await User.create({ ...user, role: 'NO_AUTHORIZED_ROLE' });

	const response = await client
		.get('/users')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET users Get a list of all users', async ({ client }) => {
	const loggeduser = await User.create(adminUser);
	const response = await client
		.get('/users')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('POST /users endpoint fails when sending invalid payload', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/users')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'email',
				validation: 'required',
			},
			{
				field: 'first_name',
				validation: 'requiredWithoutAll',
			},
			{
				field: 'full_name',
				validation: 'requiredWithoutAll',
			},
			{
				field: 'password',
				validation: 'required',
			},
		]),
	);
});

test('POST /users endpoint fails when sending user with same email', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/users')
		.header('Accept', 'application/json')
		.loginVia(loggeduser, 'jwt')
		.send(adminUser)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'email',
				validation: 'unique',
			},
		]),
	);
});

test('POST /users create/save a new user.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.post('/users')
		.send(user)
		.loginVia(loggeduser, 'jwt')
		.end();

	const userCreated = await User.query()
		.with('role')
		.with('permissions')
		.where('id', response.body.id)
		.first();

	response.assertStatus(200);
	response.assertJSONSubset(userCreated.toJSON());
});

test('Creating/updating an user with permissions and roles creates/updates the user and attaches roles/permissions', async ({
	assert,
	client,
}) => {
	const loggeduser = await User.create(adminUser);

	let response = await client
		.post('/users')
		.send({ ...user, permissions: ['create-technologies', 'update-users'] })
		.loginVia(loggeduser, 'jwt')
		.end();

	const userCreated = await User.query()
		.with('role')
		.with('permissions')
		.where({ id: response.body.id })
		.first();

	let permissions = userCreated.toJSON().permissions.map(({ permission }) => permission);

	assert.include(permissions, 'create-technologies');
	assert.include(permissions, 'update-users');

	response.assertStatus(200);
	response.assertJSONSubset(userCreated.toJSON());

	response = await client
		.put(`/users/${userCreated.id}`)
		.send({ role: 'ADMIN', permissions: ['list-technologies'] })
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);

	const updatedUser = await User.query()
		.with('role')
		.with('permissions')
		.where({ id: response.body.id })
		.first();

	permissions = updatedUser.toJSON().permissions.map(({ permission }) => permission);

	assert.notInclude(permissions, 'create-technologies');
	assert.notInclude(permissions, 'update-users');

	response.assertJSONSubset(updatedUser.toJSON());
});

test('GET /users/:id returns a single user', async ({ client }) => {
	const firstUser = await User.first();

	const loggeduser = await User.create(adminUser);

	const response = await client
		.get(`/users/${firstUser.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(firstUser.toJSON());
});

test('PUT /users/:id endpoint fails when trying update with same user email', async ({
	client,
}) => {
	const loggeduser = await User.create(adminUser);

	const userInst = await User.create(user);

	const response = await client
		.put(`/users/${userInst.id}`)
		.send(user)
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'email',
				validation: 'unique',
			},
		]),
	);
});

test('PUT /users/:id Update user details', async ({ client }) => {
	const firstUser = await User.first();

	const updatedUser = {
		email: 'updateduseremail@gmail.com',
		password: '123123',
		first_name: 'FirstName',
		last_name: 'LastName',
	};

	const loggeduser = await User.create(adminUser);

	const response = await client
		.put(`/users/${firstUser.id}`)
		.send(updatedUser)
		.loginVia(loggeduser, 'jwt')
		.end();

	const upUser = await User.query()
		.with('role')
		.with('permissions')
		.where('id', response.body.id)
		.first();

	response.assertStatus(200);
	response.assertJSONSubset(upUser.toJSON());
});

test('POST users/:id/permissions Associates permissions to user', async ({ client }) => {
	const firstUser = await User.first();

	const loggeduser = await User.create(adminUser);

	const permissions = ['update-user', 'update-users', 'update-technology'];

	const response = await client
		.post(`/users/${firstUser.id}/permissions`)
		.send({ permissions })
		.loginVia(loggeduser, 'jwt')
		.end();

	const upUser = await User.query()
		.with('role')
		.with('permissions')
		.where({ id: firstUser.id })
		.first();

	response.assertStatus(200);
	response.assertJSONSubset(upUser.toJSON());
});

test('DELETE /users/:id Tryng to delete an inexistent user.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/users/999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'User' }),
		),
	);
});

test('DELETE /users/:id Deletes a user by id.', async ({ client }) => {
	const testUser = await User.create(user);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/users/${testUser.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
