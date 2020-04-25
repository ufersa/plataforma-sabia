const { test, trait } = use('Test/Suite')('Algolia');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Technology = use('App/Models/Technology');

trait('DatabaseTransactions');

const technologyObject = {
	title: 'test',
	description: 'description',
	initials: 'initials_test',
	logo: 'http://exampleimage.com',
};

test('algoliasearch.saveObject is called when creating a technology', async ({ assert }) => {
	const technology = await Technology.create(technologyObject);

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(AlgoliaSearch.initIndex().saveObject.withArgs(technology.toJSON()).calledOnce);
});

test('algoliasearch.deleteObject is called when destroying a technology', async ({ assert }) => {
	const technology = await Technology.create(technologyObject);
	await technology.delete();
	assert.isTrue(
		AlgoliaSearch.initIndex().deleteObject.withArgs(technology.toJSON().objectID).calledOnce,
	);
});
