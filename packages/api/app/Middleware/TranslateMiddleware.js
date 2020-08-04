/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { antl } = require('../Utils/localization');

class TranslateMiddleware {
	/** JSDoc Block
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {Function} next next
	 */
	async handle({ request, locale }, next) {
		request.antl = (messageId, data = {}) => {
			return antl(messageId, data, locale);
		};
		await next();
	}
}

module.exports = TranslateMiddleware;
