/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const CE = require('@adonisjs/lucid/src/Exceptions');
const GE = require('@adonisjs/generic-exceptions');
const { createTermSlug } = require('../Utils/slugify');

class Term extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');

		/**
		 * A hook to slugify term before create
		 * it to the database.
		 */
		this.addHook('beforeCreate', async (termInstance) => {
			if (!termInstance.$attributes.slug) {
				// eslint-disable-next-line no-param-reassign
				termInstance.slug = await createTermSlug(
					termInstance.$attributes.term,
					termInstance.$attributes.taxonomy_id,
				);
			}
		});
	}

	static async create(payload) {
		let modelInstance;
		const slug = payload.slug ? payload.slug : null;
		const term = await this.findBy('slug', slug);
		if (!term) {
			modelInstance = new Term();
			modelInstance.fill(payload);
			await modelInstance.save();
		}

		return modelInstance;
	}

	static async createMany(payloadArray) {
		if (!Array.isArray(payloadArray)) {
			throw GE.InvalidArgumentException.invalidParameter(
				`${this.name}.createMany expects an array of values`,
				payloadArray,
			);
		}

		const rows = [];
		for (const payload of payloadArray) {
			// eslint-disable-next-line no-await-in-loop
			const row = await this.create(payload);
			if (row) {
				rows.push(row);
			}
		}
		return rows;
	}

	/**
	 * Every term has a taxonomy.
	 *
	 * @returns {Model} Taxonomy Model
	 */
	taxonomy() {
		return this.belongsTo('App/Models/Taxonomy');
	}

	term() {
		return this.hasOne('App/Models/Term');
	}

	technologies() {
		return this.belongsToMany('App/Models/Technology');
	}

	metas() {
		return this.hasMany('App/Models/TermMeta');
	}

	announcements() {
		return this.belongsToMany('App/Models/Announcement');
	}

	ideas() {
		return this.belongsToMany('App/Models/Idea');
	}

	/**
	 * Runs the term query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		const parent_id = Number(filters.parent);

		if (typeof filters.parent !== 'undefined' && !parent_id) {
			query.whereNull('parent_id');
		} else if (parent_id > 0) {
			query.where({ parent_id });
		}

		if (filters.taxonomy) {
			query.whereHas(
				'taxonomy',
				(builder) => {
					if (Number.isInteger(Number(filters.taxonomy))) {
						builder.where({ id: filters.taxonomy });
					} else {
						builder.where({ taxonomy: filters.taxonomy.toUpperCase() });
					}
				},
				'>=',
				1,
			);
		}

		return query;
	}

	/**
	 * Query scope to get the term either by id or slug
	 *
	 * @param {object} query The query object.
	 * @param {number|string} term The taxonomy id or slug
	 *
	 * @returns {object}
	 */
	static scopeGetTerm(query, term) {
		if (Number.isInteger(Number(term))) {
			return query.where({ id: term });
		}

		return query.where({ slug: term.toUpperCase() });
	}

	/**
	 * Gets a term by its id or slug
	 *
	 * @param {string|number} term Term id or slug.
	 *
	 * @returns {Term}
	 */
	static async getTerm(term) {
		if (!Number.isNaN(parseInt(term, 10))) {
			return Term.findOrFail(term);
		}

		const termInst = await this.query()
			.where({ slug: term })
			.first();
		if (!termInst) {
			throw CE.ModelNotFoundException.raise('Term');
		}
		return termInst;
	}
}

module.exports = Term;
