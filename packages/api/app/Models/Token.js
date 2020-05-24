/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Token extends Model {
	/**
	 * A token is always associated with a user.
	 *
	 * @returns {Model}
	 */
	user() {
		return this.belongsTo('App/Models/User');
	}

	/**
	 * Revokes the token.
	 *
	 * @returns {Model}
	 */
	revoke() {
		this.is_revoked = true;
		return this.save();
	}

	/**
	 * Checks whether the token has already been reboked.
	 *
	 * @returns {boolean}
	 */
	isRevoked() {
		return Boolean(this.is_revoked);
	}
}

module.exports = Token;
