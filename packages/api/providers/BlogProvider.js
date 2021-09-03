const { ServiceProvider } = require('@adonisjs/fold');
const fetch = require('node-fetch');

const request = {
	setup: (url) => {
		this.url = url;
	},
	make: async (body) => {
		const response = await fetch(this.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		return response.json();
	},
};

const blogMethods = {
	async getPosts(params = {}) {
		const response = await request.make({
			query: `query getPosts($start: Int!, $limit: Int!) {
						posts(sort: "published_at:desc", start: $start, limit: $limit) {
							id, title, subtitle, published_at, slug
						}
					}`,
			variables: { start: Number(params?.start) || 0, limit: Number(params?.limit) || 5 },
		});
		return response?.data?.posts || [];
	},
};

class BlogProvider extends ServiceProvider {
	register() {
		this.app.singleton('App/Services/Blog', () => {
			const Config = this.app.use('Config');
			request.setup(Config.get('blog.url'));
			return blogMethods;
		});
	}

	boot() {
		this.app.alias('App/Services/Blog', 'Blog');
	}
}

module.exports = BlogProvider;
