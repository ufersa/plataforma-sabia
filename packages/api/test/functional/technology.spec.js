const { test, trait } = use('Test/Suite')('Technology');
const AlgoliaSearch = use('App/Services/AlgoliaSearch');
const Helpers = use('Helpers');
const fs = require('fs').promises;

const Config = use('Adonis/Src/Config');
const { uploadsPath } = Config.get('upload');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

const {
	antl,
	errors,
	errorPayload,
	roles,
	technologyStatuses,
	reviewerStatuses,
} = require('../../app/Utils');
const { defaultParams } = require('./params.spec');

const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const User = use('App/Models/User');
const Permission = use('App/Models/Permission');
const TechnologyReview = use('App/Models/TechnologyReview');
const TechnologyComment = use('App/Models/TechnologyComment');
const Reviewer = use('App/Models/Reviewer');

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
	intellectual_property: 1,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose',
	secondary_purpose: 'Test secondary purpose',
	application_mode: 'Test application mode',
	application_examples: 'Test application example',
	installation_time: 365,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
};

const technology2 = {
	title: 'Test Title 2',
	description: 'Test description 2',
	private: 1,
	intellectual_property: 1,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Test primary purpose 2',
	secondary_purpose: 'Test secondary purpose 2',
	application_mode: 'Test application mode 2',
	application_examples: 'Test application example 2',
	installation_time: 700,
	solves_problem: 'Solves problem test',
	entailes_problem: 'Entailes problem test',
	requirements: 'Requirements test',
	risks: 'Test risks',
	contribution: 'Test contribution',
};

const updatedTechnology = {
	title: 'Updated Test Title',
	description: 'Updated description',
	private: 0,
	intellectual_property: 1,
	patent: 1,
	patent_number: '0001/2020',
	primary_purpose: 'Updated Test primary purpose',
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

const invalidField = {
	invalid_field: 'Invalid field',
};

const taxonomy = {
	taxonomy: 'TEST_TAXONOMY',
	description: 'Test Taxonomy.',
};

const user = {
	email: 'sabiatestingemail@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const ownerUser = {
	email: 'ownerusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const developerUser = {
	email: 'developerusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const researcherUser = {
	email: 'researcherusertesting@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.RESEARCHER,
	company: 'UFERSA',
};

const researcherUser2 = {
	email: 'researcherusertesting2@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
};

const investorUser = {
	email: 'investorusertesting2@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.INVESTOR,
};

const reviewerUser = {
	email: 'reviewerusertesting2@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.REVIEWER,
};

const admin = {
	email: 'adminreviewer@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	role: roles.ADMIN,
};

const base64String =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI' +
	'//////////////////////////////////////////////////8BVVpaeGl464KC6//////////////////////////' +
	'////////////////////////////////////////////////CABEIADIAMgMBEQACEQEDEQH/xAAYAAEBAQEBAAAAAA' +
	'AAAAAAAAAAAwIBBP/aAAgBAQAAAAD151oRLDMnbCGZXuYnh6NEFvP6OuOn/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA' +
	'//aAAgBAhAAAADdzBPRIXiRq5kQ2hmqkB//xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/9oACAEDEAAAAMzdG81jIbYl' +
	'F0ZSdGzsWA//xAAjEAABAwQCAQUAAAAAAAAAAAABAAIRAxIhMSBxYQQTQVGx/9oACAEBAAE/AHOt8k6RLxmQmOu74uc' +
	'fd6WACGiJMntAwQeLmhwQ0pTKlpg6/OOsfSdMYRcvT1LhafjXB7JyNo43hFrS7ytaxCa4OEjhVquBLbOjKoNaZMZ1BU' +
	'CITrqVXAkFDXCMzw//xAAbEQEAAgMBAQAAAAAAAAAAAAABABECECAhMP/aAAgBAgEBPwAnkTktygR5NpysMtPKMvIIX' +
	'dvNy70e/H//xAAcEQEAAgMAAwAAAAAAAAAAAAABABECECASITD/2gAIAQMBAT8AWKwb5y9Yxbhyl7HkImsXkSJivVTx' +
	'B02Px//Z';
const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '');

test('GET /technologies get list of technologies', async ({ client, assert }) => {
	await Technology.create(technology);

	const response = await client.get('/technologies').end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 1);
});

