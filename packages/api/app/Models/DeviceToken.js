/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DeviceToken extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	/**
	 * A device token is always associated with a user.
	 *
	 * @returns {Model}
	 */
	user() {
		return this.belongsTo('App/Models/User');
	}
}

module.exports = DeviceToken;
