const { test, trait } = use('Test/Suite')('User Bookmark');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

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
};

test('POST /bookmarks trying to bookmark without technologyIds.', async ({ client }) => {
	const loggeduser = await createUser(user);

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
	const loggeduser = await createUser(user);

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
	const loggeduser = await createUser(user);

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
	const loggeduser = await createUser(user);

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
	const loggeduser = await createUser(user);
	const technologyIds = await Technology.ids();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds })
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks regular user trying to get other user bookmarks.', async ({
	client,
}) => {
	const loggeduser = await createUser(user);
	const otheruser = await createUser(otherUser);
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
	const loggeduser = await createUser(adminUser);
	const otheruser = await createUser(otherUser);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);
	await otheruser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks regular user gets own bookmarks.', async ({ client }) => {
	const loggeduser = await createUser(user);
	const technologyIds = await Technology.ids();
	await loggeduser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${loggeduser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /bookmarks regular user trying to get all bookmarks.', async ({ client }) => {
	const loggeduser = await createUser(user);

	const response = await client
		.get(`bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /bookmarks admin user gets all bookmarks.', async ({ client }) => {
	const loggeduser = await createUser(adminUser);

	const response = await client
		.get(`bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /bookmarks admin user gets all users that bookmarks a specific technology.', async ({
	client,
}) => {
	const loggeduser = await createUser(adminUser);
	const user1 = await createUser(user);
	const user2 = await createUser(otherUser);
	const tech1 = await Technology.create(technology);
	await user1.bookmarks().attach([tech1.id]);
	await user2.bookmarks().attach([tech1.id]);

	const response = await client
		.get(`bookmarks?technologyId=${tech1.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	const result = await User.query()
		.with('bookmarks')
		.whereHas('bookmarks', (builder) => {
			builder.where({ technology_id: tech1.id });
		})
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(result.toJSON());
});

test('DELETE /user/:id/bookmarks regular user trying to delete other user bookmarks.', async ({
	client,
}) => {
	const user1 = await createUser(user);
	const user2 = await createUser(otherUser);
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

test('DELETE /user/:id/bookmarks regular user delete your bookmarks.', async ({ client }) => {
	const loggeduser = await createUser(user);
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

test('DELETE /user/:id/bookmarks regular user delete specific bookmark.', async ({ client }) => {
	const loggeduser = await createUser(user);
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
	const loggeduser = await createUser(adminUser);
	const regularUser = await createUser(user);
	const technologyIds = await Technology.ids();
	await regularUser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${regularUser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('Syncronizes likes after user likes technologies', async ({ client, assert }) => {
	const loggeduser = await createUser(user);
	const technologies = await Technology.all();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: [technologies.rows[0].id, technologies.rows[1].id] })
		.end();

	const likesTechnology01 = await technologies.rows[0].bookmarkUsers().count('* as likes');
	const likesTechnology02 = await technologies.rows[1].bookmarkUsers().count('* as likes');
	const technology01 = await Technology.find(technologies.rows[0].id);
	const technology02 = await Technology.find(technologies.rows[1].id);
	assert.equal(likesTechnology01[0].likes, technology01.likes);
	assert.equal(likesTechnology02[0].likes, technology02.likes);

	response.assertStatus(200);
});

test('Syncronizes likes after user dislikes technologies', async ({ client, assert }) => {
	const loggeduser = await User.first();
	const technologies = await loggeduser.bookmarks().fetch();

	const response = await client
		.delete(`user/${loggeduser.id}/bookmarks`)
		.loginVia(loggeduser, 'jwt')
		.send({ technologyIds: [technologies.rows[0].id, technologies.rows[1].id] })
		.end();

	const likesTechnology01 = await technologies.rows[0].bookmarkUsers().count('* as likes');
	const likesTechnology02 = await technologies.rows[1].bookmarkUsers().count('* as likes');
	const technology01 = await Technology.find(technologies.rows[0].id);
	const technology02 = await Technology.find(technologies.rows[1].id);
	assert.equal(likesTechnology01[0].likes, technology01.likes);
	assert.equal(likesTechnology02[0].likes, technology02.likes);

	response.assertStatus(200);
});
