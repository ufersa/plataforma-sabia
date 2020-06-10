/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database');

class HandleParam {
	/** JSDoc Block
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {Function} next next
	 */
	async handle({ request, response }, next) {
		const data = request.only(['page', 'perPage', 'order', 'orderBy']);
		const maxPerPage = 100;
		const defaultPerPage = 10;
		const defaultPage = 1;

		data.order = data.order ? data.order.toLowerCase() : '';
		data.orderBy = data.orderBy ? data.orderBy.toLowerCase() : '';

		data.perPage = data.perPage > 0 ? data.perPage : defaultPerPage;
		data.perPage = data.perPage > maxPerPage ? maxPerPage : data.perPage;

		data.page = data.page > 0 ? data.page : defaultPage;

		const resource = request.url().replace('/', '');
		const count = await Database.from(resource).count();
		const total = count[0]['count(*)'];
		const totalPages = Math.ceil(total / data.perPage);

		const order = ['asc', 'desc'];
		const orderBy = {
			technologies: ['id', 'title', 'slug', 'likes'],
			roles: ['id', 'role', 'created_at', 'updated_at'],
			users: ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'],
			taxonomies: ['id', 'taxonomy', 'created_at', 'updated_at'],
			terms: ['id', 'term', 'slug', 'created_at', 'updated_at'],
			permissions: ['id', 'permission', 'created_at', 'updated_at'],
		};

		const params = {
			page: data.page > totalPages ? totalPages : data.page,
			perPage: data.perPage,
			order: order.includes(data.order) ? data.order : order[0],
			orderBy: orderBy[resource].includes(data.orderBy) ? data.orderBy : 'id',
		};

		request.params = params;
		response.header('X-Sabia-Total', total);
		response.header('X-Sabia-TotalPages', totalPages);

		await next();
	}
}

module.exports = HandleParam;
