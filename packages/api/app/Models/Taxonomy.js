/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Taxonomy extends Model {
	terms() {
		return this.hasMany('App/Models/Term');
	}
}

module.exports = Taxonomy;
