const { test, trait } = use('Test/Suite')('Analytics');
const Technology = use('App/Models/Technology');
const { getTechnologyViews, updateTechnologyTotalViews } = require('../../app/Utils');

const Analytics = use('App/Services/Analytics');

const Factory = use('Factory');

trait('DatabaseTransactions');

test('Test update technology total views using fake data', async ({ assert }) => {
	const publishedTechnologies = await Factory.model('App/Models/Technology').createMany(10, {
		status: 'published',
	});

	Analytics.data.ga.set(publishedTechnologies);

	const pageViews = await getTechnologyViews();

	await updateTechnologyTotalViews();

	await Promise.all(
		pageViews.map(async (pageView) => {
			const slug = pageView[0].split('/')[2];
			const technology = await Technology.findBy('slug', slug);
			assert.equal(technology.total_views, pageView[1]);
		}),
	);
});
