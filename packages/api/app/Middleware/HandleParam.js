/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class HandleParam {
	/** JSDoc Block
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 * @param {Function} next next
	 */
	async handle({ request }, next) {
		const data = request.only(['page', 'perPage', 'order', 'orderBy']);
		const order = ['ASC', 'DESC', 'asc', 'desc'];
		const orderBy = {
			technologies: ['id', 'title', 'slug', 'likes'],
			roles: ['id', 'role', 'created_at', 'updated_at'],
			user: ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'],
			taxonomies: ['id', 'taxonomy', 'created_at', 'updated_at'],
			terms: ['id', 'term', 'slug', 'created_at', 'updated_at'],
			permissions: ['id', 'permission', 'created_at', 'updated_at'],
		};
		const resource = request.url().replace('/', '');
		const params = {
			page: data.page > 0 ? data.page : 1,
			perPage: data.perPage > 0 ? data.perPage : 10,
			order: order.includes(data.order) ? data.order : order[0],
			orderBy: orderBy[resource].includes(data.orderBy) ? data.orderBy : 'id',
		};
		request.params = params;
		await next();
	}
}

module.exports = HandleParam;
