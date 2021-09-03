/** @typedef {import('@adonisjs/framework/src/Request')} Request */
const Blog = use('Blog');
const { cache } = require('../../Utils');

class BlogController {
	constructor() {
		this.blog = Blog;
		this.cache = cache;
		this.cacheKeys = {
			blogPosts: 'blog:posts',
		};
		this.allowedFilters = ['limit'];
		this.oneMinuteInSeconds = 60;
	}

	/**
	 * List all blog posts.
	 * GET /blog/posts
	 *
	 * @param {object} ctx The content of the request
	 * @param {Request} ctx.request The HTTP request
	 */
	async getPosts({ request }) {
		const filters = request.only(this.allowedFilters);
		const key = this.cache.generateKey(this.cacheKeys.blogPosts, filters);

		return this.cache.remember(key, this.oneMinuteInSeconds, async () => {
			return this.blog.getPosts(filters);
		});
	}
}

module.exports = BlogController;
