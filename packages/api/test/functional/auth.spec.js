const { test, trait } = use('Test/Suite')('Auth');
trait('Test/ApiClient');
trait('DatabaseTransactions');

const User = use('App/Models/User');
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
	console.log(response);
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

	response.assertStatus(401);
	response.assertJSONSubset([
		{
			field: 'email',
		},
	]);
	assert.exists(response.body[0].message);
});

test('/auth/login endpoint fails with user that does not exist', async ({ client, assert }) => {
	const response = await client
		.post('/auth/login')
		.send(user)
		.end();

	response.assertStatus(401);
	response.assertJSONSubset([
		{
			field: 'email',
		},
	]);
	assert.exists(response.body[0].message);
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
