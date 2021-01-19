const { test, trait } = use('Test/Suite')('Reviewer');
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

const technology2 = {
	title: 'Test Title 2',
	description: 'Test description 2',
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
	const { user: adminUser } = await createUser({ append: { role: roles.ADMIN } });
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

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

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

	const approvedReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
	});
	await approvedReviewer.user().associate(reviewerUser2);

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

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

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

	const pendingReviewer = await Reviewer.create();
	await pendingReviewer.user().associate(reviewerUser);

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

	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);
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

	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);
	pendingTechnology.status = technologyStatuses.PENDING;
	await pendingTechnology.save();
	await approvedReviewer.technologies().attach([pendingTechnology.id]);
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
	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewerUser);

	const pendingTechnology = await Technology.create(technology);
	await pendingTechnology.users().attach([researcherUser.id]);
	pendingTechnology.status = technologyStatuses.IN_REVIEW;
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

	const bullCall = Bull.spy.calls[0];

	assert.equal('add', bullCall.funcName);
	assert.equal(researcherUser.email, bullCall.args[1].email);
	assert.equal('emails.technology-revision', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
});

test('GET /reviewer/technologies get technologies assigned to reviewer', async ({ client }) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewerUser);

	const technologyInst1 = await Technology.create(technology);
	const technologyInst2 = await Technology.create(technology2);

	await approvedReviewer.technologies().attach([technologyInst1.id, technologyInst2.id]);

	const response = await client
		.get(`/reviewer/technologies`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([technologyInst1.toJSON(), technologyInst2.toJSON()]);
});

test('GET /reviewer/technologies get technologies assigned to reviewer filtering by technology status', async ({
	client,
}) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewerUser);

	const technologyInst1 = await Technology.create(technology);
	technologyInst1.status = technologyStatuses.IN_REVIEW;
	await technologyInst1.save();
	const technologyInst2 = await Technology.create(technology2);

	await approvedReviewer.technologies().attach([technologyInst1.id, technologyInst2.id]);

	const response = await client
		.get(`/reviewer/technologies?status=${technologyStatuses.IN_REVIEW}`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([technologyInst1.toJSON()]);
});

test('GET /revisions/:technology get reviewer revisions', async ({ client }) => {
	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER },
	});

	const approvedReviewer = await Reviewer.create({ status: technologyStatuses.IN_REVIEW });
	await approvedReviewer.user().associate(reviewerUser);

	const technologyInst = await Technology.create(technology);

	await approvedReviewer.technologies().attach([technologyInst.id]);

	const revision = await approvedReviewer.revisions().create({
		description: 'Technology Rejected',
		assessment: 'rejected',
	});
	await revision.technology().associate(technologyInst);
	await revision.reviewer().associate(approvedReviewer);

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

	const approvedReviewer = await Reviewer.create({ status: technologyStatuses.IN_REVIEW });
	await approvedReviewer.user().associate(reviewerUser);

	const technologyInst = await Technology.create(technology);

	await approvedReviewer.technologies().attach([technologyInst.id]);

	const rcRevision = await approvedReviewer.revisions().create({
		description: 'Change Test title to Title',
		assessment: 'requested_changes',
	});
	await rcRevision.technology().associate(technologyInst);
	await rcRevision.reviewer().associate(approvedReviewer);

	const rejectedRevision = await approvedReviewer.revisions().create({
		description: 'Technology Rejected',
		assessment: 'rejected',
	});
	await rejectedRevision.technology().associate(technologyInst);
	await rejectedRevision.reviewer().associate(approvedReviewer);

	const response = await client
		.get(`/revisions/${technologyInst.slug}?assessment=requested_changes`)
		.loginVia(reviewerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([rcRevision.toJSON()]);
});
