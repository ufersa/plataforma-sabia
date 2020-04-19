/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Token extends Model {
	user() {
		return this.belongsTo('App/Models/User');
	}

	revoke() {
		this.is_revoked = true;
		return this.save();
	}

	isRevoked() {
		return Boolean(this.is_revoked);
	}
}

module.exports = Token;
