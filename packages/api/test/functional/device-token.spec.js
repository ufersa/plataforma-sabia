const Factory = use('Factory');

const { test, trait } = use('Test/Suite')('Device Token');
const DeviceToken = use('App/Models/DeviceToken');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

test('GET /device-tokens returns user device tokens', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceTokens = await Factory.model('App/Models/DeviceToken').createMany(5, {
		user_id: user.id,
	});
	const response = await client
		.get('/device-tokens')
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...deviceTokens.rows });
});

test('GET /device-tokens/:uuid returns a single user device token by uuid', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});
	const response = await client
		.get(`/device-tokens/${deviceToken.device_uuid}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(deviceToken.toJSON());
});

test('POST /device-tokens stores user device token', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceTokenFactory = await Factory.model('App/Models/DeviceToken').make();
	const response = await client
		.post('/device-tokens')
		.loginVia(user, 'jwt')
		.send({
			...deviceTokenFactory.toJSON(),
		})
		.end();

	const deviceTokenCreated = await DeviceToken.findOrFail(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(deviceTokenCreated.toJSON());
	assert.equal(deviceTokenCreated.user_id, user.id);
});

test('POST /device-tokens returns an error if user try to store the same device uuid', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});
	const response = await client
		.post('/device-tokens')
		.loginVia(user, 'jwt')
		.send({
			device_uuid: deviceToken.device_uuid,
			device_token: deviceToken.device_token,
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'device_uuid',
				validation: 'unique',
			},
		]),
	);
});

test('PUT /device-tokens/:uuid updates user device token', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});

	const deviceTokenFactory = await Factory.model('App/Models/DeviceToken').make();

	const response = await client
		.put(`/device-tokens/${deviceToken.device_uuid}`)
		.loginVia(user, 'jwt')
		.send({
			device_token: deviceTokenFactory.device_token,
		})
		.end();

	const deviceTokenUpdated = await DeviceToken.findOrFail(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(deviceTokenUpdated.toJSON());
	assert.equal(deviceTokenUpdated.device_token, deviceTokenFactory.device_token);
});

test('PUT /device-tokens/:uuid returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});

	const deviceTokenFactory = await Factory.model('App/Models/DeviceToken').make();

	const response = await client
		.put(`/device-tokens/${deviceToken.device_uuid}`)
		.loginVia(otherUser, 'jwt')
		.send({
			device_token: deviceTokenFactory.device_token,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /device-tokens/:uuid deletes a device token', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});

	const response = await client
		.delete(`/device-tokens/${deviceToken.device_uuid}`)
		.loginVia(user, 'jwt')
		.end();

	const deviceTokenFromDatabase = await DeviceToken.query()
		.where({ device_uuid: deviceToken.device_uuid })
		.first();

	response.assertStatus(200);
	assert.isNull(deviceTokenFromDatabase);
});

test('DELETE /device-tokens/:uuid returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const deviceToken = await Factory.model('App/Models/DeviceToken').create({
		user_id: user.id,
	});

	const response = await client
		.delete(`/device-tokens/${deviceToken.device_uuid}`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.RESOURCE_DELETED_ERROR, antl('error.resource.resourceDeletedError')),
	);
});

test('DELETE /device-tokens deletes all user device tokens', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	await Factory.model('App/Models/DeviceToken').createMany(5, {
		user_id: user.id,
	});

	const response = await client
		.delete(`/device-tokens`)
		.loginVia(user, 'jwt')
		.end();

	const deviceTokensFromDatabase = await DeviceToken.query()
		.where({ user_id: user.id })
		.fetch();

	response.assertStatus(200);
	assert.equal(deviceTokensFromDatabase.toJSON().length, 0);
});

test('DELETE /device-tokens returns an error if the user is not authorized', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	await Factory.model('App/Models/DeviceToken').createMany(5, {
		user_id: user.id,
	});

	const response = await client
		.delete(`/device-tokens`)
		.loginVia(otherUser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.RESOURCE_DELETED_ERROR, antl('error.resource.resourceDeletedError')),
	);
});
