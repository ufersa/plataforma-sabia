/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ServiceOrderReview extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	serviceOrder() {
		return this.belongsTo('App/Models/ServiceOrder');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}
}

module.exports = ServiceOrderReview;
