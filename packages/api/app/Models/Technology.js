/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/Services/AlgoliaSearch');
const { createUniqueSlug } = require('../Utils/slugify');

class Technology extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
		const algoliaConfig = Config.get('algolia');
		const indexObject = algoliasearch.initIndex(algoliaConfig.indexName);

		this.addHook('beforeSave', async (technology) => {
			const shouldUpdateSlug =
				!technology.$originalAttributes.title ||
				technology.title !== technology.$originalAttributes.title;

			if (shouldUpdateSlug) {
				// eslint-disable-next-line no-param-reassign
				technology.slug = await createUniqueSlug(this, technology, 'title');
			}
		});

		this.addHook('afterDelete', async (technology) => {
			try {
				indexObject.deleteObject(technology.toJSON().objectID);
			} catch (e) {
				// eslint-disable-next-line no-console
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

	getOwner() {
		return this.users()
			.wherePivot('role', 'OWNER')
			.first();
	}
}

module.exports = Technology;
