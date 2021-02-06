const { test, trait } = use('Test/Suite')('Analytics');
const Technology = use('App/Models/Technology');
const Factory = use('Factory');
const sinon = require('sinon');
const utils = require('../../app/Utils/analytics');

trait('DatabaseTransactions');

test('Test update technology total views using fake data', async ({ assert }) => {
	const oldTotalViews = 1;
	const newTotalViews = 2;

	const publishedTechnologies = await Factory.model('App/Models/Technology').createMany(10, {
		status: 'published',
		total_views: oldTotalViews,
	});

	const arr = publishedTechnologies.map((technology) => [`/t/${technology.slug}`, newTotalViews]);
	sinon.stub(utils, 'getTechnologyViews').resolves(arr);

	const pageViews = await utils.getTechnologyViews();

	await utils.updateTechnologyTotalViews(pageViews);

	await Promise.all(
		pageViews.map(async (pageView) => {
			const slug = pageView[0].split('/')[2];
			const technology = await Technology.findBy('slug', slug);
			assert.equal(technology.total_views, newTotalViews);
		}),
	);
});
