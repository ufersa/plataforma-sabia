const { test, trait } = use('Test/Suite')('User Bookmark');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const Factory = use('Factory');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('POST /bookmarks trying to bookmark without technologyIds.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'technologyIds',
				validation: 'requiredWithoutAll',
			},
		]),
	);
});

test('POST /bookmarks technologyIds array validation failure.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
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
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
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
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
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
	const { user: loggedUser } = await createUser();

	const technologyIds = await Technology.ids();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds })
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks regular user trying to get other user bookmarks.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();

	const { user: otheruser } = await createUser();
	const technologyIds = await Technology.ids();
	await loggedUser.bookmarks().attach(technologyIds);
	await otheruser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /user/:id/bookmarks admin user gets other user bookmarks.', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: otheruser } = await createUser();
	const technologyIds = await Technology.ids();
	await loggedUser.bookmarks().attach(technologyIds);
	await otheruser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks regular user gets own bookmarks.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technologyIds = await Technology.ids();
	await loggedUser.bookmarks().attach(technologyIds);

	const response = await client
		.get(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /bookmarks regular user trying to get all bookmarks.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.get(`bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /bookmarks admin user gets all bookmarks.', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });

	const response = await client
		.get(`bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /bookmarks admin user gets all users that bookmarks a specific technology.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: user1 } = await createUser();
	const { user: user2 } = await createUser();
	const tech1 = await Factory.model('App/Models/Technology').create();
	await user1.bookmarks().attach([tech1.id]);
	await user2.bookmarks().attach([tech1.id]);

	const response = await client
		.get(`bookmarks?technologyId=${tech1.id}`)
		.loginVia(loggedUser, 'jwt')
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
	const { user: user1 } = await createUser();
	const { user: user2 } = await createUser();
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
	const { user: loggedUser } = await createUser();

	const technologyIds = await Technology.ids();
	await loggedUser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({
			technologyIds,
		})
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /user/:id/bookmarks regular user delete specific bookmark.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const technologyIds = await Technology.ids();
	await loggedUser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds: [technologyIds[0], technologyIds[1]] })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /user/:id/bookmarks admin user deletes other user bookmarks ', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: regularUser } = await createUser();
	const technologyIds = await Technology.ids();
	await regularUser.bookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${regularUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({
			technologyIds,
		})
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('Syncronizes likes after user likes technologies', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser();

	const technologies = await Technology.all();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
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
	const loggedUser = await User.first();
	const technologies = await loggedUser.bookmarks().fetch();

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
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
