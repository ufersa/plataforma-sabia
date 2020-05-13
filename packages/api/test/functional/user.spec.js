const { test, trait } = use('Test/Suite')('User');

const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
};

test('/user/me endpoint works', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get('/user/me')
		.loginVia(loggeduser, 'jwt')
		.end();

	loggeduser.password = '';
	response.assertStatus(200);
	response.assertJSONSubset(loggeduser.toJSON());
});

test('/user/me errors out if no jwt token provided', async ({ client }) => {
	const response = await client.get('/user/me').end();

	response.assertStatus(401);
});