test('GET /technologies?term_id= get technologies by term id', async ({ client, assert }) => {
	const tech1 = await Technology.create(technology);
	const tech2 = await Technology.create(technology2);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await tech1.terms().attach([testTerm.id]);
	await tech2.terms().attach([testTerm.id]);

	const response = await client.get(`/technologies?term_id=${testTerm.id}`).end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 2);
});

test('GET /technologies?term= get technologies by term slug', async ({ client, assert }) => {
	const tech1 = await Technology.create(technology);
	const tech2 = await Technology.create(technology2);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
		slug: 'test-term',
	});

	await tech1.terms().attach([testTerm.id]);
	await tech2.terms().attach([testTerm.id]);

	const response = await client.get(`/technologies?term=${testTerm.slug}`).end();

	response.assertStatus(200);
	assert.isAtLeast(response.body.length, 2);
});

test('GET /technologies fails with an inexistent technology', async ({ client }) => {
	const loggeduser = await User.create(user);

	const response = await client
		.get(`/technologies/99999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Technology' }),
		),
	);
});

test('GET /technologies/:id/terms?taxonomy= get technology terms by taxonomy', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await newTechnology.terms().save(newTerm);

	const response = await client
		.get(`/technologies/${newTechnology.id}/terms?taxonomy=${taxonomy.taxonomy}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);

	const terms = await Term.query()
		.whereHas('technologies', (builder) => {
			builder.where('id', newTechnology.id);
		})
		.where('taxonomy_id', testTaxonomy.id)
		.fetch();

	response.assertJSONSubset(terms.toJSON());
});

test('GET /technologies/:id/users get technology users', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const ownerUserInst = await User.create(ownerUser);
	const developerUserInst = await User.create(developerUser);

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUserInst.id]);

	await newTechnology.users().attach(developerUserInst.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client
		.get(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);

	const users = await User.query()
		.whereHas('technologies', (builder) => {
			builder.where('id', newTechnology.id);
		})
		.withParams({ params: defaultParams }, { filterById: false });

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id/users?role= get technology users by role', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const ownerUserInst = await User.create(ownerUser);
	const developerUserInst = await User.create(developerUser);

	const role = 'DEVELOPER';

	await newTechnology.users().attach([ownerUserInst.id]);

	await newTechnology.users().attach(developerUserInst.id, (row) => {
		// eslint-disable-next-line no-param-reassign
		row.role = role;
	});

	const response = await client
		.get(`/technologies/${newTechnology.id}/users?role=${role}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);

	const users = await User.query()
		.whereHas('technologies', (builder) => {
			builder.where('id', newTechnology.id).where('role', role);
		})
		.withParams({ params: defaultParams }, { filterById: false });

	response.assertJSONSubset(users.toJSON());
});

test('GET /technologies/:id returns a single technology', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const response = await client
		.get(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('GET /technologies/:id fetch a technology by slug', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const response = await client
		.get(`/technologies/${newTechnology.slug}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology.', async ({ client, assert }) => {
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	const technologyCreated = await Technology.find(response.body.id);
	const technologyUser = await technologyCreated.users().first();
	assert.equal(loggeduser.id, technologyUser.id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('POST /technologies creates/saves a new technology with thumbnail.', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(researcherUser);

	await fs.writeFile(Helpers.tmpPath(`resources/test/test-thumbnail.jpg`), base64Data, 'base64');

	const uploadResponse = await client
		.post('uploads')
		.loginVia(loggeduser, 'jwt')
		.attach('files[]', Helpers.tmpPath(`resources/test/test-thumbnail.jpg`))
		.end();

	await fs
		.access(Helpers.publicPath(`${uploadsPath}/test-thumbnail.jpg`))
		.then(() => assert.isTrue(true))
		.catch(() => assert.isTrue(false));
	uploadResponse.assertStatus(200);

	const thumbnail_id = uploadResponse.body[0].id;

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, thumbnail_id })
		.end();

	const technologyCreated = await Technology.find(response.body.id);
	const technologyUser = await technologyCreated.users().first();
	assert.equal(loggeduser.id, technologyUser.id);
	assert.equal(technologyCreated.thumbnail_id, thumbnail_id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('POST /technologies technology slug is not created with unwanted characters', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(researcherUser);

	const response1 = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, title: 'new title test.*+~.()\'"!:@ ' })
		.end();

	const technology_1 = await Technology.find(response1.body.id);
	assert.equal(technology_1.slug, 'new-title-test');
	response1.assertStatus(200);

	const response2 = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, title: 'new*+~.()\'"!:@ title test. ' })
		.end();

	const technology_2 = await Technology.find(response2.body.id);
	assert.equal(technology_2.slug, 'new-title-test-1');
	response2.assertStatus(200);

	const response3 = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, title: 'new title*+~.()\'"!:@ test. ' })
		.end();

	const technology_3 = await Technology.find(response3.body.id);
	assert.equal(technology_3.slug, 'new-title-test-2');
	response3.assertStatus(200);
});

