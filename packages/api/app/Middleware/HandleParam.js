/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class HandleParam {
	/** JSDoc Block
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {Function} next next
	 */
	async handle({ request, response }, next) {
		const data = request.only(['page', 'perPage', 'order', 'orderBy', 'embed', 'ids', 'notIn']);

		if (data.embed === '') {
			data.embed = {
				all: true,
				ids: false,
			};
		} else if (data.embed === 'ids') {
			data.embed = {
				all: false,
				ids: true,
			};
		}

		const defaultEmbed = false;
		const embed = data.embed ? data.embed : defaultEmbed;

		/** The solution is temporary, not permanent. */
		const maxPerPage = 250;
		const defaultPerPage = 10;
		const defaultPage = 1;

		data.perPage = data.perPage > 0 ? data.perPage : defaultPerPage;
		data.perPage = data.perPage > maxPerPage ? maxPerPage : data.perPage;

		data.ids = data.ids ? data.ids.split(',').filter((id) => id > 0) : [];
		data.notIn = data.notIn ? data.notIn.split(',').filter((id) => id > 0) : [];

		const defaultListIds = false;

		const params = {
			...request.params,
			page: data.page > 0 ? data.page : defaultPage,
			perPage: data.perPage,
			order: data.order ? data.order.toLowerCase() : '',
			orderBy: data.orderBy ? data.orderBy.toLowerCase() : '',
			embed,
			ids: data.ids.length ? data.ids : defaultListIds,
			notIn: data.notIn.length ? data.notIn : defaultListIds,
		};

		request.params = params;
		await next();
		response.header('X-Sabia-Total', request.params.total || 1);
		response.header('X-Sabia-TotalPages', request.params.totalPages || 1);
	}
}

module.exports = HandleParam;
