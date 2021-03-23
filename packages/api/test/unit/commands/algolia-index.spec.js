const { test } = use('Test/Suite')('AlgoliaIndex');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const AlgoliaIndex = require('../../../app/Commands/AlgoliaIndex');

/**
 * Total number of all indexes started during the command execution.
 * Eg: technology, ideas, services, etc
 */
const TOTAL_INDEXES = 4;

const sut = async () => {
	const instance = new AlgoliaIndex();
	return instance.handle(null, {
		log: false,
		override: true,
		settings: true,
	});
};

test('', async ({ assert }) => {
	const result = await sut();

	assert.equal(AlgoliaSearch.initIndex.callCount, TOTAL_INDEXES);
	assert.equal(AlgoliaSearch.initIndex().clearObjects.callCount, TOTAL_INDEXES);

	assert.equal(result.oi, true);
});
