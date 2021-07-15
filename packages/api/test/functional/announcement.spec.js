const { trait, test } = use('Test/Suite')('Announcement');
const Factory = use('Factory');
const Bull = use('Rocketseat/Bull');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Announcement = use('App/Models/Announcement');
const Taxonomy = use('App/Models/Taxonomy');
const { errorPayload, errors, antl, announcementStatuses, roles } = require('../../app/Utils');
const { createUser } = require('../utils/Suts');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /announcements returns only published announcements', async ({ client }) => {
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();
	const publishedAnnouncements = await Factory.model('App/Models/Announcement').createMany(5, {
		status: announcementStatuses.PUBLISHED,
		user_id: user.id,
		institution_id: institution.id,
	});

	await Factory.model('App/Models/Announcement').createMany(5);

	const response = await client.get('/announcements').end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...publishedAnnouncements.rows });
});

test('GET /announcements logged as admin returns all announcements', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: roles.ADMIN } });
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();
	const publishedAnnouncements = await Factory.model('App/Models/Announcement').createMany(5, {
		status: announcementStatuses.PUBLISHED,
		user_id: user.id,
		institution_id: institution.id,
	});
	const pendingAnnouncements = await Factory.model('App/Models/Announcement').createMany(5);

	const response = await client
		.get('/announcements')
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({ ...publishedAnnouncements.rows, ...pendingAnnouncements.rows });
});

