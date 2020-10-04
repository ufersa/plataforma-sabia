/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TermMeta extends Model {
	term() {
		return this.hasOne('App/Models/Term');
	}
}

module.exports = TermMeta;
