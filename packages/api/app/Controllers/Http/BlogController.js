/** @typedef {import('@adonisjs/framework/src/Request')} Request */
// const { cache } = require('../../Utils');

const Blog = use('Blog');

class BlogController {
	constructor() {
		this.blog = Blog;
		this.cacheKeys = {
			blogPosts: 'blog-posts',
		};
		this.oneMinuteInSeconds = 60;
	}

	/**
	 * List all states.
	 * GET /posts
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 */
	async getPosts({ request }) {
		const { limit } = request.all();
		// const key = cache.generateKey(this.cacheKeys.blogPosts);

		// return cache.remember(key, this.oneMinuteInSeconds, async () => {
		return this.blog.getPosts({ limit });
		// });
	}
}

module.exports = BlogController;
