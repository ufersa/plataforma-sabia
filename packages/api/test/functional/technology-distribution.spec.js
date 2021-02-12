const { test, trait } = use('Test/Suite')('Technology Distribution');
const Technology = use('App/Models/Technology');
// const Taxonomy = use('App/Models/Taxonomy');
const Term = use('App/Models/Term');
const Reviewer = use('App/Models/Reviewer');
// const User = use('App/Models/User');
const KnowledgeArea = use('App/Models/KnowledgeArea');

const Factory = use('Factory');

const {
	distributeTechnologyToReviewer,
	distributeTechnologiesToReviewers,
	roles,
	technologyStatuses,
	reviewerStatuses,
} = require('../../app/Utils');

const { createUser } = require('../utils/Suts');

trait('DatabaseTransactions');

test('Distribute technology to able reviewer', async ({ assert }) => {
	// Ciência da Computação (Área)
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-7');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(knowledgeArea.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	const result = await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyInReview.id, technologyReviewer.id);
	assert.equal(technologyInReview.status, technologyStatuses.IN_REVIEW);
	assert.equal(reviewerUser.email, result.data.email);
	assert.equal('emails.technology-reviewer', result.data.template);
});

test('Distribute technology with great area related to reviewer area', async ({ assert }) => {
	// Ciências Exatas e da Terra (Grande Área)
	const greatArea = await KnowledgeArea.findBy('knowledge_area_id', 10000003);

	// Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área)
	const area = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: greatArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-7');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(area.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	const result = await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyInReview.id, technologyReviewer.id);
	assert.equal(technologyInReview.status, technologyStatuses.IN_REVIEW);
	assert.equal(reviewerUser.email, result.data.email);
	assert.equal('emails.technology-reviewer', result.data.template);
});

test('Distribute technology with area related to reviewer sub area', async ({ assert }) => {
	// Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área)
	const area = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	// Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área) => Sistemas de Computação (Sub-Área)
	const subArea = await KnowledgeArea.findBy('knowledge_area_id', 10304002);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: area.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-7');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(subArea.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	const result = await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyInReview.id, technologyReviewer.id);
	assert.equal(technologyInReview.status, technologyStatuses.IN_REVIEW);
	assert.equal(reviewerUser.email, result.data.email);
	assert.equal('emails.technology-reviewer', result.data.template);
});

test('Distribute technology with subArea related to reviewer speciality', async ({ assert }) => {
	// Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área) => Sistemas de Computação (Sub-Área)
	const subArea = await KnowledgeArea.findBy('knowledge_area_id', 10304002);

	/* Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área) => Sistemas de Computação (Sub-Área) => 
	 Arquitetura de Sistemas de Computação (Especialidade) */
	const speciality = await KnowledgeArea.findBy('knowledge_area_id', 10304029);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: subArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-7');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(speciality.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	const result = await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyInReview.id, technologyReviewer.id);
	assert.equal(technologyInReview.status, technologyStatuses.IN_REVIEW);
	assert.equal(reviewerUser.email, result.data.email);
	assert.equal('emails.technology-reviewer', result.data.template);
});

test('Technology has no TRL to review', async ({ assert }) => {
	// Ciência da Computação (Área)
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-6');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(knowledgeArea.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyReviewer, null);
	assert.equal(technologyInReview.status, technologyStatuses.PENDING);
});

test('Technology has no Knowledge Area to review', async ({ assert }) => {
	// Ciência da Computação (Área)
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: null,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-8');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(knowledgeArea.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyReviewer, null);
	assert.equal(technologyInReview.status, technologyStatuses.PENDING);
});

test('Technology has no able reviewer', async ({ assert }) => {
	// Ciência da Computação (Área)
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10300007);
	// Engenharia Civil (Área) 30100003
	const knowledgeArea2 = await KnowledgeArea.findBy('knowledge_area_id', 30100003);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});

	const stage = await Term.getTerm('stage-8');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(knowledgeArea2.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyReviewer, null);
	assert.equal(technologyInReview.status, technologyStatuses.PENDING);
});

