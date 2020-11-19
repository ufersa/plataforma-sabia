const { test, trait } = use('Test/Suite')('Technology Review');
const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const TechnologyReview = use('App/Models/TechnologyReview');
const { createUser } = require('../utils/Suts');
const { antl, errors, errorPayload, roles } = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const disclaimers = Array.from(Array(30).keys());

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

test('GET reviews Get a list of all technology reviews', async ({ client }) => {
	const response = await client.get('/reviews').end();

	const reviews = await TechnologyReview.all();

	response.assertStatus(200);
	response.assertJSONSubset(reviews.toJSON());
});

test('POST /reviews creates/saves a new technology review.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const newTechnology = await Technology.create(technology);

	const review = {
		technologyId: newTechnology.id,
		content: 'Test Review',
		rating: 1,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.post(`/reviews`)
		.loginVia(loggedUser, 'jwt')
		.send(review)
		.end();

	const technologyReviewCreated = await TechnologyReview.find(response.body.id);

	response.assertStatus(200);
	const technologyReviewCreatedJSON = technologyReviewCreated.toJSON();
	technologyReviewCreatedJSON.negative = JSON.stringify(technologyReviewCreatedJSON.negative);
	technologyReviewCreatedJSON.positive = JSON.stringify(technologyReviewCreatedJSON.positive);
	response.assertJSONSubset(technologyReviewCreatedJSON);
});

test('POST /reviews trying to create a new technology review with out of range rating.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();

	const newTechnology = await Technology.create(technology);

	const review = {
		technologyId: newTechnology.id,
		content: 'Test Review',
		rating: 10,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.post(`/reviews`)
		.loginVia(loggedUser, 'jwt')
		.send(review)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'rating',
				validation: 'range',
			},
		]),
	);
});

test('POST /reviews trying to create a new technology review with an inexistent technology.', async ({
	client,
}) => {
	const { user: loggedUser } = await createUser();

	const review = {
		technologyId: 999999,
		content: 'Test Review',
		rating: 1,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.post(`/reviews`)
		.loginVia(loggedUser, 'jwt')
		.send(review)
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Technology' }),
		),
	);
});

test('GET /reviews/:id returns a single technology review', async ({ client }) => {
	const firstReview = await TechnologyReview.first();

	const response = await client.get(`/reviews/${firstReview.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(firstReview.toJSON());
});

test('PUT /reviews trying to update review of other owner.', async ({ client }) => {
	const { user: loggedUser } = await createUser();

	const review = await TechnologyReview.first();

	const reviewData = {
		content: 'Updated Test Review',
		rating: 3,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.put(`/reviews/${review.id}`)
		.loginVia(loggedUser, 'jwt')
		.send(reviewData)
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /reviews updates technology review.', async ({ client }) => {
	const review = await TechnologyReview.first();
	const reviewOwner = await User.find(review.user_id);

	const reviewData = {
		content: 'Updated Test Review',
		rating: 3,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.put(`/reviews/${review.id}`)
		.loginVia(reviewOwner, 'jwt')
		.send({ ...reviewData, disclaimers })
		.end();

	response.assertStatus(200);
	reviewData.positive = JSON.stringify(reviewData.positive);
	reviewData.negative = JSON.stringify(reviewData.negative);
	response.assertJSONSubset(reviewData);
});

test('PUT /reviews trying to update technology review with out of range rating.', async ({
	client,
}) => {
	const review = await TechnologyReview.first();
	const reviewOwner = await User.find(review.user_id);

	const reviewData = {
		content: 'Updated Test Review',
		rating: 10,
		positive: ['test positive 1', 'test positive 2'],
		negative: ['test negative 1', 'test negative 2'],
	};

	const response = await client
		.put(`/reviews/${review.id}`)
		.loginVia(reviewOwner, 'jwt')
		.send({ ...reviewData, disclaimers })
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload('VALIDATION_ERROR', [
			{
				field: 'rating',
				validation: 'range',
			},
		]),
	);
});

test('DELETE /reviews/:id non-admin User trying to delete a technology review.', async ({
	client,
}) => {
	const review = await TechnologyReview.first();

	const { user: loggedUser } = await createUser();

	const response = await client
		.delete(`/reviews/${review.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /reviews/:id Delete a technology review by id.', async ({ client }) => {
	const review = await TechnologyReview.first();

	const { user: loggedUser } = await createUser({ userAppend: { role: roles.ADMIN } });

	const response = await client
		.delete(`/reviews/${review.id}`)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});
