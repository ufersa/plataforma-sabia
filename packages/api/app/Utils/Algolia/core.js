const Config = use('Adonis/Src/Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');

const { initIndex } = AlgoliaSearch;
const { saveObject, saveObjects, clearObjects, setSettings } = initIndex(config.indexName);

module.exports = {
	initIndex,
	config,
	saveObject,
	saveObjects,
	clearObjects,
	setSettings,
};
