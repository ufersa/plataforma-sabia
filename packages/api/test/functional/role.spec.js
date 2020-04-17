const { test, trait } = use('Test/Suite')('Role');
trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const Role = use('App/Models/Role');
const User = use('App/Models/User');

const role = {
	role: 'TEST_ROLE',
	description: 'Test Role',
};

const user = {
	username: 'sabiatestinguser',
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
};

test('GET /roles get list of roles', async ({ client }) => {
	await Role.create(role);

	const loggeduser = await User.create(user);

	const response = await client
		.get('/roles')
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([role]);
});

test('try to access resource without authorization', async ({ client }) => {
	await Role.create(role);

	const response = await client.get('/roles').end();

	response.assertStatus(401);
});
