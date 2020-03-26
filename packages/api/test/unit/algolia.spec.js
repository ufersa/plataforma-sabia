const { ioc } = use('@adonisjs/fold');
const { test, trait } = use('Test/Suite')('Algolia');
const Technology = use('App/Models/Technology');

trait('DatabaseTransactions');

test('algoliasearch.saveObject is called when creating a technology', async ({ assert }) => {
	ioc.fake('App/AlgoliaSearch', () => {
		return {
			initIndex(indexName) {
				console.log('Init index ', indexName);
			},
			saveObject(object) {
				console.log('Save ', object);
			},
		};
	});

	await Technology.create({
		name: 'test',
		description: 'description',
		image: 'http://exampleimage.com',
	});

	assert.equal(true, true);
});
