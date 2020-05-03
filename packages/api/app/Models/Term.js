/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Term extends Model {
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
}

module.exports = Term;
