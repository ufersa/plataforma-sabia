/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Taxonomy extends Model {
	terms() {
		return this.hasMany('App/Models/Term');
	}

	static getTaxonomy(taxonomy) {
		return this.query()
			.where('taxonomy', taxonomy)
			.first();
	}
}

module.exports = Taxonomy;
