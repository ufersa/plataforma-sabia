/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Term = use('App/Models/Term');

class Taxonomy extends Model {
	terms() {
		return this.hasMany('App/Models/Term');
	}

	/**
	 * Gets a taxonomy by its id or slug
	 *
	 * @param {string|number} taxonomy Taxonomy id or slug.
	 *
	 * @returns {Taxonomy}
	 */
	static getTaxonomy(taxonomy) {
		if (!Number.isNaN(parseInt(taxonomy, 10))) {
			return Taxonomy.findOrFail(taxonomy);
		}

		return this.query()
			.where('taxonomy', taxonomy.toUpperCase())
			.first();
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