test('GET /technologies/:id/reviews GET technology reviews.', async ({ client }) => {
	const technologyWithReviews = await Technology.query()
		.has('reviews')
		.first();

	const response = await client.get(`/technologies/${technologyWithReviews.id}/reviews`).end();

	response.assertStatus(200);
	const reviews = await TechnologyReview.query()
		.whereHas('technology', (builder) => {
			builder.where('id', technologyWithReviews.id);
		})
		.withParams({ params: defaultParams }, { filterById: false });

	response.assertJSONSubset(reviews.toJSON());
});

test('POST /technologies add one count suffix in the slug when it is already stored on our database', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(researcherUser);

	const myNewTechnology = {
		...technology,
		title: 'My title',
	};

	await Technology.create(myNewTechnology);

	await Technology.create(myNewTechnology);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(myNewTechnology)
		.end();

	assert.equal(response.body.slug, 'my-title-2');
});

test('POST /technologies does not append the counter in the slug when it is NOT already stored on our database', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(researcherUser);

	const myNewTechnology = {
		...technology,
		title: 'Should not be stored previosly',
	};

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(myNewTechnology)
		.end();

	assert.equal(response.body.slug, 'should-not-be-stored-previosly');
});

test('POST /technologies calls algoliasearch.saveObject with default category, classification, dimension and target audience if no term is provided', async ({
	assert,
	client,
}) => {
	const defaultTermFem = 'Não definida';
	const defaultTermMasc = 'Não definido';

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(technology)
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category: defaultTermFem,
			classification: defaultTermFem,
			dimension: defaultTermFem,
			targetAudience: defaultTermMasc,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('POST /technologies calls algoliasearch.saveObject with default category, classification, dimension and target audience if these terms is not provided', async ({
	assert,
	client,
}) => {
	const defaultTermFem = 'Não definida';
	const defaultTermMasc = 'Não definido';

	const noCategoryTaxonomy = await Taxonomy.create(taxonomy);
	const noCategoryTerm = await noCategoryTaxonomy.terms().create({
		term: 'No Category term',
	});

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, terms: [noCategoryTerm.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category: defaultTermFem,
			classification: defaultTermFem,
			dimension: defaultTermFem,
			targetAudience: defaultTermMasc,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('POST /technologies calls algoliasearch.saveObject with the category, classification, dimension and target audience terms if it is provided', async ({
	assert,
	client,
}) => {
	const category = 'Saneamento';
	const classification = 'Tecnologias Sociais';
	const dimension = 'Econômica';
	const targetAudience = 'Agricultores';

	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	const classificationTaxonomy = await Taxonomy.getTaxonomy('CLASSIFICATION');
	const dimensionTaxonomy = await Taxonomy.getTaxonomy('DIMENSION');
	const targetAudienceTaxonomy = await Taxonomy.getTaxonomy('TARGET_AUDIENCE');

	const categoryTerm = await categoryTaxonomy.terms().create({
		term: category,
	});

	const classificationTerm = await classificationTaxonomy.terms().create({
		term: classification,
	});

	const dimensionTerm = await dimensionTaxonomy.terms().create({
		term: dimension,
	});

	const targetAudienceTerm = await targetAudienceTaxonomy.terms().create({
		term: targetAudience,
	});

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({
			...technology,
			terms: [
				categoryTerm.slug,
				classificationTerm.slug,
				dimensionTerm.slug,
				targetAudienceTerm.slug,
			],
		})
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...createdTechnology.toJSON(),
			category,
			classification,
			dimension,
			targetAudience,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('POST /technologies creates/saves a new technology with users.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const developerUserInst = await User.create(developerUser);

	const users = [
		{
			id: loggeduser.id,
		},
		{
			id: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, users })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('users');

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology with terms', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);
	const testTaxonomy = await Taxonomy.create(taxonomy);
	const term1 = await testTaxonomy.terms().create({
		term: 'TERM1',
	});
	const term2 = await testTaxonomy.terms().create({
		term: 'TERM2',
	});

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, terms: [term1.id, term2.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.load('terms');

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

test('POST /technologies creates/saves a new technology with users and terms', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);
	const developerUserInst = await User.create(developerUser);

	const users = [
		{
			id: loggeduser.id,
		},
		{
			id: developerUserInst.id,
			role: 'DEVELOPER',
		},
	];

	const testTaxonomy = await Taxonomy.create(taxonomy);
	const term1 = await testTaxonomy.terms().create({
		term: 'TERM1',
	});
	const term2 = await testTaxonomy.terms().create({
		term: 'TERM2',
	});

	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send({ ...technology, users, terms: [term1.id, term2.slug] })
		.end();

	const createdTechnology = await Technology.find(response.body.id);
	await createdTechnology.loadMany(['users', 'terms']);

	response.assertStatus(200);
	response.assertJSONSubset(createdTechnology.toJSON());
});

/** POST technologies/:idTechnology/users */
test('POST /technologies/:idTechnology/users unauthorized user trying associates users with technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const developerUserInst = await User.create(developerUser);

	const newTechnology = await Technology.create(technology);

	const users = [
		{
			id: loggeduser.id,
		},
		{
			email: developerUserInst.email,
			role: 'DEVELOPER',
		},
	];
	const response = await client
		.post(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.send({ users })
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

/** POST technologies/:idTechnology/users */
test('POST /technologies/:idTechnology/users associates users with own technology and other users.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);
	await newTechnology.users().attach([loggeduser.id]);

	const users = [
		{
			email: researcherUser2.email,
		},
		{
			email: developerUser.email,
		},
	];
	const response = await client
		.post(`/technologies/${newTechnology.id}/users`)
		.loginVia(loggeduser, 'jwt')
		.send({ users })
		.end();

	const newUsers = await newTechnology.users().fetch();

	response.assertStatus(200);
	response.assertJSONSubset(newUsers.toJSON());
});

test('POST /technologies/:id/terms associates terms with own technology.', async ({ client }) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);
	await newTechnology.users().attach([loggeduser.id]);

	const keywordsTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');

	const termInstances = await keywordsTaxonomy
		.terms()
		.createMany([{ term: 'sabia' }, { term: 'testing' }, { term: 'terms' }]);

	const terms = [termInstances[0].id, termInstances[1].slug, termInstances[2].id];
	const response = await client
		.post(`/technologies/${newTechnology.id}/terms`)
		.loginVia(loggeduser, 'jwt')
		.send({ terms })
		.end();

	const newTerms = await newTechnology.terms().fetch();

	response.assertStatus(200);
	response.assertJSONSubset(newTerms.toJSON());
});

/** POST technologies/:id/terms */
test('POST /technologies/:id/terms unauthorized user trying associates terms with technology.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const newTechnology = await Technology.create(technology);

	const keywordsTaxonomy = await Taxonomy.getTaxonomy('KEYWORDS');

	const termInstances = await keywordsTaxonomy
		.terms()
		.createMany([{ term: 'sabia' }, { term: 'testing' }, { term: 'terms' }]);

	const terms = [termInstances[0].id, termInstances[1].slug, termInstances[2].id];
	const response = await client
		.post(`/technologies/${newTechnology.id}/terms`)
		.loginVia(loggeduser, 'jwt')
		.send({ terms })
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('POST /technologies creates/saves a new technology even if an invalid field is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const invalidTechnology = { ...technology, ...invalidField };
	const response = await client
		.post('/technologies')
		.loginVia(loggeduser, 'jwt')
		.send(invalidTechnology)
		.end();

	const technologyCreated = await Technology.find(response.body.id);

	response.assertStatus(200);
	response.assertJSONSubset(technologyCreated.toJSON());
});

test('PUT /technologies/:id Unauthorized User trying update technology details', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT /technologies/:id User updates own technology details', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id User updates technology details with direct permission', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(investorUser);
	const updateTechnologiesPermission = await Permission.getPermission('update-technologies');
	await loggeduser.permissions().attach([updateTechnologiesPermission.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('POST /technologies does not create/save a new technology if an inexistent term is provided', async ({
	client,
	assert,
}) => {
	const technologyWithInvalidTerms = { ...technology, terms: [99999] };

	const loggeduser = await User.create(researcherUser);

	const response = await client
		.post(`/technologies`)
		.loginVia(loggeduser, 'jwt')
		.send(technologyWithInvalidTerms)
		.end();

	assert.equal(response.body.id, undefined);

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('PUT /technologies/:id Updates technology details', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(investorUser);
	const updateTechnologiesPermission = await Permission.getPermission('update-technologies');
	await loggeduser.permissions().attach([updateTechnologiesPermission.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id Updates technology details even if an invalid field is provided.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, ...invalidField })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(updatedTechnology);
});

test('PUT /technologies/:id Updates technology details with users', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);

	const developerUserInst = await User.create(developerUser);

	const users = [
		{
			id: loggeduser.id,
		},
		{
			id: developerUserInst.id,
			role: 'DEVELOPER',
		},
		{
			email: 'inexistentUserEmail@gmail.com',
		},
	];

	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, users })
		.end();

	const technologyWithUsers = await Technology.find(response.body.id);
	await technologyWithUsers.load('users');

	response.assertStatus(200);
	response.assertJSONSubset(technologyWithUsers.toJSON());
});

test('PUT /technologies/:id Updates technology with terms if terms[termId] is provided', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			terms: [newTerm.id],
		})
		.end();

	response.assertStatus(200);
	await newTechnology.load('terms');
	response.assertJSONSubset(newTechnology.toJSON());
});

test('PUT /technologies/:id Updates technology with terms if terms[termSlug] is provided', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const newTerm = await testTaxonomy.terms().create({
		term: 'test term',
		slug: 'test-term',
	});

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			terms: [newTerm.slug],
		})
		.end();

	response.assertStatus(200);
	await newTechnology.load('terms');
	response.assertJSONSubset(newTechnology.toJSON());
});

