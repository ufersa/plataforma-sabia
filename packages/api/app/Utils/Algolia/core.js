const Config = use('Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');
const getNestedValue = require('../getNestedValue');

const initIndex = (entity) => {
	const indexName = getNestedValue(config.indexes, entity) || entity;
	return AlgoliaSearch.initIndex(indexName);
};

module.exports = {
	initIndex,
	config,
};
