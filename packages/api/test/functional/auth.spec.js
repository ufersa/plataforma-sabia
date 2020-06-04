const { test, trait } = use('Test/Suite')('Auth');
const Mail = use('Mail');
const User = use('App/Models/User');
const dayjs = require('dayjs');
const { antl, errors, errorPayload } = require('../../app/Utils');

trait('Test/ApiClient');
trait('DatabaseTransactions');

const Role = use('App/Models/Role');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

test('/auth/login endpoint works', async ({ client, assert }) => {
	const userDefault = await User.create({ ...user, status: 'verified' });
	const role = await Role.getDefaultUserRole();

	await role.users().save(userDefault);

	const response = await client
		.post('/auth/login')
		.send(user)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		type: 'bearer',
	});
	assert.exists(response.body.token);
});

test('/auth/login endpoint fails when user is pending', async ({ client }) => {
	const defaultUser = await User.create(user);

	const role = await Role.getDefaultUserRole();

	await role.users().save(defaultUser);

	const response = await client
		.post('/auth/login')
		.send({ ...user, status: 'pending' })
		.end();

	response.assertStatus(401);
	response.assertJSONSubset(
		errorPayload(errors.UNVERIFIED_EMAIL, antl('error.auth.unverifiedEmail')),
	);
});

test('/auth/login endpoint fails when sending invalid payload', async ({ client }) => {
	const response = await client
		.post('/auth/login')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset({
		error: { error_code: 'VALIDATION_ERROR' },
	});
});

test('/auth/login endpoint fails with user that does not exist', async ({ client }) => {
	const response = await client
		.post('/auth/login')
		.send({ email: 'maisl@mail.com', password: 'password' })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'User' }),
		),
	);
});

test('/auth/login endpoint fails with wrong password', async ({ client }) => {
	await User.create({ ...user, status: 'verified' });

	const response = await client
		.post('/auth/login')
		.send({
			...user,
			password: 'wrongpassword',
		})
		.end();

	response.assertStatus(401);
	response.assertJSONSubset(
		errorPayload(errors.INVALID_CREDENTIALS, antl('error.auth.invalidCredentials')),
	);
});

test('/auth/register endpoint fails when sending invalid payload', async ({ client }) => {
	let response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({
			email: 'invalidemail',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'email',
				validation: 'email',
			},
			{
				field: 'password',
				validation: 'required',
			},
		]),
	);

	response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({
			email: 'validemail@gmail.com',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'password',
				validation: 'required',
			},
		]),
	);
});

test('/auth/register endpoint works', async ({ client, assert }) => {
	Mail.fake();

	const response = await client
		.post('/auth/register')
		.send({ ...user, scope: 'web' })
		.end();

	response.assertStatus(200);

	assert.exists(response.body.email);
	assert.exists(response.body.password);
	assert.exists(response.body.id);
	assert.isObject(response.body.role);
	assert.equal(response.body.role.role, 'DEFAULT_USER');

	const dbUser = await User.find(response.body.id);
	assert.equal(dbUser.email, user.email);

	// test an email was sent
	const recentEmail = Mail.pullRecent();
	assert.equal(recentEmail.message.to[0].address, response.body.email);

	Mail.restore();
});

test('/auth/register and /auth/login endpoints works together', async ({ client }) => {
	Mail.fake();

	const registerResponse = await client
		.post('/auth/register')
		.send({ ...user, scope: 'web' })
		.end();

	registerResponse.assertStatus(200);

	const loginResponse = await client
		.post('/auth/login')
		.send(user)
		.end();

	loginResponse.assertStatus(401);
	loginResponse.assertJSONSubset(
		errorPayload(errors.UNVERIFIED_EMAIL, antl('error.auth.unverifiedEmail')),
	);

	Mail.restore();
});

