const { ServiceProvider } = require('@adonisjs/fold');
const fetch = require('node-fetch');

async function request(body) {
	const baseUrl = 'https://blog-api.plataformasabia.com/graphql';

	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	return response.json();
}

const blogMethods = {
	async getPosts({ start = 0, limit = 5 } = {}) {
		const response = await request({
			query: `query getPosts($start: Int!, $limit: Int!) {
						posts(sort: "published_at:desc", start: $start, limit: $limit) {
							id, title, subtitle, published_at, slug
						}
					}`,
			variables: { start, limit },
		});
		return response?.data?.posts || [];
	},
};

class BlogProvider extends ServiceProvider {
	register() {
		this.app.singleton('App/Services/Blog', () => blogMethods);
	}

	boot() {
		this.app.alias('App/Services/Blog', 'Blog');
	}
}

module.exports = BlogProvider;
