const { trait, test, beforeEach } = use('Test/Suite')('Idea');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Idea = use('App/Models/Idea');
const Taxonomy = use('App/Models/Taxonomy');
const Factory = use('Factory');
const { errorPayload, errors, antl } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

beforeEach(async () => {
	await AlgoliaSearch.sandbox.reset();
});

test('GET /ideas returns all ideas', async ({ client }) => {
	const response = await client.get('/ideas').end();
	const ideas = await Idea.query()
		.limit(10)
		.fetch();

	response.assertStatus(200);
	response.assertJSONSubset(ideas.toJSON());
});

test('GET /ideas/:id returns an idea', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const idea = await Factory.model('App/Models/Idea').create({
		user_id: user.id,
	});

	const response = await client.get(`/ideas/${idea.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(idea.toJSON());
});

test('POST /ideas creates a new idea', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const idea = await Factory.model('App/Models/Idea').make();

	const response = await client
		.post('/ideas')
		.loginVia(user, 'jwt')
		.send({
			...idea.toJSON(),
			keywords: keywordTermsIds,
		})
		.end();

	const ideaCreated = await Idea.findOrFail(response.body.id);
	await ideaCreated.load('terms');

	response.assertStatus(200);
	response.assertJSONSubset({ ...ideaCreated.toJSON(), ...keywordTerms.rows });
	assert.equal(user.id, ideaCreated.user_id);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(AlgoliaSearch.initIndex().saveObject.called);
});

test('PUT /ideas/:id returns an error if the user is not authorized', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');

	const oldKeywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(oldKeywordTerms);
	const oldKeywordTermsIds = oldKeywordTerms.map((keyword) => keyword.id);

	const idea = await Factory.model('App/Models/Idea').create();
	await idea.terms().attach(oldKeywordTermsIds);

	const newKeywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(newKeywordTerms);
	const newKeywordTermsIds = newKeywordTerms.map((keyword) => keyword.id);

	const ideaData = await Factory.model('App/Models/Idea').make();

	const response = await client
		.put(`/ideas/${idea.id}`)
		.loginVia(user, 'jwt')
		.send({
			...ideaData.toJSON(),
			keywords: newKeywordTermsIds,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /ideas/:id updates an idea', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');

	const oldKeywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(oldKeywordTerms);
	const oldKeywordTermsIds = oldKeywordTerms.map((keyword) => keyword.id);

	const idea = await Factory.model('App/Models/Idea').create({
		user_id: user.id,
	});
	await idea.terms().attach(oldKeywordTermsIds);

	const newKeywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(newKeywordTerms);
	const newKeywordTermsIds = newKeywordTerms.map((keyword) => keyword.id);

	const ideaData = await Factory.model('App/Models/Idea').make();

	const payload = {
		...ideaData.toJSON(),
		keywords: newKeywordTermsIds,
	};

	const response = await client
		.put(`/ideas/${idea.id}`)
		.loginVia(user, 'jwt')
		.send(payload)
		.end();

	const ideaUpdated = await Idea.findOrFail(response.body.id);
	await ideaUpdated.load('terms');

	response.assertStatus(200);
	response.assertJSONSubset({ ...ideaUpdated.toJSON(), ...newKeywordTerms.rows });
	assert.equal(payload.title, ideaUpdated.title);
	assert.equal(payload.description, ideaUpdated.description);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(AlgoliaSearch.initIndex().saveObject.calledOnce);
});

test('DELETE /ideas/:id returns an error if the user is not authorized', async ({ client }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const idea = await Factory.model('App/Models/Idea').create();

	const response = await client
		.delete(`/ideas/${idea.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /ideas/:id deletes an idea', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const idea = await Factory.model('App/Models/Idea').create({
		user_id: user.id,
	});

	const response = await client
		.delete(`/ideas/${idea.id}`)
		.loginVia(user, 'jwt')
		.end();

	const ideaFromDatabase = await Idea.query()
		.where({ id: idea.id })
		.first();

	response.assertStatus(200);
	assert.isNull(ideaFromDatabase);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().deleteObject.withArgs(idea.toJSON().objectID).calledOnce,
	);
});
