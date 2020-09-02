const { test, trait } = use('Test/Suite')('Reviewer');

const User = use('App/Models/User');
const Reviewer = use('App/Models/Reviewer');
const Taxonomy = use('App/Models/Taxonomy');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { roles } = require('../../app/Utils');

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const admin = {
	email: 'adminreviewer@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.ADMIN,
};

const reviewer = {
	email: 'reviewer@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.REVIEWER,
};

test('GET /reviewers get list of reviewers', async ({ client, assert }) => {
	const adminUser = await User.create(admin);
	const reviewerUser = await User.create(reviewer);

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

	const response = await client
		.get('/reviewers')
		.loginVia(adminUser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 1);
});

test('GET /reviewers gets a single reviewer', async ({ client }) => {
	const adminUser = await User.create(admin);
	const reviewerUser = await User.create(reviewer);

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

	const response = await client
		.get(`/reviewers/${pendingReviewer.id}`)
		.loginVia(adminUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(pendingReviewer.toJSON());
});

test('POST /reviewers creates/saves a new reviewer.', async ({ client }) => {
	const loggeduser = await User.create(user);

	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');

	const categories = await categoryTaxonomy.terms().createMany([
		{
			term: 'Category 1',
		},
		{
			term: 'Category 2',
		},
		{
			term: 'Category 3',
		},
	]);

	const categoriesIds = categories.map((category) => category.id);

	const response = await client
		.post('/reviewers')
		.loginVia(loggeduser, 'jwt')
		.send({
			user_id: loggeduser.id,
			categories: categoriesIds,
		})
		.end();

	const reviewerCreated = await Reviewer.find(response.body.id);
	response.body.status = 'pending';

	response.assertStatus(200);
	response.assertJSONSubset(reviewerCreated.toJSON());
});

test('PUT /reviewers/:id/update-status udpates reviewer status.', async ({ client }) => {
	const adminUser = await User.create(admin);
	const reviewerUser = await User.create(reviewer);

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

	const response = await client
		.put(`/reviewers/${pendingReviewer.id}/update-status`)
		.loginVia(adminUser, 'jwt')
		.send({
			status: 'approved',
		})
		.end();

	const approvedReviewer = await Reviewer.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(approvedReviewer.toJSON());
});
