const { test, trait } = use('Test/Suite')('Reviewer');
const Factory = use('Factory');
const Bull = use('Rocketseat/Bull');
const Reviewer = use('App/Models/Reviewer');
const Technology = use('App/Models/Technology');
const Revision = use('App/Models/Revision');

const {
	antl,
	errors,
	errorPayload,
	roles,
	technologyStatuses,
	reviewerStatuses,
} = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const technologyDistributionJobKey = 'TechnologyDistribution-key';

test('GET /reviewers get list of reviewers', async ({ client, assert }) => {
	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	await Reviewer.create({
		user_id: reviewerUser.id,
	});

	const response = await client
		.get('/reviewers')
		.loginVia(adminUser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 1);
});

test('GET /reviewers get reviewers filtering by status', async ({ client }) => {
	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });

	const reviewerUserRole = { role: roles.REVIEWER };
	const { user: reviewerUser } = await createUser({ append: reviewerUserRole });
	const { user: reviewerUser2 } = await createUser({ append: reviewerUserRole });

	await Reviewer.create({
		user_id: reviewerUser.id,
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser2.id,
		status: reviewerStatuses.APPROVED,
	});

	const response = await client
		.get(`/reviewers?status=${reviewerStatuses.APPROVED}`)
		.loginVia(adminUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([approvedReviewer.toJSON()]);
});

test('GET /reviewers gets a single reviewer', async ({ client }) => {
	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const pendingReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
	});

	const response = await client
		.get(`/reviewers/${pendingReviewer.id}`)
		.loginVia(adminUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(pendingReviewer.toJSON());
});

test('POST /reviewers creates/saves a new reviewer.', async ({ client, assert }) => {
	const { user: loggeduser } = await createUser();

	const response = await client
		.post('/reviewers')
		.loginVia(loggeduser, 'jwt')
		.end();

	const reviewerCreated = await Reviewer.find(response.body.id);
	response.body.status = reviewerStatuses.PENDING;

	response.assertStatus(200);
	assert.equal(reviewerCreated.user_id, loggeduser.id);
	response.assertJSONSubset(reviewerCreated.toJSON());
});

test('PUT /reviewers/:id/update-status udpates reviewer status.', async ({ client, assert }) => {
	await Bull.reset();

	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const pendingReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
	});

	const response = await client
		.put(`/reviewers/${pendingReviewer.id}/update-status`)
		.loginVia(adminUser, 'jwt')
		.send({
			status: reviewerStatuses.APPROVED,
		})
		.end();

	const approvedReviewer = await Reviewer.find(response.body.id);
	const reviewerUserRole = await reviewerUser.getRole();

	const [bullMailCall, bullTechnologyDistributionCall] = Bull.spy.calls;

	response.assertStatus(200);
	response.assertJSONSubset(approvedReviewer.toJSON());
	assert.equal(approvedReviewer.status, reviewerStatuses.APPROVED);
	assert.equal(reviewerUserRole, roles.REVIEWER);
	assert.equal('add', bullMailCall.funcName);
	assert.equal(reviewerUser.email, bullMailCall.args[1].email);
	assert.equal('emails.approved-reviewer', bullMailCall.args[1].template);
	assert.equal('add', bullTechnologyDistributionCall.funcName);
	assert.equal(technologyDistributionJobKey, bullTechnologyDistributionCall.args[0]);
	assert.isTrue(Bull.spy.called);
});

test('POST revisions/:technology reviewer trying to review a technology no attributed for him.', async ({
	client,
}) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const pendingTechnology = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.PENDING,
	});
	const { user: researcherUser } = await createUser();
	await pendingTechnology.users().attach([researcherUser.id]);

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
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const pendingTechnology = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.PENDING,
	});
	const { user: researcherUser } = await createUser();
	await pendingTechnology.users().attach([researcherUser.id]);

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
	await Bull.reset();

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});
	const { user: researcherUser } = await createUser();
	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const technologyInReview = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});
	await technologyInReview.users().attach([researcherUser.id]);
	await approvedReviewer.technologies().attach([technologyInReview.id]);

	const response = await client
		.post(`/revisions/${technologyInReview.id}`)
		.loginVia(reviewerUser, 'jwt')
		.send({
			description: 'Your technology was approved',
			assessment: 'approved',
		})
		.end();

	const revision = await Revision.findOrFail(response.body.id);
	await revision.loadMany(['technology', 'reviewer.user']);

	const reviewedTechnology = await Technology.findOrFail(technologyInReview.id);

	assert.equal(revision.assessment, reviewedTechnology.status);

	response.assertStatus(200);
	response.body.attachment_id = null;
	response.assertJSONSubset(revision.toJSON());

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(researcherUser.email, bullCall.args[1].email);
	assert.equal('emails.technology-revision', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('GET /reviewer/technologies get technologies assigned to reviewer', async ({
	client,
	assert,
}) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const technologyInst1 = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});
	const technologyInst2 = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});

	await approvedReviewer.technologies().attach([technologyInst1.id, technologyInst2.id]);

	const response = await client
		.get(`/reviewer/technologies`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.equal(response.body[0].title, technologyInst1.title);
	assert.equal(response.body[1].title, technologyInst2.title);
});

test('GET /reviewer/technologies get technologies assigned to reviewer filtering by technology status', async ({
	client,
	assert,
}) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const technologyInst1 = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});
	const technologyInst2 = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.PENDING,
	});

	await approvedReviewer.technologies().attach([technologyInst1.id, technologyInst2.id]);

	const response = await client
		.get(`/reviewer/technologies?status=${technologyStatuses.IN_REVIEW}`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	assert.equal(response.body[0].title, technologyInst1.title);
});

test('GET /revisions/:technology get reviewer revisions', async ({ client }) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const technologyInst = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});

	await approvedReviewer.technologies().attach([technologyInst.id]);

	const revision = await approvedReviewer.revisions().create({
		technology_id: technologyInst.id,
		reviewer_id: approvedReviewer.id,
		description: 'Technology Rejected',
		assessment: 'rejected',
	});

	const response = await client
		.get(`/revisions/${technologyInst.slug}`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([revision.toJSON()]);
});

test('GET /revisions/:technology get reviewer revisions by assessment', async ({ client }) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({
		user_id: reviewerUser.id,
		status: reviewerStatuses.APPROVED,
	});

	const technologyInst = await Factory.model('App/Models/Technology').create({
		status: technologyStatuses.IN_REVIEW,
	});

	await approvedReviewer.technologies().attach([technologyInst.id]);

	const rcRevision = await approvedReviewer.revisions().create({
		technology_id: technologyInst.id,
		reviewer_id: approvedReviewer.id,
		description: 'Change Test title to Title',
		assessment: 'requested_changes',
	});

	const rejectedRevision = await approvedReviewer.revisions().create({
		technology_id: technologyInst.id,
		reviewer_id: approvedReviewer.id,
		description: 'Technology Rejected',
		assessment: 'rejected',
	});

	let response = await client
		.get(`/revisions/${technologyInst.slug}?assessment=requested_changes`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([rcRevision.toJSON()]);

	response = await client
		.get(`/revisions/${technologyInst.slug}?assessment=rejected`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([rejectedRevision.toJSON()]);
});