test('PUT /technologies/:id does not update a technology if an inexistent term is provided', async ({
	client,
	assert,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ terms: [99999] })
		.end();

	assert.equal(response.body.id, undefined);

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Term' }),
		),
	);
});

test('PUT /technologies/:id calls algoliasearch.saveObject with default category if no term is provided', async ({
	assert,
	client,
}) => {
	const defaultTermFem = 'Não definida';
	const defaultTermMasc = 'Não definido';

	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send(updatedTechnology)
		.end();

	const updatedTechnologyInDb = await Technology.find(response.body.id);
	await updatedTechnologyInDb.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...updatedTechnologyInDb.toJSON(),
			category: defaultTermFem,
			classification: defaultTermFem,
			dimension: defaultTermFem,
			targetAudience: defaultTermMasc,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('PUT /technologies/:id calls algoliasearch.saveObject with default category, classification, dimension and target audience, if these terms is not provided', async ({
	assert,
	client,
}) => {
	const defaultTermFem = 'Não definida';
	const defaultTermMasc = 'Não definido';

	const noCategoryTaxonomy = await Taxonomy.create(taxonomy);
	const noCategoryTerm = await noCategoryTaxonomy.terms().create({
		term: 'No Category term',
	});

	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({ ...updatedTechnology, terms: [noCategoryTerm.slug] })
		.end();

	const updatedTechnologyInDb = await Technology.find(response.body.id);
	await updatedTechnologyInDb.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...updatedTechnologyInDb.toJSON(),
			category: defaultTermFem,
			classification: defaultTermFem,
			dimension: defaultTermFem,
			targetAudience: defaultTermMasc,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('PUT /technologies/:id calls algoliasearch.saveObject with the category, classification, dimension and target audience terms if it is provided', async ({
	assert,
	client,
}) => {
	const category = 'Saneamento';
	const classification = 'Tecnologias Sociais';
	const dimension = 'Econômica';
	const targetAudience = 'Agricultores';

	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	const classificationTaxonomy = await Taxonomy.getTaxonomy('CLASSIFICATION');
	const dimensionTaxonomy = await Taxonomy.getTaxonomy('DIMENSION');
	const targetAudienceTaxonomy = await Taxonomy.getTaxonomy('TARGET_AUDIENCE');

	const categoryTerm = await categoryTaxonomy.terms().create({
		term: category,
	});

	const classificationTerm = await classificationTaxonomy.terms().create({
		term: classification,
	});

	const dimensionTerm = await dimensionTaxonomy.terms().create({
		term: dimension,
	});

	const targetAudienceTerm = await targetAudienceTaxonomy.terms().create({
		term: targetAudience,
	});

	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			...updatedTechnology,
			terms: [
				categoryTerm.slug,
				classificationTerm.slug,
				dimensionTerm.slug,
				targetAudienceTerm.slug,
			],
		})
		.end();

	const updatedTechnologyInDb = await Technology.find(response.body.id);
	await updatedTechnologyInDb.load('users');

	assert.isTrue(AlgoliaSearch.initIndex.called);
	assert.isTrue(
		AlgoliaSearch.initIndex().saveObject.withArgs({
			...updatedTechnologyInDb.toJSON(),
			category,
			classification,
			dimension,
			targetAudience,
			implementationCost: undefined,
			maintenanceCost: undefined,
			institution: loggeduser.company,
			thumbnail: null,
		}).calledOnce,
	);
});

test('PUT /technologies/:id Updates technology slug with suffix when stored previosly', async ({
	client,
	assert,
}) => {
	await Technology.create({
		...technology,
		title: 'New title',
	});

	const newTechnology = await Technology.create({
		...technology,
		title: 'My old own title',
	});

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			title: 'New title',
		})
		.end();

	assert.equal(response.body.slug, 'new-title-1');
});

