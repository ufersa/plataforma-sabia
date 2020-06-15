/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Term = use('App/Models/Term');
const CE = require('@adonisjs/lucid/src/Exceptions');

class Taxonomy extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	terms() {
		return this.hasMany('App/Models/Term');
	}

	/**
	 * Runs the taxonomy query with the provided filters.
	 *
	 * @param {object} query The query object.
	 * @param {object} filters The query filters
	 *
	 * @returns {object}
	 */
	static scopeWithFilters(query, filters) {
		const parent_id = Number(filters.parent);

		if (typeof filters.parent !== 'undefined' && !parent_id) {
			query.with('terms', (builder) => {
				builder.whereNull('parent_id');
			});
		} else if (parent_id > 0) {
			query.with('terms', (builder) => {
				builder.where({ parent_id });
			});
		}

		return query;
	}

	/**
	 * Query scope to get the taxonomy either by id or slug
	 *
	 * @param {object} query The query object.
	 * @param {number|string} taxonomy The taxonomy id or slug
	 *
	 * @returns {object}
	 */
	static scopeGetTaxonomy(query, taxonomy) {
		if (Number.isInteger(Number(taxonomy))) {
			return query.where({ id: taxonomy });
		}

		return query.where({ taxonomy: taxonomy.toUpperCase() });
	}

	/**
	 * Gets a taxonomy by its id or slug
	 *
	 * @param {string|number} taxonomy Taxonomy id or slug.
	 *
	 * @returns {Taxonomy}
	 */
	static async getTaxonomy(taxonomy) {
		if (!Number.isNaN(parseInt(taxonomy, 10))) {
			return Taxonomy.findOrFail(taxonomy);
		}

		const taxonomyInst = await this.query()
			.where({ taxonomy: taxonomy.toUpperCase() })
			.first();

		if (!taxonomyInst) {
			throw CE.ModelNotFoundException.raise('Taxonomy');
		}
		return taxonomyInst;
	}

	static async getTaxonomyTerms(tax, parentId = null) {
		let terms = [];
		const taxonomy = await this.getTaxonomy(tax);
		if (taxonomy) {
			terms = await Term.query()
				.where('taxonomy_id', taxonomy.id)
				.where('parent_id', parentId)
				.fetch();
		}
		return terms;
	}
}

module.exports = Taxonomy;
