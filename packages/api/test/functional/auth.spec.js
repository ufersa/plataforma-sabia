const { test, trait } = use('Test/Suite')('Auth');
const Mail = use('Mail');
const User = use('App/Models/User');
const moment = require('moment');
const { errors } = require('../../app/Utils');

trait('Test/ApiClient');
trait('DatabaseTransactions');

const user = {
	username: 'sabiatestinguser',
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
};

test('/auth/login endpoint works', async ({ client, assert }) => {
	await User.create(user);

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

test('/auth/login endpoint fails when sending invalid payload', async ({ client, assert }) => {
	const response = await client
		.post('/auth/login')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset([
		{
			field: 'email',
			validation: 'required',
		},
		{
			field: 'password',
			validation: 'required',
		},
	]);
	assert.exists(response.body[0].message);
});

test('/auth/login endpoint fails with user that does not exist', async ({ client }) => {
	const response = await client
		.post('/auth/login')
		.send(user)
		.end();

	response.assertStatus(401);
	response.assertJSONSubset({
		error: {
			message: 'Usuário não existe ou senha está incorreta',
		},
	});
});

test('/auth/login endpoint fails with wrong password', async ({ client }) => {
	await User.create(user);

	const response = await client
		.post('/auth/login')
		.send({
			...user,
			password: 'wrongpassword',
		})
		.end();

	response.assertStatus(401);
	response.assertJSONSubset({
		error: {
			message: 'Usuário não existe ou senha está incorreta',
		},
	});
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
	response.assertJSONSubset([
		{
			field: 'email',
			validation: 'email',
		},
	]);

	response = await client
		.post('/auth/register')
		.header('Accept', 'application/json')
		.send({
			email: 'validemail@gmail.com',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset([
		{
			field: 'password',
			validation: 'required',
		},
	]);
});

test('/auth/register endpoint works', async ({ client, assert }) => {
	const response = await client
		.post('/auth/register')
		.send(user)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		username: user.username,
		email: user.email,
		password: '',
	});
	assert.exists(response.body.id);

	const dbUser = await User.find(response.body.id);
	assert.equal(dbUser.email, user.email);
	assert.equal(dbUser.username, user.username);
});

test('/auth/register and /auth/login endpoints works together', async ({ client, assert }) => {
	const registerResponse = await client
		.post('/auth/register')
		.send(user)
		.end();

	registerResponse.assertStatus(200);

	const loginResponse = await client
		.post('/auth/login')
		.send(user)
		.end();

	loginResponse.assertStatus(200);

	loginResponse.assertJSONSubset({
		type: 'bearer',
	});
	assert.exists(loginResponse.body.token);
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
	forgotPasswordResponse.assertJSONSubset({
		error_code: errors.INVALID_EMAIL,
	});

	Mail.restore();
});

test('/auth/reset-password', async ({ client, assert }) => {
	Mail.fake();

	const u = await User.create(user);
	const token = await u.generateResetPasswordToken();
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
		.send({ email: u.email, password })
		.end();

	loginResponse.assertStatus(200);

	Mail.restore();
});

test('/auth/reset-password fails with invalid token', async ({ client, assert }) => {
	Mail.fake();

	const u = await User.create(user);

	const password = 'new_password';
	let resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: 'asdasdasdasdasdasdasdasd',
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(401);
	resetPasswordResponse.assertJSONSubset({
		error_code: errors.INVALID_TOKEN,
	});

	// now try with a revoked token
	const token = await u.generateResetPasswordToken();
	await token.revoke();
	resetPasswordResponse = await client
		.post('/auth/reset-password')
		.send({
			token: token.token,
			password,
		})
		.end();

	resetPasswordResponse.assertStatus(401);
	resetPasswordResponse.assertJSONSubset({
		error_code: errors.INVALID_TOKEN,
	});
	// now try with a expired token
	const expiredToken = await u.generateResetPasswordToken();
	const expiredDate = moment()
		.subtract(25, 'hours')
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
		.send({ email: u.email, password })
		.end();

	loginResponse.assertStatus(401);

	Mail.restore();
});

test('/ endpoint fails without a logged in user', async ({ client }) => {
	const response = await client.get('/').end();
	response.assertStatus(401);
});

test('/ endpoint works with a logged in user', async ({ client }) => {
	await User.create(user);

	const response = await client
		.post('/auth/login')
		.send(user)
		.end();

	response.assertStatus(200);

	const { token } = response.body;
	const indexResponse = await client
		.get('/')
		.header('authorization', `Bearer ${token}`)
		.end();
	indexResponse.assertStatus(200);
});
