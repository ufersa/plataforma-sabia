const { test, trait } = use('Test/Suite')('User Bookmark');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const Service = use('App/Models/Service');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Factory = use('Factory');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const getRandomIdsFromModel = async (model = Technology, limit = 2) => {
	return model
		.query()
		.limit(limit)
		.ids();
};

test('POST /bookmarks trying to bookmark without technologyIds or serviceIds.', async ({
	client,
}) => {
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
			{
				field: 'serviceIds',
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

test('POST /bookmarks serviceIds array validation failure.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds: 1 })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'serviceIds',
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

test('POST /bookmarks serviceIds array with invalid number.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds: ['test', 1, 2] })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'serviceIds.0',
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

test('POST /bookmarks trying to bookmark with an inexistent service id serviceIds array.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds: [1, 2, 5000] })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'serviceIds.2',
				validation: 'exists',
			},
		]),
	);
});

test('POST /bookmarks bookmarks technologies.', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser();

	const technologyIds = await getRandomIdsFromModel(Technology);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds })
		.end();

	response.assertStatus(200);
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('POST /bookmarks bookmarks services.', async ({ client, assert }) => {
	const { user: loggedUser } = await createUser();

	const serviceIds = await getRandomIdsFromModel(Service);

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds })
		.end();

	response.assertStatus(200);
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('GET /user/:id/bookmarks regular user trying to get other user bookmarks.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();
	const { user: otheruser } = await createUser();

	const technologyIds = await getRandomIdsFromModel(Technology);

	await Promise.all([
		loggedUser.technologyBookmarks().attach(technologyIds),
		otheruser.technologyBookmarks().attach(technologyIds),
	]);

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

	const technologyIds = await getRandomIdsFromModel(Technology);

	await Promise.all([
		loggedUser.technologyBookmarks().attach(technologyIds),
		otheruser.technologyBookmarks().attach(technologyIds),
	]);

	const response = await client
		.get(`user/${otheruser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
});

test('GET /user/:id/bookmarks regular user gets own bookmarks.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const [technologyIds, serviceIds] = await Promise.all([
		getRandomIdsFromModel(Technology),
		getRandomIdsFromModel(Service),
	]);

	await Promise.all([
		loggedUser.technologyBookmarks().attach(technologyIds),
		loggedUser.serviceBookmarks().attach(serviceIds),
	]);

	const response = await client
		.get(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.end();

	const [userTechnologyBookmarks, userServicesBookmarks] = await Promise.all([
		loggedUser
			.technologyBookmarks()
			.with('technologyCosts')
			.with('thumbnail')
			.fetch(),
		loggedUser
			.serviceBookmarks()
			.with('thumbnail')
			.fetch(),
	]);

	response.assertStatus(200);
	response.assertJSONSubset({
		technologies: userTechnologyBookmarks.toJSON(),
		services: userServicesBookmarks.toJSON(),
	});
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
	await user1.technologyBookmarks().attach([tech1.id]);
	await user2.technologyBookmarks().attach([tech1.id]);

	const response = await client
		.get(`bookmarks?technologyId=${tech1.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	const result = await User.query()
		.with('technologyBookmarks')
		.whereHas('technologyBookmarks', (builder) => {
			builder.where({ technology_id: tech1.id });
		})
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(result.toJSON());
});

test('GET /bookmarks admin user gets all users that bookmarks a specific service.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: user1 } = await createUser();
	const { user: user2 } = await createUser();
	const serv1 = await Factory.model('App/Models/Service').create();
	await user1.serviceBookmarks().attach([serv1.id]);
	await user2.serviceBookmarks().attach([serv1.id]);

	const response = await client
		.get(`bookmarks?serviceId=${serv1.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	const result = await User.query()
		.with('serviceBookmarks')
		.whereHas('serviceBookmarks', (builder) => {
			builder.where({ service_id: serv1.id });
		})
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(result.toJSON());
});

test('DELETE /user/:id/bookmarks regular user trying to delete other user bookmarks.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();
	const { user: randomUser } = await createUser();

	const [technologyIds, serviceIds] = await Promise.all([
		getRandomIdsFromModel(Technology),
		getRandomIdsFromModel(Service),
	]);

	await Promise.all([
		randomUser.technologyBookmarks().attach(technologyIds),
		randomUser.serviceBookmarks().attach(serviceIds),
	]);

	const response = await client
		.delete(`user/${randomUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({
			technologyIds,
			serviceIds,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /user/:id/bookmarks regular user delete your bookmarks.', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const [technologyIds, serviceIds] = await Promise.all([
		getRandomIdsFromModel(Technology),
		getRandomIdsFromModel(Service),
	]);

	await Promise.all([
		loggedUser.technologyBookmarks().attach(technologyIds),
		loggedUser.serviceBookmarks().attach(serviceIds),
	]);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({
			technologyIds,
			serviceIds,
		})
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('DELETE /user/:id/bookmarks regular user delete specific bookmark.', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const technologyIds = await getRandomIdsFromModel(Technology);
	await loggedUser.technologyBookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds: [technologyIds[0], technologyIds[1]] })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('DELETE /user/:id/bookmarks admin user deletes other user bookmarks ', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: regularUser } = await createUser();

	const technologyIds = await getRandomIdsFromModel(Technology);
	await regularUser.technologyBookmarks().attach(technologyIds);

	const response = await client
		.delete(`user/${regularUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ success: true });
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('POST /bookmarks synchronizes technology likes count after the user likes', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const technologies = await Technology.query()
		.limit(2)
		.fetch();

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
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('POST /bookmarks synchronizes service likes count after the user likes', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const services = await Service.query()
		.limit(2)
		.fetch();

	const response = await client
		.post(`/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds: [services.rows[0].id, services.rows[1].id] })
		.end();

	const likesService01 = await services.rows[0].bookmarkUsers().count('* as likes');
	const likesService02 = await services.rows[1].bookmarkUsers().count('* as likes');
	const service01 = await Service.find(services.rows[0].id);
	const service02 = await Service.find(services.rows[1].id);
	assert.equal(likesService01[0].likes, service01.likes);
	assert.equal(likesService02[0].likes, service02.likes);

	response.assertStatus(200);
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('DELETE user/:id/bookmarks synchronizes technology likes count after the user remove likes', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const [firstTechnology, secondTechnology] = await Factory.model(
		'App/Models/Technology',
	).createMany(2, {
		likes: 1,
	});

	await loggedUser.technologyBookmarks().attach([firstTechnology.id, secondTechnology.id]);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ technologyIds: [firstTechnology.id, secondTechnology.id] })
		.end();

	const firstTechnologyLikesCount = (await firstTechnology.bookmarkUsers().count('* as count'))[0]
		.count;
	const secondTechnologyLikesCount = (
		await firstTechnology.bookmarkUsers().count('* as count')
	)[0].count;

	await firstTechnology.reload();
	await secondTechnology.reload();

	response.assertStatus(200);
	assert.equal(firstTechnologyLikesCount, firstTechnology.likes);
	assert.equal(secondTechnologyLikesCount, secondTechnology.likes);
	assert.equal(firstTechnology.likes, 0);
	assert.equal(secondTechnology.likes, 0);
	assert.isTrue(AlgoliaSearch.initIndex.called);
});

test('DELETE user/:id/bookmarks synchronizes service likes count after the user remove likes', async ({
	client,
	assert,
}) => {
	const { user: loggedUser } = await createUser();

	const [firstService, secondService] = await Factory.model('App/Models/Service').createMany(2, {
		likes: 1,
	});

	await loggedUser.serviceBookmarks().attach([firstService.id, secondService.id]);

	const response = await client
		.delete(`user/${loggedUser.id}/bookmarks`)
		.loginVia(loggedUser, 'jwt')
		.send({ serviceIds: [firstService.id, secondService.id] })
		.end();

	const firstServiceLikesCount = (await firstService.bookmarkUsers().count('* as count'))[0]
		.count;
	const secondServiceLikesCount = (await secondService.bookmarkUsers().count('* as count'))[0]
		.count;

	await firstService.reload();
	await secondService.reload();

	response.assertStatus(200);
	assert.equal(firstServiceLikesCount, firstService.likes);
	assert.equal(secondServiceLikesCount, secondService.likes);
	assert.equal(firstService.likes, 0);
	assert.equal(secondService.likes, 0);
	assert.isTrue(AlgoliaSearch.initIndex.called);
});
