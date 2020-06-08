/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const slugify = require('slugify');
const CE = require('@adonisjs/lucid/src/Exceptions');

class Term extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');

		/**
		 * A hook to slugify term before create
		 * it to the database.
		 */
		this.addHook('beforeCreate', async (termInstance) => {
			if (!termInstance.slug) {
				// eslint-disable-next-line no-param-reassign
				termInstance.slug = slugify(termInstance.$attributes.term, { lower: true });
			}
		});
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
			.where('slug', term)
			.first();
		if (!termInst) {
			throw CE.ModelNotFoundException.raise('Term');
		}
		return termInst;
	}
}

module.exports = Term;
