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

test('GET /permissions get list of permissions', async ({ client }) => {
	await Permission.create(permission);

	const loggeduser = await User.create(user);

	const response = await client
		.get('/permissions')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([permission]);
});

test('try to access resource without authorization', async ({ client }) => {
	await Permission.create(permission);

	const response = await client.get('/permissions').end();

	response.assertStatus(401);
});
