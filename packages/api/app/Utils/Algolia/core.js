const Config = use('Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');

const initIndex = (entity) => {
	const indexName = config.indexes[entity] || entity;
	return AlgoliaSearch.initIndex(indexName);
};

module.exports = {
	initIndex,
	config,
};
