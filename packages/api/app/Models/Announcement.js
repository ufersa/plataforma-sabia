/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Announcement extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	institution() {
		return this.belongsTo('App/Models/Institution');
	}

	terms() {
		return this.belongsToMany('App/Models/Term');
	}
}

module.exports = Announcement;
