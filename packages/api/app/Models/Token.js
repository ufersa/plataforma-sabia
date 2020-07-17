/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const dayjs = require('dayjs');

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

	static getTokenObjectFor(token, type) {
		return this.query()
			.where({
				token,
				type,
				is_revoked: false,
			})
			.where(
				'created_at',
				'>=',
				dayjs()
					.subtract(24, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
			)
			.first();
	}
}

module.exports = Token;
