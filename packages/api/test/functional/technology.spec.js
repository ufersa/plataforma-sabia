const { test, trait } = use('Test/Suite')('Technology');

trait('Test/ApiClient');
trait('DatabaseTransactions');

// const { antl, errors, errorPayload } = require('../../app/Utils');

const Technology = use('App/Models/Technology');

const technology = {
	title: 'TEST_TITLE',
	initials: 'TEST_INITIALS',
	description: 'TEST_DESCRIPTION',
	logo: 'TEST_LOGO',
	site_url: 'TEST_URL_SITE',
	private: 1,
};

test('GET /technologies get list of technologies', async ({ client }) => {
	await Technology.create({ ...technology });

	const response = await client.get('/technologies').end();

	response.assertStatus(200);
	response.assertJSONSubset([technology]);
});

test('GET /technologies/:id returns a single technology', async ({ client }) => {
	const newTechnology = await Technology.create({ ...technology });

	const response = await client.get(`/technologies/${newTechnology.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('POST /technologies create/save a new technology.', async ({ client }) => {
	const response = await client
		.post('/technologies')
		.send(technology)
		.end();

	response.assertStatus(200);
});

test('PUT /technologies/:id Update technology details', async ({ client }) => {
	const newTechnology = await Technology.create({ ...technology });

	const updatedTechnology = {
		title: 'UPDATED_TEST_TECHNOLOGY',
		initials: 'Test Technology Update',
		description: 'Test Technology updated',
		logo: 'Test Technology Update',
	};

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});
/*
test('DELETE /technologies/:id Tryng delete a inexistent technology.', async ({ client }) => {
	const response = await client.delete(`/technologies/999`).end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(errors.RESOURCE_NOT_FOUND, antl('error.resource.resourceNotFound')),
	);
});

test('DELETE /technologies/:id Delete a technology with id.', async ({ client }) => {
	const newTechnology = await Technology.create({ ...technology });

	const response = await client.delete(`/technologies/${newTechnology.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
}); */
