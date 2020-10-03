const { test, trait } = use('Test/Suite')('Reviewer');

const User = use('App/Models/User');
const Reviewer = use('App/Models/Reviewer');
const Taxonomy = use('App/Models/Taxonomy');
const Technology = use('App/Models/Technology');
const Revision = use('App/Models/Revision');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const { antl, errors, errorPayload, roles } = require('../../app/Utils');

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

const researcher = {
	email: 'researcher@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.RESEARCHER,
};

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 0,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 2000,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
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

test('POST revisions/:technology reviewer trying to review a technology no attributed for him.', async ({
	client,
}) => {
	const reviewerUser = await User.create(reviewer);
	const approvedReviewer = await Reviewer.create({ status: 'approved' });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);

	const response = await client
		.post(`/revisions/${pendingTechnology.id}`)
		.loginVia(reviewerUser, 'jwt')
		.send({
			description: 'Your technology was rejected',
			assessment: 'rejected',
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST revisions/:technology reviewer trying to review a technology with no allowed status.', async ({
	client,
}) => {
	const reviewerUser = await User.create(reviewer);
	const approvedReviewer = await Reviewer.create({ status: 'approved' });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);
	pendingTechnology.status = 'pending';
	await pendingTechnology.save();
	await approvedReviewer.technologies().attach([pendingTechnology.id]);

	const response = await client
		.post(`/revisions/${pendingTechnology.id}`)
		.loginVia(reviewerUser, 'jwt')
		.send({
			description: 'Your technology was rejected',
			assessment: 'rejected',
		})
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.STATUS_NO_ALLOWED_FOR_REVIEW,
			antl('error.reviewer.statusNoAllowedForReview', {
				status: pendingTechnology.status,
			}),
		),
	);
});

test('POST revisions/:technology reviewer makes a revision.', async ({ client, assert }) => {
	const reviewerUser = await User.create(reviewer);
	const researcherUser = await User.create(researcher);
	const approvedReviewer = await Reviewer.create({ status: 'approved' });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);
	await pendingTechnology.users().attach([researcherUser.id]);
	pendingTechnology.status = 'in_review';
	await pendingTechnology.save();
	await approvedReviewer.technologies().attach([pendingTechnology.id]);

	const response = await client
		.post(`/revisions/${pendingTechnology.id}`)
		.loginVia(reviewerUser, 'jwt')
		.send({
			description: 'Your technology was approved',
			assessment: 'approved',
		})
		.end();

	const revision = await Revision.findOrFail(response.body.id);
	await revision.loadMany(['technology', 'reviewer.user']);

	const reviewedTechnology = await Technology.findOrFail(pendingTechnology.id);

	assert.equal(revision.assessment, reviewedTechnology.status);

	response.assertStatus(200);
	response.body.attachment_id = null;
	response.assertJSONSubset(revision.toJSON());
});
