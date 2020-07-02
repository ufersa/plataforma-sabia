const { test, trait } = use('Test/Suite')('User Bookmark');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const otherUser = {
	email: 'sabiatestingemail2@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const adminUser = {
	email: 'sabiatestingadminemail@gmail.com',
	password: '123123',
	first_name: 'Admin',
	last_name: 'Admin',
	role: roles.ADMIN,
};

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 10,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 365,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
	status: 'DRAFT',
};

test('POST /bookmarks trying to bookmark without technologyIds.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'technologyIds',
				validation: 'required',
			},
		]),
	);
});

test('POST /bookmarks technologyIds array validation failure.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: 1 })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'technologyIds',
				validation: 'array',
			},
		]),
	);
});

test('POST /bookmarks technologyIds array with invalid number.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: ['test', 1, 2] })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'technologyIds.0',
				validation: 'number',
			},
		]),
	);
});

test('POST /bookmarks trying to bookmark with an inexistent technology id technologyIds array.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: [1, 2, 5000] })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'technologyIds.2',
				validation: 'exists',
			},
		]),
	);
});

test('POST /bookmarks bookmarks technologies.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const technologyIds = await Technology.ids();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds })
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks comum user trying to get other user bookmarks.', async ({
	client,
}) => {
	const loggeduser = await User.create(user);
	const otheruser = await User.create(otherUser);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);
	await otheruser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /user/:id/bookmarks admin user gets other user bookmarks.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);
	const otheruser = await User.create(otherUser);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);
	await otheruser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks comum user gets own bookmarks.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${loggeduser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user_bookmarks comum user trying to get all bookmarks.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get(`user_bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /user_bookmarks admin user gets all bookmarks.', async ({ client }) => {
	const loggeduser = await User.create(adminUser);

	const response = await client
		.get(`user_bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user_bookmarks admin user gets all users that bookmarks a specific technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(adminUser);
	const user1 = await User.create(user);
	const user2 = await User.create(otherUser);
	const tech1 = await Technology.create(technology);
	await user1.bookmarks().attach([tech1.id]);
	await user2.bookmarks().attach([tech1.id]);

	const response = await client
		.get(`user_bookmarks?technologyId=${tech1.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	const result = await User.query()
		.whereHas('bookmarks', (builder) => {
			builder.where({ technology_id: tech1.id });
		})
		.with('bookmarks', (builder) => {
			builder.where({ technology_id: tech1.id });
		})
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(result.toJSON());
});

test('DELETE /user/:id/bookmarks comum user trying to delete other user bookmarks.', async ({
	client,
}) => {
	const user1 = await User.create(user);
	const user2 = await User.create(otherUser);
	const technologyIds = await Technology.ids();
	await user1.bookmarks().attach(technologyIds);
	await user2.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${user2.id}/bookmarks`)
		.loginVia(user1, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /user/:id/bookmarks comum user delete your bookmarks.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${loggeduser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /user/:id/bookmarks comum user delete specific bookmark.', async ({ client }) => {
	const loggeduser = await User.create(user);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${loggeduser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: [technologyIds[0], technologyIds[1]] })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /user/:id/bookmarks admin user deletes other user bookmarks ', async ({ client }) => {
	const loggeduser = await User.create(adminUser);
	const comumuser = await User.create(user);
	const technologyIds = await Technology.ids();
	await comumuser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${comumuser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
