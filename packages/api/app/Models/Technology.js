/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/Services/AlgoliaSearch');
const { createUniqueSlug } = require('../Utils/slugify');

class Technology extends Model {
	static boot() {
		super.boot();
		const algoliaConfig = Config.get('algolia');
		const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);

		this.addHook('beforeSave', async (technology) => {
			// eslint-disable-next-line no-param-reassign
			technology.slug = await createUniqueSlug(this, technology, 'title');
		});

		this.addHook('afterSave', async (technology) => {
			try {
				indexObject.saveObject(technology.toJSON());
			} catch (exception) {
				console.warn('Check your algolia settings');
			}
		});

		this.addHook('afterDelete', async (technology) => {
			try {
				indexObject.deleteObject(technology.toJSON().objectID);
			} catch (exception) {
				console.warn('Check your algolia settings');
			}
		});
	}

	static get computed() {
		return ['objectID'];
	}

	getObjectId({ id }) {
		return `technology-${id}`;
	}

	terms() {
		return this.belongsToMany('App/Models/Term');
	}

	users() {
		return this.belongsToMany('App/Models/User').withPivot(['role']);
	}
}

module.exports = Technology;