test('Distribute technologies to reviewers', async ({ assert }) => {
	/* Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área) => Sistemas de Computação (Sub-Área) => 
	 Arquitetura de Sistemas de Computação (Especialidade) */
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10304029);

	const technologyInst1 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const technologyInst2 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});

	const stage = await Term.getTerm('stage-8');
	await technologyInst1.terms().attach(stage.id);
	await technologyInst2.terms().attach(stage.id);

	const { user: reviewerUser1 } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	const { user: reviewerUser2 } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});

	const ableReviewer1 = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser1.id,
	});

	const ableReviewer2 = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser2.id,
	});

	await reviewerUser1.areas().attach(knowledgeArea.knowledge_area_id);
	await reviewerUser2.areas().attach(knowledgeArea.knowledge_area_id);

	await distributeTechnologiesToReviewers();

	const technologyInReview1 = await Technology.find(technologyInst1.id);
	const technologyInReview2 = await Technology.find(technologyInst2.id);

	const numberTechnologiesInReviewByAbleReviewer1 = await ableReviewer1.technologies().count();
	assert.isAtLeast(numberTechnologiesInReviewByAbleReviewer1[0]['count(*)'], 1);
	const numberTechnologiesInReviewByAbleReviewer2 = await ableReviewer2.technologies().count();
	assert.isAtLeast(numberTechnologiesInReviewByAbleReviewer2[0]['count(*)'], 1);
	assert.equal(technologyInReview1.status, technologyStatuses.IN_REVIEW);
	assert.equal(technologyInReview2.status, technologyStatuses.IN_REVIEW);
});

test('Distribute technologies to reviewers by weight', async ({ assert }) => {
	/* Ciências Exatas e da Terra (Grande Área) => Ciência da Computação (Área) => Sistemas de Computação (Sub-Área) => 
	 Arquitetura de Sistemas de Computação (Especialidade) */
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10304029);

	const technologyInst1 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const technologyInst2 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const technologyInst3 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.IN_REVIEW,
	});
	const technologyInst4 = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.IN_REVIEW,
	});

	const stage = await Term.getTerm('stage-9');
	await technologyInst1.terms().attach(stage.id);
	await technologyInst2.terms().attach(stage.id);
	await technologyInst3.terms().attach(stage.id);
	await technologyInst4.terms().attach(stage.id);

	const { user: reviewerUser1 } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	const { user: reviewerUser2 } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});

	const ableReviewer1 = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser1.id,
	});

	const ableReviewer2 = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser2.id,
	});

	await reviewerUser1.areas().attach(knowledgeArea.knowledge_area_id);
	await reviewerUser2.areas().attach(knowledgeArea.knowledge_area_id);

	await ableReviewer1.technologies().attach(technologyInst3.id);
	await ableReviewer1.technologies().attach(technologyInst4.id);

	await distributeTechnologiesToReviewers();

	const numberTechnologiesInReviewByAbleReviewer2 = await ableReviewer2.technologies().count();
	assert.isAtLeast(numberTechnologiesInReviewByAbleReviewer2[0]['count(*)'], 2);
});

test('Technology cannot be distributed to a user related to it', async ({ assert }) => {
	// Ciência da Computação (Área)
	const knowledgeArea = await KnowledgeArea.findBy('knowledge_area_id', 10300007);

	const technologyInst = await Factory.model('App/Models/Technology').create({
		knowledge_area_id: knowledgeArea.knowledge_area_id,
		status: technologyStatuses.PENDING,
	});
	const stage = await Term.getTerm('stage-9');
	await technologyInst.terms().attach(stage.id);

	const { user: reviewerUser } = await createUser({
		append: { role: roles.REVIEWER, status: 'verified' },
	});
	await reviewerUser.areas().attach(knowledgeArea.knowledge_area_id);

	const ableReviewer = await Reviewer.create({
		status: reviewerStatuses.APPROVED,
		user_id: reviewerUser.id,
	});

	await technologyInst.users().attach(reviewerUser.id);

	await distributeTechnologyToReviewer(technologyInst);

	const technologyInReview = await Technology.find(technologyInst.id);

	const technologyReviewer = await ableReviewer.technologies().first();
	assert.equal(technologyReviewer, null);
	assert.equal(technologyInReview.status, technologyStatuses.PENDING);
});
