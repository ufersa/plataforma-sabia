const Config = use('Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');

const initIndex = (entity) => {
	const index = config.indexes[entity];
	return AlgoliaSearch.initIndex(index?.indexName || index);
};

module.exports = {
	initIndex,
	config,
};