test('PUT /technologies/:id Updates technology ignores the slug passed on the body', async ({
	client,
	assert,
}) => {
	const newTechnology = await Technology.create({
		...technology,
		title: 'I am priority',
	});

	const loggeduser = await User.create(researcherUser);
	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.send({
			slug: 'my body slug',
		})
		.end();

	assert.equal(response.body.slug, 'i-am-priority');
});

test('DELETE /technologies/:id Fails if an inexistent technology is provided.', async ({
	client,
}) => {
	const loggeduser = await User.create(researcherUser);

	const response = await client
		.delete(`/technologies/999`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(400);
	response.assertJSONSubset(
		errorPayload(
			errors.RESOURCE_NOT_FOUND,
			antl('error.resource.resourceNotFound', { resource: 'Technology' }),
		),
	);
});

test('DELETE /technologies/:id Delete a technology with id.', async ({ client }) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /technologies/:idTechnology/terms/:idTerm Detach a technology term.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);
	newTechnology.users().attach([loggeduser.id]);

	const testTaxonomy = await Taxonomy.create(taxonomy);

	const testTerm = await testTaxonomy.terms().create({
		term: 'test term',
	});

	await newTechnology.terms().attach([testTerm.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}/terms/${testTerm.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

test('DELETE /technologies/:idTechnology/users/:idUser Detach a technology user.', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);

	const loggeduser = await User.create(researcherUser);

	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.delete(`/technologies/${newTechnology.id}/users/${loggeduser.id}`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset({
		success: true,
	});
});

/** PUT technologies/:id/users */
test('PUT technologies/:id/update-status no technology reviewer user tryning to update status.', async ({
	client,
}) => {
	const loggeduser = await User.create(reviewerUser);

	const newTechnology = await Technology.create(technology);

	const response = await client
		.put(`/technologies/${newTechnology.id}/update-status`)
		.loginVia(loggeduser, 'jwt')
		.send({ status: technologyStatuses.PUBLISHED })
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('PUT technologies/:id/update-status admin updates technology status.', async ({ client }) => {
	const loggeduser = await User.create(admin);

	const newTechnology = await Technology.create(technology);

	const response = await client
		.put(`/technologies/${newTechnology.id}/update-status`)
		.loginVia(loggeduser, 'jwt')
		.send({ status: technologyStatuses.PUBLISHED })
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(newTechnology.toJSON());
});

test('PUT technologies/:id/finalize-registration user finalizes technology register.', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(user);

	const newTechnology = await Technology.create(technology);

	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}/finalize-registration`)
		.loginVia(loggeduser, 'jwt')
		.end();

	const technologyFinalized = await Technology.findOrFail(response.body.id);

	assert.equal(technologyFinalized.status, technologyStatuses.PENDING);

	response.assertStatus(200);
	response.assertJSONSubset(technologyFinalized.toJSON());
});

test('PUT technologies/:id/finalize-registration user finalizes technology register with a comment.', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(user);

	const newTechnology = await Technology.create(technology);

	await newTechnology.users().attach([loggeduser.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}/finalize-registration`)
		.send({ comment: 'test comment' })
		.loginVia(loggeduser, 'jwt')
		.end();

	const technologyFinalized = await Technology.findOrFail(response.body.id);
	const comment = await TechnologyComment.findOrFail(response.body.comments[0].id);

	assert.equal(technologyFinalized.status, technologyStatuses.PENDING);

	response.assertStatus(200);
	response.assertJSONSubset({ comments: [comment.toJSON()] });
});

test('PUT technologies/:id/revison researcher sends technology to revison after make changes requested by reviewer.', async ({
	client,
	assert,
}) => {
	const loggeduser = await User.create(user);
	const newTechnology = await Technology.create(technology);
	await newTechnology.users().attach([loggeduser.id]);

	const reviewer = await User.create(reviewerUser);
	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewer);

	newTechnology.status = technologyStatuses.REQUESTED_CHANGES;
	await newTechnology.save();
	await approvedReviewer.technologies().attach([newTechnology.id]);

	const response = await client
		.put(`/technologies/${newTechnology.id}/revision`)
		.send({ comment: 'changes maded' })
		.loginVia(loggeduser, 'jwt')
		.end();

	const technologyReviewed = await Technology.findOrFail(response.body.id);
	const comment = await TechnologyComment.findOrFail(response.body.comments[0].id);

	assert.equal(technologyReviewed.status, technologyStatuses.CHANGES_MADE);

	response.assertStatus(200);
	response.assertJSONSubset({ comments: [comment.toJSON()] });
});

