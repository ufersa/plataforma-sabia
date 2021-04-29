const { test, trait } = use('Test/Suite')('User');
const Bull = use('Rocketseat/Bull');
const Role = use('App/Models/Role');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const Permission = use('App/Models/Permission');
const Service = use('App/Models/Service');
const Token = use('App/Models/Token');
const Factory = use('Factory');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const noAuthorizedRole = {
	role: 'NO_AUTHORIZED_ROLE',
	description: 'No Authorized User Role',
};

test('/user/me endpoint works', async ({ client }) => {
	const { user } = await createUser();

	const response = await client
		.get('/user/me')
		.loginVia(user, 'jwt')
		.end();

	const operations = await user.getOperations();

	response.assertStatus(200);
	response.assertJSONSubset({
		...user.toJSON(),
		full_name: 'FirstName LastName',
		operations,
	});
});

test('/user/me endpoint return user bookmarks', async ({ client }) => {
	const { user } = await createUser();

	const prepareBookmarks = {
		technology: async () => {
			const technologyIds = await Technology.ids();
			await user.technologyBookmarks().attach(technologyIds);
			return user
				.technologyBookmarks()
				.select('id')
				.fetch();
		},
		service: async () => {
			const serviceIds = await Service.ids();
			await user.serviceBookmarks().attach(serviceIds);
			return user
				.serviceBookmarks()
				.select('id')
				.fetch();
		},
	};

	const [technologyBookmarks, serviceBookmarks] = await Promise.all([
		prepareBookmarks.technology(),
		prepareBookmarks.service(),
	]);

	const response = await client
		.get('/user/me')
		.query({ bookmarks: true })
		.loginVia(user, 'jwt')
		.end();

	const operations = await user.getOperations();

	response.assertStatus(200);
	response.assertJSONSubset({
		...user.toJSON(),
		technologyBookmarks: technologyBookmarks.toJSON(),
		serviceBookmarks: serviceBookmarks.toJSON(),
		operations,
	});
});

test('/user/me errors out if no jwt token provided', async ({ client }) => {
	const response = await client.get('/user/me').end();
	response.assertStatus(401);
});

test('try to access resource without authorization', async ({ client }) => {
	const response = await client.get('/users').end();
	response.assertStatus(401);
});

test('try to access resources with no authorized user role', async ({ client }) => {
	await Role.create(noAuthorizedRole);
	const { user } = await createUser({
		append: { role: 'NO_AUTHORIZED_ROLE' },
	});

	const response = await client
		.get('/users')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET users Get a list of all users', async ({ client }) => {
	const { user } = await createUser({ append: { role: roles.ADMIN } });
	const response = await client
		.get('/users')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
});

