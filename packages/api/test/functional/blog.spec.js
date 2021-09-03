const { test, trait, beforeEach } = use('Test/Suite')('Blog');
const Blog = use('Blog');

trait('Test/ApiClient');

beforeEach(async () => {
	Blog.sandbox.reset();
});

test('GET /blog/posts return blog posts', async ({ client, assert }) => {
	const response = await client.get('/blog/posts').end();

	response.assertStatus(200);
	assert.isTrue(Blog.getPosts.calledOnce);
});

test('GET /blog/posts return blog posts limited by query', async ({ client, assert }) => {
	const payload = { limit: 3 };

	const response = await client
		.get('/blog/posts')
		.send(payload)
		.end();

	response.assertStatus(200);
	assert.isTrue(Blog.getPosts.withArgs({ limit: payload.limit }).calledOnce);
});
