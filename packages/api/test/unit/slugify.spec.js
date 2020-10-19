/* eslint-disable func-names */
const { test, trait } = use('Test/Suite')('Slugify');
const { createUniqueSlug, incrementSlugSuffix } = require('../../app/Utils/slugify');

const Term = use('App/Models/Term');
const Technology = use('App/Models/Technology');

trait('DatabaseTransactions');

function StubModel(first = null) {
	this.query = function() {
		return this;
	};
	this.where = function() {
		return this;
	};
	this.orderBy = function() {
		return this;
	};
	this.orderByRaw = function() {
		return this;
	};
	this.first = function() {
		return first;
	};
}

test('returns a new unique slug WITHOUT sufix when not stored previously', async ({ assert }) => {
	const myUniqueSlug = await createUniqueSlug(new StubModel(), 'My Cool Title');
	assert.equal(myUniqueSlug, 'my-cool-title');
});

test('returns a new unique slug WITH sufix when stored previously', async ({ assert }) => {
	const myUniqueSlug = await createUniqueSlug(
		new StubModel({ slug: 'stored-previously' }),
		'Stored previsouly',
	);
	assert.equal(myUniqueSlug, 'stored-previously-1');
});

test('add the suffix using the last part of the slug + 1', async ({ assert }) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-5');
	assert.equal(mySlugWithouSuffix, 'new-slug-6');
});

test('add the suffix using the last part of the slug + 1 regardless of suffix value', async ({
	assert,
}) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-9');
	assert.equal(mySlugWithouSuffix, 'new-slug-10');
});

test('add the suffix using the last part of the slug + 1 regardless of suffix value (2 digits)', async ({
	assert,
}) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug-10');
	assert.equal(mySlugWithouSuffix, 'new-slug-11');
});

test('add the first suffix when does not have suffix', async ({ assert }) => {
	const mySlugWithouSuffix = incrementSlugSuffix('new-slug');
	assert.equal(mySlugWithouSuffix, 'new-slug-1');
});

test('tests unique slugs in multiple term creation', async ({ assert }) => {
	const terms = [];

	for (let i = 0; i < 20; i += 1) {
		terms.push({
			term: 'Test Term',
		});
	}
	const termInstances = await Term.createMany(terms);

	assert.equal(termInstances[0].slug, 'test-term');

	termInstances.forEach((term, index) => {
		if (index > 0) assert.equal(term.slug, `test-term-${index}`);
	});
});

test('tests unique slugs in multiple technology creation', async ({ assert }) => {
	const technologies = [];

	for (let i = 0; i < 20; i += 1) {
		technologies.push({
			title: 'Test Technology Title',
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
		});
	}
	const technologyInstances = await Technology.createMany(technologies);

	assert.equal(technologyInstances[0].slug, 'test-technology-title');

	technologyInstances.forEach((technology, index) => {
		if (index > 0) assert.equal(technology.slug, `test-technology-title-${index}`);
	});
});
