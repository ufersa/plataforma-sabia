/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ServiceOrder extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	service() {
		return this.belongsTo('App/Models/Service');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	serviceOrderReviews() {
		return this.hasMany('App/Models/ServiceOrderReview');
	}

	static get computed() {
		return ['type'];
	}

	getType() {
		return 'service';
	}
}

module.exports = ServiceOrder;
