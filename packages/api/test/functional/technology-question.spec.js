const { trait, test } = use('Test/Suite')('Technology Question');
const Factory = use('Factory');
const Bull = use('Rocketseat/Bull');
const { createUser } = require('../utils/Suts');
const { antl, errors, errorPayload, questionStatuses, roles } = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /questions returns the questions of the logged in user', async ({ client }) => {
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

test('GET /questions/unanswered returns the quantity of questions unanswered of the logged in user', async ({
	client,
}) => {
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const answeredQuestions = await Factory.model('App/Models/TechnologyQuestion').createMany(5);
	const unansweredQuetions = await Factory.model('App/Models/TechnologyQuestion').createMany(5);

	await Promise.all(
		answeredQuestions.map(async (question) => {
			await question.technology().associate(technology);
			await question.user().associate(asker);
			question.status = questionStatuses.ANSWERED;
			await question.save();
		}),
	);

	await Promise.all(
		unansweredQuetions.map(async (question) => {
			await question.technology().associate(technology);
			await question.user().associate(asker);
			question.status = questionStatuses.UNANSWERED;
			await question.save();
		}),
	);

	const response = await client
		.get(`/questions/unanswered`)
		.loginVia(owner, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ total_unanswered: unansweredQuetions.length });
});

test('GET /questions returns all questions if user is an admin', async ({ client }) => {
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

test('GET /technologies/:id/questions returns technology questions', async ({ client }) => {
	const { user: owner } = await createUser();
	const { user: asker } = await createUser();

	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);

	const questions = await Factory.model('App/Models/TechnologyQuestion').createMany(5);
	await Promise.all(
		questions.map(async (question) => {
			question.status = questionStatuses.ANSWERED;
			await question.save();
			await question.technology().associate(technology);
			await question.user().associate(asker);
		}),
	);

	const response = await client.get(`/technologies/${technology.id}/questions`).end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...questions.rows });
});

test('POST /questions makes the user ask a question for a technology', async ({
	client,
	assert,
}) => {
	await Bull.reset();
	const { user } = await createUser({ append: { status: 'verified' } });
	const { user: owner } = await createUser();
	const technology = await Factory.model('App/Models/Technology').create();
	await technology.users().attach(owner.id);
	const question = 'Whats your favourite kind of weather?';

	const response = await client
		.post(`/questions`)
		.loginVia(user, 'jwt')
		.send({
			question,
			technology: technology.id,
		})
		.end();

	const bullCall = Bull.spy.calls[0];

	response.assertStatus(200);
	response.assertJSONSubset({ user_id: user.id, technology_id: technology.id });
	assert.equal('add', bullCall.funcName);
	assert.equal(question, bullCall.args[1].question);
	assert.isTrue(Bull.spy.called);
});

test('PUT /questions/:id/answer returns an error if the user is not authorized', async ({
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

test('PUT /questions/:id/answer makes the owner user answer a technology question', async ({
	client,
	assert,
}) => {
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

test('PUT /questions/:id/disable returns an error if the user is not authorized', async ({
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

test('PUT /questions/:id/answer makes an owner user to disable a question', async ({
	client,
	assert,
}) => {
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

	assert.equal(questionStatuses.DISABLED, response.body.status);
});
