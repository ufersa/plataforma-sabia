const { trait, test } = use('Test/Suite')('Technology Question');
const Factory = use('Factory');
const Technology = use('App/Models/Technology');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');
const { createUser } = require('../utils/Suts');

const Bull = use('Rocketseat/Bull');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, questionStatuses, roles } = require('../../app/Utils');

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

	response.assertStatus(200);
	response.assertJSONSubset({ ...questions.rows });
});

test('GET /questions admin gets all question list', async ({ client }) => {
	const { user: admin } = await createUser({
		append: { role: roles.REVIEWER },
	});
	const { user: owner } = await createUser();
	const { user: owner2 } = await createUser();
	const { user: asker } = await createUser();
	const { user: asker2 } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	const technology2 = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	await technology.users().attach(owner2.id);
	const questions = await Factory.model('App/Models/TechnologyQuestion').createMany(5);
	await Promise.all(
		questions.map(async (question) => {
			await question.technology().associate(technology);
			await question.user().associate(asker);
		}),
	);
	const questions2 = await Factory.model('App/Models/TechnologyQuestion').createMany(5);
	await Promise.all(
		questions.map(async (question) => {
			await question.technology().associate(technology2);
			await question.user().associate(asker2);
		}),
	);

	const response = await client
		.get(`/questions`)
		.loginVia(admin, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...questions.rows, ...questions2.rows });
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

test('PUT /questions/:id/answer unauthorized user tryning to answer a question', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const answer = 'My favourite is warm weather ';

	const question = await Factory.model('App/Models/TechnologyQuestion').create();

	await question.technology().associate(technology);
	await question.user().associate(asker);

	const response = await client
		.put(`/questions/${question.id}/answer`)
		.loginVia(user, 'jwt')
		.send({
			answer,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /questions/:id/answer owner user answer a question', async ({ client, assert }) => {
	await Bull.reset();

	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const answer = 'My favourite is warm weather ';

	const question = await Factory.model('App/Models/TechnologyQuestion').create();

	await question.technology().associate(technology);
	await question.user().associate(asker);

	const response = await client
		.put(`/questions/${question.id}/answer`)
		.loginVia(owner, 'jwt')
		.send({
			answer,
		})
		.end();

	response.assertStatus(200);

	assert.equal(response.body.answer, answer);
	assert.equal(response.body.status, questionStatuses.ANSWERED);

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(asker.email, bullCall.args[1].email);
	assert.equal(bullCall.args[1].template, 'emails.technology-question-answered');
	assert.equal(answer, bullCall.args[1].technologyQuestion.answer);
	assert.isTrue(Bull.spy.called);
});

test('PUT /questions/:id/disable unauthorized user tryning to disable a question', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);

	const question = await Factory.model('App/Models/TechnologyQuestion').create();

	await question.technology().associate(technology);
	await question.user().associate(asker);

	const response = await client
		.put(`/questions/${question.id}/disable`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /questions/:id/answer owner user disable a question', async ({ client, assert }) => {
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);

	const question = await Factory.model('App/Models/TechnologyQuestion').create();

	await question.technology().associate(technology);
	await question.user().associate(asker);

	const response = await client
		.put(`/questions/${question.id}/disable`)
		.loginVia(owner, 'jwt')
		.end();

	response.assertStatus(200);

	assert.equal(response.body.status, questionStatuses.DISABLED);
});