test('/auth/forgot-password', async ({ client, assert }) => {
	Mail.fake();

	const u = await User.create(user);
	let tokens = await u.tokens().fetch();

	assert.empty(tokens.toJSON());

	const forgotPasswordResponse = await client
		.get('/auth/forgot-password')
		.send({
			email: u.email,
			scope: 'admin',
		})
		.end();

	forgotPasswordResponse.assertStatus(200);
	forgotPasswordResponse.assertJSONSubset({ success: true });

	// test an email was sent
	const recentEmail = Mail.pullRecent();
	assert.equal(recentEmail.message.to[0].address, u.email);

	// test a token was created.
	tokens = await u.tokens().fetch();
	assert.equal(tokens.toJSON().length, 1);

	Mail.restore();
});

test('/auth/forgot-password with invalid email fails', async ({ client }) => {
	Mail.fake();

	const forgotPasswordResponse = await client
		.get('/auth/forgot-password')
		.send({
			email: 'emailthatdontexist@gmail.com',
		})
		.end();

	forgotPasswordResponse.assertStatus(400);
	forgotPasswordResponse.assertJSONSubset(
		errorPayload(errors.INVALID_EMAIL, antl('error.email.invalid')),
	);

	Mail.restore();
});

test('/auth/forgot-password always invalidates previous reset-pw tokens', async ({
	client,
	assert,
}) => {
	Mail.fake();

	const u = await User.create(user);
	let tokens = await u.tokens().fetch();

	assert.empty(tokens.toJSON());

	let forgotPasswordResponse = await client
		.get('/auth/forgot-password')
		.send({
			email: u.email,
			scope: 'admin',
		})
		.end();

	forgotPasswordResponse.assertStatus(200);
	forgotPasswordResponse.assertJSONSubset({ success: true });

	forgotPasswordResponse = await client
		.get('/auth/forgot-password')
		.send({
			email: u.email,
			scope: 'admin',
		})
		.end();

	forgotPasswordResponse.assertStatus(200);
	forgotPasswordResponse.assertJSONSubset({ success: true });

	// test there's only one valid token
	tokens = await u
		.tokens()
		.where('is_revoked', false)
		.fetch();

	assert.equal(tokens.toJSON().length, 1);

	Mail.restore();
});

test('/auth/reset-password', async ({ client, assert }) => {
	Mail.fake();

	const u = await User.create({ ...user, status: 'verified' });
	const token = await u.generateToken('reset-pw');
	assert.isNotTrue(token.isRevoked());
	const password = 'new_password';

	const resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: token.token,
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(200);
	resetPasswordResponse.assertJSONSubset({ success: true });

	// test an email was sent
	const recentEmail = Mail.pullRecent();
	assert.equal(recentEmail.message.to[0].address, u.email);

	// test that the token is now revoked.
	await token.reload();
	assert.isTrue(token.isRevoked());

	// test that the password has been updated.
	const loginResponse = await client
		.post('/auth/login')
		.send({ email: u.email, password, status: 'verified' })
		.end();
	loginResponse.assertStatus(200);

	Mail.restore();
});

test('/auth/reset-password fails with invalid token', async ({ client, assert }) => {
	Mail.fake();

	const u = await User.create({ ...user, status: 'verified' });
	const t = await u.generateToken('confirm-ac');

	const password = 'new_password';

	let resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: t.token,
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(401);
	resetPasswordResponse.assertJSONSubset(
		errorPayload(errors.INVALID_TOKEN, antl('error.auth.invalidToken')),
	);

	// now try with a revoked token
	const token = await u.generateToken('reset-pw');
	await token.revoke();
	resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: token.token,
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(401);
	resetPasswordResponse.assertJSONSubset(
		errorPayload(errors.INVALID_TOKEN, antl('error.auth.invalidToken')),
	);
	// now try with a expired token
	const expiredToken = await u.generateToken('reset-pw');
	const expiredDate = dayjs()
		.subtract(25, 'hour')
		.format('YYYY-MM-DD HH:mm:ss');
	expiredToken.created_at = expiredDate;

	await expiredToken.save();

	resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: expiredToken.token,
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(401);

	// test an email was not sent
	const recentEmail = Mail.pullRecent();
	assert.isUndefined(recentEmail);

	// test that the password has been updated.
	const loginResponse = await client
		.post('/auth/login')
		.send({ email: u.email, password, status: 'verified' })
		.end();

	loginResponse.assertStatus(401);
	Mail.restore();
});
