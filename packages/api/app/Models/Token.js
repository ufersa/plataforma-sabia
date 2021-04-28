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

	static getTokenObjectFor(email, token, type) {
		return this.query()
			.whereHas('user', (builder) => {
				builder.where({ email });
			})
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

	static async generateUniqueTokenCode() {
		let uniqueCode = false;
		let generatedCode = null;
		let existentCode = null;
		do {
			const minm = 100000;
			const maxm = 999999;
			generatedCode = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
			// eslint-disable-next-line no-await-in-loop
			existentCode = await this.findBy('token', generatedCode);
			if (!existentCode) uniqueCode = true;
		} while (!uniqueCode);
		return generatedCode;
	}
}

module.exports = Token;
