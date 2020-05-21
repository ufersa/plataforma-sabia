/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Term = use('App/Models/Term');

class Taxonomy extends Model {
	terms() {
		return this.hasMany('App/Models/Term');
	}

	static getTaxonomy(taxonomy) {
		return this.query()
			.where('taxonomy', taxonomy)
			.first();
	}

	static async getTaxonomyTerms(taxonomySlug, parentId = null) {
		let terms = [];
		const taxonomy = await this.getTaxonomy(taxonomySlug);
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
