/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const dayjs = require('dayjs');

const Config = use('Config');
const { ttl, range } = Config.get('app.token');

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
					.subtract(ttl, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
			)
			.first();
	}

	static verifyIfTokenExists(generatedCode) {
		return this.query()
			.where({
				token: generatedCode,
			})
			.where(
				'created_at',
				'>=',
				dayjs()
					.subtract(ttl, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
			)
			.first();
	}

	static async generateUniqueTokenCode() {
		const { min, max } = range;

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const generatedCode = Math.floor(Math.random() * (max - min + 1)) + min;
			// eslint-disable-next-line no-await-in-loop
			if (!(await this.verifyIfTokenExists(generatedCode))) {
				return generatedCode;
			}
		}
	}
}

module.exports = Token;
