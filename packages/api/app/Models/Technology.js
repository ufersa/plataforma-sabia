/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Taxonomy = use('App/Models/Taxonomy');
const Config = use('Adonis/Src/Config');
const algoliasearch = use('App/Services/AlgoliaSearch');
const CE = require('@adonisjs/lucid/src/Exceptions');
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
				technology.slug = await createUniqueSlug(this, technology.title);
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

	/**
	 * Runs the technology query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} request The request object.
	 * @returns {object}
	 */
	static async scopeWithFilters(query, request) {
		const { params } = request;
		const filters = request.all();
		// we can reuse query scopes from the term model 😎
		if (filters.term) {
			query
				.whereHas('terms', (builder) => {
					builder.getTerm(filters.term);
				})
				.with('terms', (builder) => {
					builder.getTerm(filters.term);
				});
		}

		if (filters.taxonomy) {
			query.with('terms', (builder) => {
				builder.withFilters({ taxonomy: filters.taxonomy });
			});
		}

		if (params.embed) {
			query.includeTaxonomy();
		}

		if (filters.status) {
			const statusList = filters.status ? filters.status.split(',') : [];
			if (statusList && statusList.length) {
				query.whereIn('status', statusList);
			}
		}
	}

	static async scopeIncludeTaxonomy(query) {
		query.with('terms.taxonomy');
	}

	/**
	 * Query scope to get the technology either by id or slug
	 *
	 * @param {object} query The query object.
	 * @param {number|string} technology The technology id or slug
	 *
	 * @returns {object}
	 */
	static scopeGetTechnology(query, technology) {
		if (Number.isInteger(Number(technology))) {
			return query.where({ id: technology });
		}

		return query.where({ slug: technology });
	}

	/**
	 * Gets a technology by its id or slug
	 *
	 * @param {string|number} technology Technology id or slug.
	 * @returns {Technology}
	 */
	static async getTechnology(technology) {
		if (!Number.isNaN(parseInt(technology, 10))) {
			return Technology.findOrFail(technology);
		}

		const technologyInst = await this.query()
			.where({ slug: technology.toUpperCase() })
			.first();

		if (!technologyInst) {
			throw CE.ModelNotFoundException.raise('Technology');
		}
		return technologyInst;
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

	bookmarkUsers() {
		return this.belongsToMany('App/Models/User').pivotTable('user_bookmarks');
	}

	reviews() {
		return this.hasMany('App/Models/TechnologyReview').with('user');
	}

	technologyCosts() {
		return this.hasMany('App/Models/TechnologyCost');
	}

	thumbnail() {
		return this.belongsTo('App/Models/Upload', 'thumbnail_id');
	}

	reviewers() {
		return this.belongsToMany('App/Models/Reviewer');
	}

	revisions() {
		return this.hasMany('App/Models/Revision');
	}

	comments() {
		return this.hasMany('App/Models/TechnologyComment').with('user');
	}

	getOwner() {
		return this.users()
			.wherePivot('role', 'OWNER')
			.first();
	}

	getReviewer() {
		return this.reviewers().first();
	}

	async checkResponsible(user, role = null) {
		let responsible = this.users()
			.select('id')
			.where({ user_id: user.id });
		if (role) {
			responsible = responsible.wherePivot('role', role);
		}
		responsible = await responsible.first();
		return !!responsible;
	}

	async getTRL() {
		const stageTaxonomy = await Taxonomy.getTaxonomy('STAGE');
		const stage = await this.terms()
			.where({ taxonomy_id: stageTaxonomy.id })
			.first();
		return stage ? stage.slug.split('-')[1] : 0;
	}
}

module.exports = Technology;
