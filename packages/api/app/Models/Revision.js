/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Revision extends Model {
	reviewer() {
		return this.belongsTo('App/Models/Reviewer');
	}

	technology() {
		return this.belongsTo('App/Models/Technology');
	}

	attachment() {
		return this.belongsTo('App/Models/Upload', 'attachment_id');
	}
}

module.exports = Revision;
