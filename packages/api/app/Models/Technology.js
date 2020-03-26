/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/AlgoliaSearch');

class Technology extends Model {
	static boot() {
		super.boot();
		const algoliaConfig = Config.get('algolia');
		const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);

		// eslint-disable-next-line no-unused-vars
		this.addHook('afterSave', async (technology) => {
			indexObject.saveObject(technology.toJSON());
		});

		this.addHook('afterDelete', async (technology) => {
			indexObject.deleteObjects(technology.objectID);
		});
	}

	static get computed() {
		return ['objectID'];
	}

	getObjectId({ id }) {
		return `technology-${id}`;
	}
}

module.exports = Technology;