test('GET /announcements/:id returns only published announcements if no logged user', async ({
	client,
}) => {
	const user = await Factory.model('App/Models/User').create();
	const institution = await Factory.model('App/Models/Institution').create();
	const publishedAnnouncement = await Factory.model('App/Models/Announcement').create({
		status: announcementStatuses.PUBLISHED,
		user_id: user.id,
		institution_id: institution.id,
	});

	const pendingdAnnouncement = await Factory.model('App/Models/Announcement').create({
		user_id: user.id,
		institution_id: institution.id,
	});

	const response = await client.get(`/announcements/${publishedAnnouncement.id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(publishedAnnouncement.toJSON());

	const response2 = await client.get(`/announcements/${pendingdAnnouncement.id}`).end();
	response2.assertStatus(400);
	response2.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Announcement' }),
		),
	);
});

test('GET /announcements/:id returns announcement if logged user is owner, otherwise only published', async ({
	client,
}) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const institution = await Factory.model('App/Models/Institution').create();

	const pendingdAnnouncement = await Factory.model('App/Models/Announcement').create({
		user_id: ownerUser.id,
		institution_id: institution.id,
	});

	const response = await client
		.get(`/announcements/${pendingdAnnouncement.id}`)
		.loginVia(ownerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(pendingdAnnouncement.toJSON());

	const response2 = await client
		.get(`/announcements/${pendingdAnnouncement.id}`)
		.loginVia(otherUser, 'jwt')
		.end();
	response2.assertStatus(400);
	response2.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Announcement' }),
		),
	);
});

test('POST /announcements creates a new Announcement', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
	const targetAudienceTermsIds = targetAudienceTerms.rows.map(
		(targetAudience) => targetAudience.id,
	);

	const institution = await Factory.model('App/Models/Institution').create();
	const announcementFactory = await Factory.model('App/Models/Announcement').make({
		institution_id: institution.id,
	});

	const response = await client
		.post('/announcements')
		.loginVia(user, 'jwt')
		.send({
			...announcementFactory.toJSON(),
			keywords: keywordTermsIds,
			targetAudiences: targetAudienceTermsIds,
		})
		.end();

	console.log(response.error);

	const announcementCreated = await Announcement.findOrFail(response.body.id);

	response.assertStatus(200);
	response.body.status = announcementStatuses.PENDING;
	response.assertJSONSubset(announcementCreated.toJSON());
	assert.equal(announcementCreated.user_id, user.id);
	assert.equal(announcementCreated.institution_id, institution.id);
	assert.isFalse(AlgoliaSearch.initIndex().saveObject.called);
});

test('PUT /announcements/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const { user: otherUser } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
	const targetAudienceTermsIds = targetAudienceTerms.rows.map(
		(targetAudience) => targetAudience.id,
	);

	const institution = await Factory.model('App/Models/Institution').create();
	const newInstitution = await Factory.model('App/Models/Institution').create();

	const announcement = await Factory.model('App/Models/Announcement').create({
		user_id: ownerUser.id,
		institution_id: institution.id,
	});
	await announcement.terms().attach(keywordTermsIds);
	await announcement.terms().attach(targetAudienceTermsIds);

	const updatedAnnouncement = await Factory.model('App/Models/Announcement').make({
		institution_id: newInstitution.id,
	});

	const response = await client
		.put(`/announcements/${announcement.id}`)
		.loginVia(otherUser, 'jwt')
		.send({
			...updatedAnnouncement.toJSON(),
			keywords: keywordTermsIds,
			targetAudiences: targetAudienceTermsIds,
		})
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /announcements/:id owner user can update your announcement', async ({
	client,
	assert,
}) => {
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
	const targetAudienceTermsIds = targetAudienceTerms.rows.map(
		(targetAudience) => targetAudience.id,
	);

	const institution = await Factory.model('App/Models/Institution').create();
	const newInstitution = await Factory.model('App/Models/Institution').create();

	const announcement = await Factory.model('App/Models/Announcement').create({
		user_id: ownerUser.id,
		institution_id: institution.id,
	});
	await announcement.terms().attach(keywordTermsIds);
	await announcement.terms().attach(targetAudienceTermsIds);

	const payload = {
		...announcement.toJSON(),
		institution_id: newInstitution.id,
		title: 'Updated Announcement title',
		status: announcementStatuses.PUBLISHED,
	};

	const response = await client
		.put(`/announcements/${announcement.id}`)
		.loginVia(ownerUser, 'jwt')
		.send(payload)
		.end();

	const announcementUpdated = await Announcement.findOrFail(response.body.id);
	await announcementUpdated.loadMany(['institution', 'keywords', 'targetAudiences']);

	response.assertStatus(200);
	response.body.status = announcementStatuses.PENDING;
	assert.equal(announcementUpdated.title, payload.title);
	assert.equal(announcementUpdated.status, announcementStatuses.PENDING);
	response.assertJSONSubset(announcementUpdated.toJSON());
	assert.isFalse(AlgoliaSearch.initIndex().saveObject.called);
});

test('PUT /announcements/:id/update-status only admin user can update announcement status', async ({
	client,
	assert,
}) => {
	await Bull.reset();
	const { user: ownerUser } = await createUser({ append: { status: 'verified' } });
	const { user: adminUser } = await createUser({
		append: { status: 'verified', role: roles.ADMIN },
	});
	const keywordTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');
	const keywordTerms = await Factory.model('App/Models/Term').createMany(5);
	await keywordTaxonomy.terms().saveMany(keywordTerms);
	const keywordTermsIds = keywordTerms.map((keyword) => keyword.id);

	const targetAudienceTerms = await Taxonomy.getTaxonomyTerms('TARGET_AUDIENCE');
	const targetAudienceTermsIds = targetAudienceTerms.rows.map(
		(targetAudience) => targetAudience.id,
	);

	const institution = await Factory.model('App/Models/Institution').create();

	const announcement = await Factory.model('App/Models/Announcement').create({
		user_id: ownerUser.id,
		institution_id: institution.id,
	});

	await announcement.terms().attach(keywordTermsIds);
	await announcement.terms().attach(targetAudienceTermsIds);

	const response = await client
		.put(`/announcements/${announcement.id}/update-status`)
		.loginVia(adminUser, 'jwt')
		.send({ status: announcementStatuses.PUBLISHED })
		.end();

	await announcement.reload();

	const bullCall = Bull.spy.calls[0];
	response.assertStatus(200);
	response.assertJSONSubset(announcement.toJSON());
	assert.equal(announcement.status, announcementStatuses.PUBLISHED);
	assert.equal('add', bullCall.funcName);
	assert.equal(ownerUser.email, bullCall.args[1].email);
	assert.equal('emails.announcement-published', bullCall.args[1].template);
	assert.isTrue(Bull.spy.called);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(AlgoliaSearch.initIndex().saveObject.calledOnce);
});

test('DELETE /announcements/:id returns an error if the user is not authorized', async ({
	client,
}) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const announcement = await Factory.model('App/Models/Announcement').create();

	const response = await client
		.delete(`/announcements/${announcement.id}`)
		.loginVia(user, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('DELETE /announcements/:id deletes an announcement', async ({ client, assert }) => {
	const { user } = await createUser({ append: { status: 'verified' } });
	const announcement = await Factory.model('App/Models/Announcement').create({
		user_id: user.id,
	});

	const response = await client
		.delete(`/announcements/${announcement.id}`)
		.loginVia(user, 'jwt')
		.end();

	const announcementFromDatabase = await Announcement.query()
		.where({ id: announcement.id })
		.first();

	response.assertStatus(200);
	assert.isNull(announcementFromDatabase);
	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().deleteObject.withArgs(announcement.toJSON().objectID).calledOnce,
	);
});