test('GET /technologies/:id/comments only technology related users or reviewer can list comments', async ({
	client,
}) => {
	const newTechnology = await Technology.create(technology);
	const technologyOwnerUser = await User.create(ownerUser);
	await newTechnology.users().attach([technologyOwnerUser.id]);

	const technologyComment = await TechnologyComment.create({ comment: 'test comment' });
	await Promise.all([
		technologyComment.technology().associate(newTechnology),
		technologyComment.user().associate(technologyOwnerUser),
	]);

	const loggeduser = await User.create(user);

	const response = await client
		.get(`/technologies/${newTechnology.id}/comments`)
		.loginVia(loggeduser, 'jwt')
		.end();

	response.assertStatus(403);
	response.assertJSONSubset(
		errorPayload(errors.UNAUTHORIZED_ACCESS, antl('error.permission.unauthorizedAccess')),
	);
});

test('GET /technologies/:id/comments onwer user list comments', async ({ client }) => {
	const newTechnology = await Technology.create(technology);
	const technologyOwnerUser = await User.create(ownerUser);
	await newTechnology.users().attach([technologyOwnerUser.id]);

	const technologyComment = await TechnologyComment.create({ comment: 'test comment' });
	await Promise.all([
		technologyComment.technology().associate(newTechnology),
		technologyComment.user().associate(technologyOwnerUser),
	]);

	const response = await client
		.get(`/technologies/${newTechnology.id}/comments`)
		.loginVia(technologyOwnerUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([{ comment: 'test comment' }]);
});

test('GET /technologies/:id/comments technology reviewer list comments', async ({ client }) => {
	const newTechnology = await Technology.create(technology);
	const technologyOwnerUser = await User.create(ownerUser);
	await newTechnology.users().attach([technologyOwnerUser.id]);

	const technologyComment = await TechnologyComment.create({ comment: 'test comment' });
	await Promise.all([
		technologyComment.technology().associate(newTechnology),
		technologyComment.user().associate(technologyOwnerUser),
	]);

	const reviewer = await User.create(reviewerUser);
	const approvedReviewer = await Reviewer.create({ status: reviewerStatuses.APPROVED });
	await approvedReviewer.user().associate(reviewer);
	await approvedReviewer.technologies().attach([newTechnology.id]);

	const response = await client
		.get(`/technologies/${newTechnology.id}/comments`)
		.loginVia(reviewer, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([{ comment: 'test comment' }]);
});
