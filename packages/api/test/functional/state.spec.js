const { trait, test } = use('Test/Suite')('State');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const State = use('App/Models/State');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /states returns all states', async ({ client, assert }) => {
	const response = await client.get('/states').end();
	const states = (
		await State.query()
			.orderBy('name')
			.fetch()
	).toJSON();

	response.assertStatus(200);
	response.assertJSONSubset(states);
	assert.equal(response.body[0].name, states[0].name);
});

test('GET /states?name=PE returns states with name or initials similar to PE', async ({
	client,
	assert,
}) => {
	const state = 'PE';

	const response = await client
		.get('/states')
		.send({ name: state })
		.end();

	const states = (
		await State.query()
			.where('name', 'LIKE', `%${state}%`)
			.orWhere('initials', 'LIKE', `%${state}%`)
			.fetch()
	).toJSON();

	response.assertStatus(200);
	response.assertJSONSubset(states);
	assert.equal(response.body[0].name, states[0].name);
});