test('POST /users endpoint fails when sending invalid payload', async ({ client }) => {
	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.post('/users')
		.header('Accept', 'application/json')
		.loginVia(user, 'jwt')
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
	const { user, userJson } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.post('/users')
		.header('Accept', 'application/json')
		.loginVia(user, 'jwt')
		.send(userJson)
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
	const { user } = await createUser({ append: { role: roles.ADMIN } });
	const userData = await Factory.model('App/Models/User').make();

	const response = await client
		.post('/users')
		.send({ ...userData.toJSON(), cpf: '24905763053', password: '123123' })
		.loginVia(user, 'jwt')
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
	const { user } = await createUser({ append: { role: roles.ADMIN } });
	const userData = await Factory.model('App/Models/User').make();
	const permissionCollection = await Permission.query()
		.whereIn('permission', ['create-technologies', 'update-users'])
		.fetch();
	const permissionsIds = permissionCollection.rows.map((permission) => permission.id);

	let response = await client
		.post('/users')
		.send({
			...userData.toJSON(),
			cpf: '24905763053',
			password: '123123',
			permissions: permissionsIds,
		})
		.loginVia(user, 'jwt')
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
		.loginVia(user, 'jwt')
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

	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.get(`/users/${firstUser.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(firstUser.toJSON());
});

test('GET /users/:id returns user with your orders', async ({ client }) => {
	const technologyPurchased = await Factory.model('App/Models/Technology').create();

	const { user: buyerUser } = await createUser();
	const { user: sellerUser } = await createUser();

	await technologyPurchased.users().attach(sellerUser.id);

	const technologyOrder = await Factory.model('App/Models/TechnologyOrder').create({
		technology_id: technologyPurchased.id,
		user_id: buyerUser.id,
	});

	const response = await client
		.get(`/users/${buyerUser.id}?embed`)
		.loginVia(buyerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ orders: [technologyOrder.toJSON()] });
});

test('PUT /users/:id endpoint admin user to try update status', async ({ client, assert }) => {
	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const { user: pendingUser } = await createUser({
		append: { status: 'pending' },
	});

	const response = await client
		.put(`/users/${pendingUser.id}`)
		.send({ ...pendingUser, status: 'verified' })
		.loginVia(user, 'jwt')
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

	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.put(`/users/${firstUser.id}`)
		.send(updatedUser)
		.loginVia(user, 'jwt')
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

	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const permissions = ['update-user', 'update-users', 'update-technology'];

	const response = await client
		.post(`/users/${firstUser.id}/permissions`)
		.send({ permissions })
		.loginVia(user, 'jwt')
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
	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.delete(`/users/999`)
		.loginVia(user, 'jwt')
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
	const { user: testUser } = await createUser();
	await testUser.areas().detach();
	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.delete(`/users/${testUser.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('PUT /user/change-password changes user password', async ({ client, assert }) => {
	await Bull.reset();

	const currentPassword = 'old_password';
	const newPassword = 'new_password';

	const { user: loggedUser } = await createUser({
		append: { status: 'verified', password: currentPassword },
	});

	const changePasswordResponse = await client
		.put('/user/change-password')
		.send({
			currentPassword,
			newPassword,
		})
		.loginVia(loggedUser, 'jwt')
		.end();

	changePasswordResponse.assertStatus(200);
	changePasswordResponse.assertJSONSubset({ success: true });

	// test that the password has been updated.
	const loginResponse = await client
		.post('/auth/login')
		.send({ email: loggedUser.email, password: newPassword })
		.end();
	loginResponse.assertStatus(200);

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(loggedUser.email, bullCall.args[1].email);
	assert.equal('emails.reset-password', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
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
	await Bull.reset();

	const user = await User.first();
	const currentEmail = user.email;
	const newEmail = 'newUnconfirmedEmail@gmail.com';
	assert.equal(user.temp_email, null);

	const response = await client
		.post('/user/change-email')
		.send({
			email: newEmail,
		})
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });

	const checkUser = await User.find(user.id);

	assert.equal(checkUser.email, currentEmail);
	assert.equal(checkUser.temp_email, newEmail);
	assert.notEqual(checkUser.email, newEmail);
	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(checkUser.temp_email, bullCall.args[1].email);
	assert.equal('emails.new-email-verification', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('POST and PUT /auth/change-email endpoint works', async ({ client, assert }) => {
	await Bull.reset();

	const loggedUser = await User.first();
	const currentEmail = loggedUser.email;
	const newEmail = 'newUnconfirmedEmail@gmail.com';
	assert.equal(loggedUser.temp_email, null);

	const response = await client
		.post('/user/change-email')
		.send({
			email: newEmail,
		})
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });

	const checkUser = await User.find(loggedUser.id);

	assert.equal(checkUser.email, currentEmail);
	assert.equal(checkUser.temp_email, newEmail);
	assert.notEqual(checkUser.email, newEmail);

	// get the last token
	const { token } = await Token.query()
		.where({ type: 'new-email', is_revoked: false })
		.last();

	// confirming new email
	const responsePUT = await client
		.put('/user/change-email')
		.send({
			email: checkUser.email,
			token,
		})
		.loginVia(checkUser, 'jwt')
		.end();

	responsePUT.assertStatus(200);
	responsePUT.assertJSONSubset({ success: true });

	const updatedUser = await User.find(checkUser.id);

	assert.equal(updatedUser.email, newEmail);
	assert.equal(updatedUser.temp_email, null);

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(updatedUser.email, bullCall.args[1].email);
	assert.equal('emails.new-email-verification', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('DELETE /users deletes users in batch.', async ({ client, assert }) => {
	const users = await Factory.model('App/Models/User').createMany(3);
	const userIds = await users.map((item) => item.id);
	const { user } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.delete(`/users?ids=${userIds.join()}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});

	const result = await User.query()
		.whereIn('id', userIds)
		.fetch();

	assert.equal(result.toJSON().length, 0);
});
