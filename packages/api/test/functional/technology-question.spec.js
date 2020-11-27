const { trait, test } = use('Test/Suite')('Technology Question');
const Factory = use('Factory');
const Technology = use('App/Models/Technology');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');
const { createUser } = require('../utils/Suts');

const Bull = use('Rocketseat/Bull');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { questionStatuses } = require('../../app/Utils');

test('GET /questions gets user question list', async ({ client }) => {
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const questions = await Factory.model('App/Models/TechnologyQuestion').createMany(5);
	await Promise.all(
		questions.map(async (question) => {
			await question.technology().associate(technology);
			await question.user().associate(asker);
		}),
	);

	const response = await client
		.get(`/questions`)
		.loginVia(owner, 'jwt')
		.end();

	const technologyQuestions = await TechnologyQuestion.query()
		.where({ technology_id: technology.id })
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(technologyQuestions.toJSON());
});

test('GET /technologies/:id/questions gets question list', async ({ client }) => {
	const technology = await Technology.first();

	const response = await client.get(`/technologies/${technology.id}/questions`).end();
	const questions = await TechnologyQuestion.query()
		.where({ technology_id: technology.id })
		.whereNot({ status: questionStatuses.DISABLED })
		.limit(10)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(questions.toJSON());
});

test('POST /technologies/:id/questions user makes a question', async ({ client, assert }) => {
	await Bull.reset();
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const question = 'Whats your favourite kind of weather?';

	const response = await client
		.post(`/technologies/${technology.id}/questions`)
		.loginVia(user, 'jwt')
		.send({
			question,
		})
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	response.assertJSONSubset({ user_id: user.id, technology_id: technology.id });
	assert.equal('add', bullCall.funcName);
	assert.equal(question, bullCall.args[1].question);
	assert.isTrue(Bull.spy.called);
});
