const { test, trait } = use('Test/Suite')('User');

const { antl, errors, errorPayload } = require('../../app/Utils');

const Role = use('App/Models/Role');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const Permission = use('App/Models/Permission');
const Token = use('App/Models/Token');
const Mail = use('Mail');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	company: 'Company',
	zipcode: '9999999',
	cpf: '52100865005',
	birth_date: '1900-01-01',
	phone_number: '(99)23456789',
	lattes_id: '1234567890',
	address: 'Testing address, 99',
	address2: 'Complement 99',
	district: '99',
	city: 'Test City',
	state: 'TT',
	country: 'Fictional Country',
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

	response.assertStatus(200);
	response.assertJSONSubset({
		...loggeduser.toJSON(),
		full_name: 'FirstName LastName',
		registration_completed: true,
	});
});

test('/user/me endpoint return user bookmarks', async ({ client }) => {
	const loggeduser = await User.create(user);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);

	const bookmarks = await loggeduser
		.bookmarks()
		.select('id')
		.fetch();

	const response = await client
		.get('/user/me')
		.query({ bookmarks: '' })
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...loggeduser.toJSON(), bookmarks: bookmarks.toJSON() });
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

	const permissionCollection = await Permission.query()
		.whereIn('permission', ['create-technologies', 'update-users'])
		.fetch();
	const permissionsIds = permissionCollection.rows.map((permission) => permission.id);

	let response = await client
		.post('/users')
		.send({ ...user, permissions: permissionsIds })
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

	const list_technologies = await Permission.create({
		permission: 'list-technologies',
		description: 'Permite listar tecnologias no sistema',
	});

	response = await client
		.put(`/users/${userCreated.id}`)
		.send({ role: 'ADMIN', permissions: [list_technologies.id] })
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

test('PUT /users/:id endpoint admin user to try update status', async ({ client, assert }) => {
	const loggeduser = await User.create(adminUser);

	const userInst = await User.create({ ...user, status: 'pending' });

	const response = await client
		.put(`/users/${userInst.id}`)
		.send({ ...userInst, status: 'verified' })
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	assert.equal(response.body.status, 'verified');
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

test('PUT /user/change-password changes user password', async ({ client, assert }) => {
	Mail.fake();

	const loggeduser = await User.create({ ...user, status: 'verified' });
	const newPassword = 'new_password';

	const changePasswordResponse = await client
		.put('/user/change-password')
		.send({
			currentPassword: user.password,
			newPassword,
		})
		.loginVia(loggeduser, 'jwt')
		.end();

	changePasswordResponse.assertStatus(200);
	changePasswordResponse.assertJSONSubset({ success: true });

	// test an email was sent
	const recentEmail = Mail.pullRecent();
	assert.equal(recentEmail.message.to[0].address, loggeduser.email);

	// test that the password has been updated.
	const loginResponse = await client
		.post('/auth/login')
		.send({ email: loggeduser.email, password: newPassword })
		.end();
	loginResponse.assertStatus(200);

	Mail.restore();
});

test('POST /user/change-email failed to try to change the email to an already registered', async ({
	client,
}) => {
	const user1 = await User.first();
	const user2 = await User.last();

	const response = await client
		.post('/user/change-email')
		.send({
			email: user2.email,
			scope: 'web',
		})
		.loginVia(user1, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				message: 'The email has already been taken by someone else.',
				field: 'email',
				validation: 'unique',
			},
		]),
	);
});

test('POST /user/change-email the email does not change until the new email is confirmed', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.first();
	const currentEmail = loggeduser.email;
	const newEmail = 'newUnconfirmedEmail@gmail.com';
	assert.equal(loggeduser.temp_email, null);

	const response = await client
		.post('/user/change-email')
		.send({
			email: newEmail,
			scope: 'web',
		})
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });

	const checkUser = await User.find(loggeduser.id);

	assert.equal(checkUser.email, currentEmail);
	assert.equal(checkUser.temp_email, newEmail);
	assert.notEqual(checkUser.email, newEmail);
});

test('POST and PUT /auth/change-email endpoint works', async ({ client, assert }) => {
	Mail.fake();

	const loggeduser = await User.first();
	const currentEmail = loggeduser.email;
	const newEmail = 'newUnconfirmedEmail@gmail.com';
	assert.equal(loggeduser.temp_email, null);

	const response = await client
		.post('/user/change-email')
		.send({
			email: newEmail,
			scope: 'web',
		})
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });

	const checkUser = await User.find(loggeduser.id);

	assert.equal(checkUser.email, currentEmail);
	assert.equal(checkUser.temp_email, newEmail);
	assert.notEqual(checkUser.email, newEmail);

	// test an email was sent
	const recentEmail = Mail.pullRecent();
	assert.equal(recentEmail.message.to[0].address, newEmail);

	// get the last token
	const { token } = await Token.query()
		.where({ type: 'new-email', is_revoked: false })
		.last();

	// confirming new email
	const responsePUT = await client
		.put('/user/change-email')
		.send({
			token,
			scope: 'web',
		})
		.loginVia(checkUser, 'jwt')
		.end();

	responsePUT.assertStatus(200);
	responsePUT.assertJSONSubset({ success: true });

	const updatedUser = await User.find(checkUser.id);

	assert.equal(updatedUser.email, newEmail);
	assert.equal(updatedUser.temp_email, null);

	Mail.restore();
});

test('DELETE /users/ Delete batch users.', async ({ client, assert }) => {
	let list_ids = await User.createMany([
		{ ...user, email: 'delete_user1@test.com' },
		{ ...user, email: 'delete_user2@test.com' },
		{ ...user, email: 'delete_user3@test.com' },
	]);

	list_ids = await list_ids.map((x) => x.id);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.delete(`/users?ids=${list_ids.join()}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await User.query()
		.whereIn('id', list_ids)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
