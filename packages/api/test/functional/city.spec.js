const { trait, test } = use('Test/Suite')('City');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /cities returns that the state param is required', async ({ client }) => {
	const response = await client.get('/cities').end();
	response.assertStatus(400);
	response.assertJSONSubset({
		error: {
			error_code: 'VALIDATION_ERROR',
			message: [
				{ message: 'The state is required.', field: 'state', validation: 'required' },
			],
		},
	});
});

test('GET /cities?state=SP returns all cities in the state of SP', async ({ client, assert }) => {
	const state = 'SP';

	const response = await client
		.get('/cities')
		.send({ state })
		.end();

	const cities = (
		await City.query()
			.where({ state_initials: state })
			.fetch()
	).toJSON();

	response.assertStatus(200);
	response.assertJSONSubset(cities);
	assert.equal(response.body[0].name, cities[0].name);
});

test('GET /cities?state=35 returns all cities in the state that have the id equal to 35', async ({
	client,
	assert,
}) => {
	const stateId = 35;

	const response = await client
		.get('/cities')
		.send({ state: stateId })
		.end();

	const cities = (
		await City.query()
			.where({ state_id: stateId })
			.fetch()
	).toJSON();

	response.assertStatus(200);
	response.assertJSONSubset(cities);
	assert.equal(response.body[0].name, cities[0].name);
});

test('GET /cities?state=RS&name=gramado returns all cities in the state of RS and with a name similar to Gramado', async ({
	client,
	assert,
}) => {
	const stateId = 'RS';
	const cityName = 'gramado';

	const response = await client
		.get('/cities')
		.send({ state: stateId, name: cityName })
		.end();

	const cities = (
		await City.query()
			.where({ state_initials: stateId })
			.where('name', 'like', `%${cityName}%`)
			.fetch()
	).toJSON();

	response.assertStatus(200);
	response.assertJSONSubset(cities);
	assert.equal(response.body[0].name, cities[0].name);
});
