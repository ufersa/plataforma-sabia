const { test, trait } = use('Test/Suite')('Location');
const Location = use('App/Models/Location');
const City = use('App/Models/City');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');
const { errorPayload } = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /locations returns all locations', async ({ client }) => {
	const response = await client.get('/locations').end();
	const locations = await Location.query()
		.limit(10)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(locations.toJSON());
});

test('GET /locations/:id returns a location', async ({ client }) => {
	const city = await City.first();
	const location = await Factory.model('App/Models/Location').create({
		city_id: city.id,
	});

	const response = await client.get(`/locations/${location.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(location.toJSON());
});

test('POST /locations trying to creat a new location with invalid city', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const locationData = await Factory.model('App/Models/Location').make({
		city_id: 999999999,
	});

	const response = await client
		.post('/locations')
		.loginVia(user, 'jwt')
		.send({
			...locationData.toJSON(),
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'city_id',
				validation: 'exists',
			},
		]),
	);
});

test('POST /locations trying to creat a new location with non unique place_id', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const city = await City.first();
	const locationWithPlaceId = await Factory.model('App/Models/Location').create({
		city_id: city.id,
	});
	const locationData = await Factory.model('App/Models/Location').make({
		place_id: locationWithPlaceId.place_id,
		city_id: city.id,
	});

	const response = await client
		.post('/locations')
		.loginVia(user, 'jwt')
		.send({
			...locationData.toJSON(),
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'place_id',
				validation: 'unique',
			},
		]),
	);
});

test('POST /locations creates a new location', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const city = await City.first();
	const locationData = await Factory.model('App/Models/Location').make({
		city_id: city.id,
	});

	const response = await client
		.post('/locations')
		.loginVia(user, 'jwt')
		.send({
			...locationData.toJSON(),
		})
		.end();

	const locationCreated = await Location.findOrFail(response.body.location.id);
	await locationCreated.load('city');

	response.assertStatus(201);
	response.assertJSONSubset({ location: { ...locationCreated.toJSON() } });
});

test('PUT /locations/:id updates a location', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const city = await City.first();
	const location = await Factory.model('App/Models/Location').create({
		city_id: city.id,
	});

	const newAdress = 'New Address, 999';

	const response = await client
		.put(`/locations/${location.id}`)
		.loginVia(user, 'jwt')
		.send({
			address: newAdress,
		})
		.end();

	const locationUpdated = await Location.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(locationUpdated.address, newAdress);
});

test('DELETE /locations/:id deletes a location', async ({ client, assert }) => {
	const user = await Factory.model('App/Models/User').create();
	const city = await City.first();
	const location = await Factory.model('App/Models/Location').create({
		city_id: city.id,
	});

	const response = await client
		.delete(`/locations/${location.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(200);

	const locationFromDatabase = await Location.query()
		.where({ id: location.id })
		.first();

	response.assertJSONSubset({ success: true });
	assert.isNull(locationFromDatabase);
});
