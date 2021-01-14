const Config = use('Adonis/Src/Config');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');

const config = Config.get('algolia');
const indexObject = AlgoliaSearch.initIndex(config.indexName);

const { saveObject, saveObjects, clearObjects, setSettings } = indexObject;

module.exports = {
	initIndex: AlgoliaSearch.initIndex,
	config,
	saveObjects,
	saveObject,
	clearObjects,
	setSettings,
};
