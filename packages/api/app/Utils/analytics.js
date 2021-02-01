const { google } = require('googleapis');

const Technology = use('App/Models/Technology');

const Config = use('Adonis/Src/Config');

const { clientEmail, privateKey, viewIds } = Config.get('analytics');
const scope = ['https://www.googleapis.com/auth/analytics.readonly'];

const authorize = async () => {
	const jwt = new google.auth.JWT(clientEmail, null, privateKey, scope);
	await jwt.authorize();
	return jwt;
};

const getTechnologyViews = async () => {
	const jwt = await authorize();
	const result = await google.analytics('v3').data.ga.get({
		auth: jwt,
		ids: `ga:${viewIds.site}`,
		'start-date': '2021-01-01',
		'end-date': 'today',
		metrics: 'ga:pageviews',
		dimensions: 'ga:pagePath',
		filters: 'ga:pagePath=~^/t/',
	});
	return result.data.rows;
};

const updateTechnologyTotalViews = async () => {
	const pageViews = await getTechnologyViews();
	await Promise.all(
		pageViews.map(async (pageView) => {
			const technology = await Technology.findBy('slug', pageView[0].split('/')[2]);
			technology.total_views = pageView[1];
			await technology.save();
		}),
	);
};

module.exports = {
	authorize,
	getTechnologyViews,
	updateTechnologyTotalViews,
};
