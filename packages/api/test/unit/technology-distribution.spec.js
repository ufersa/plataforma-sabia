const { test, trait } = use('Test/Suite')('Technology Distribution');

const {
	distributeTechnologyToReviewer,
	distributeTechnologiesToReviewers,
	roles,
} = require('../../app/Utils');

const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Reviewer = use('App/Models//Reviewer');
const User = use('App/Models//User');

trait('DatabaseTransactions');

const technology = {
	title: 'Test Title',
	description: 'Test description',
	private: 1,
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
	status: 'pending',
};

const technology2 = {
	title: 'Test Title 2',
	description: 'Test description',
	private: 1,
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
	status: 'pending',
};

const reviewerUser = {
	email: 'reviewerusertesting1@gmail.com',
	password: '123123',
	first_name: 'Reviewer',
	last_name: 'One',
	role: roles.REVIEWER,
};

const reviewerUser2 = {
	email: 'reviewerusertesting2@gmail.com',
	password: '123123',
	first_name: 'Reviewer',
	last_name: 'Two',
	role: roles.REVIEWER,
};

test('Distribute technology to able reviewer', async ({ assert }) => {
	const technologyInst = await Technology.create(technology);
	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	const testCategory = await categoryTaxonomy.terms().create({ term: 'Test Category' });
	await technologyInst.terms().attach(testCategory.id);

	const ableReviewer = await Reviewer.create({
		status: 'approved',
	});

	const user = await User.create(reviewerUser);

	await ableReviewer.user().associate(user);
	await ableReviewer.categories().attach(testCategory.id);

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyInReview.id, technologyReviewer.id);
	assert.equal(technologyInReview.status, 'in_review');
});

test('Technology has no able reviewer', async ({ assert }) => {
	const technologyInst = await Technology.create(technology);
	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	const testCategory = await categoryTaxonomy.terms().create({ term: 'Test Category' });
	const reviewerCategory = await categoryTaxonomy.terms().create({ term: 'Reviewer Category' });
	await technologyInst.terms().attach(testCategory.id);

	const ableReviewer = await Reviewer.create({
		status: 'approved',
	});

	const user = await User.create(reviewerUser);

	await ableReviewer.user().associate(user);
	await ableReviewer.categories().attach(reviewerCategory.id);

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyReviewer, null);
	assert.equal(technologyInReview.status, 'pending');
});

test('Distribute technologies to reviewers', async ({ assert }) => {
	const technologyInst1 = await Technology.create(technology);
	const technologyInst2 = await Technology.create(technology2);
	const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');
	const testCategory = await categoryTaxonomy.terms().create({ term: 'Test Category' });
	await technologyInst1.terms().attach(testCategory.id);
	await technologyInst2.terms().attach(testCategory.id);

	const ableReviewer1 = await Reviewer.create({
		status: 'approved',
	});

	const ableReviewer2 = await Reviewer.create({
		status: 'approved',
	});

	const user1 = await User.create(reviewerUser);
	const user2 = await User.create(reviewerUser2);

	await ableReviewer1.user().associate(user1);
	await ableReviewer2.user().associate(user2);
	await ableReviewer1.categories().attach(testCategory.id);
	await ableReviewer2.categories().attach(testCategory.id);

	await distributeTechnologiesToReviewers();

	const technologyInReview1 = await Technology.find(technologyInst1.id);
	const technologyInReview2 = await Technology.find(technologyInst2.id);

	const numberTechnologiesInReviewByAbleReviewer1 = await ableReviewer1.technologies().count();
	assert.isAtLeast(numberTechnologiesInReviewByAbleReviewer1[0]['count(*)'], 1);
	const numberTechnologiesInReviewByAbleReviewer2 = await ableReviewer2.technologies().count();
	assert.isAtLeast(numberTechnologiesInReviewByAbleReviewer2[0]['count(*)'], 1);
	assert.equal(technologyInReview1.status, 'in_review');
	assert.equal(technologyInReview2.status, 'in_review');
});
