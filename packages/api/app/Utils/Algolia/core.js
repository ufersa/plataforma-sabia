const Config = use('Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');

const initIndex = (entity) => {
	const indexName = config.indexes[entity] || Config.indexName;
	return AlgoliaSearch.initIndex(indexName);
};

module.exports = {
	initIndex,
	config,
};
