const { test, trait } = use('Test/Suite')('Service');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');

const Service = use('App/Models/Service');
const Taxonomy = use('App/Models/Taxonomy');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('POST /services creates a new Service', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });

	const serviceFactory = await Factory.model('App/Models/Service').make();

	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const response = await client
		.post('/services')
		.loginVia(user, 'jwt')
		.send({
			...serviceFactory.toJSON(),
			keywords: keywordTermsIds,
		})
		.end();

	const serviceCreated = await Service.findOrFail(response.body.id);

	response.assertStatus(200);
	assert.equal(serviceCreated.user_id, user.id);
	response.assertJSONSubset(serviceCreated.toJSON());
});
