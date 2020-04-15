/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/Services/AlgoliaSearch');

class Technology extends Model {
	static boot() {
		super.boot();
		const algoliaConfig = Config.get('algolia');
		const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);

		this.addHook('afterSave', async (technology) => {
			indexObject.saveObject(technology.toJSON());
		});

		this.addHook('afterDelete', async (technology) => {
			indexObject.deleteObject(technology.toJSON().objectID);
		});
	}
	static get createdAtColumn () {
		return null;
	  }
	
	static get updatedAtColumn () {
		return null;
	}
	
	static get computed() {
		return ['objectID'];
	}

	getObjectId({ id }) {
		return `technology-${id}`;
	}
	
}

module.exports = Technology;
