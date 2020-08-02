/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Antl = use('Antl');

class TranslateMiddleware {
	/** JSDoc Block
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {Function} next next
	 */
	async handle({ request, locale }, next) {
		const translate = (messageId, data = {}) => {
			return Antl.forLocale(locale).formatMessage(messageId, data);
		};
		request.antl = translate;
		await next();
	}
}

module.exports = TranslateMiddleware;
