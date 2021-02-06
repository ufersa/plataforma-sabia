const Google = use('App/Services/Google');
const Database = use('Database');
const Config = use('Adonis/Src/Config');

const { clientEmail, privateKey, viewIds } = Config.get('analytics');
const scope = ['https://www.googleapis.com/auth/analytics.readonly'];

const authorize = async () => {
	const jwt = new Google.auth.JWT(clientEmail, null, privateKey, scope);
	await jwt.authorize();
	return jwt;
};

const getTechnologyViews = async () => {
	const jwt = await authorize();
	const result = await Google.analytics('v3').data.ga.get({
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

const updateTechnologyTotalViews = async (pageViews) => {
	let cases = '';
	const slugs = [];

	pageViews.forEach((pageView) => {
		const slug = `'${pageView[0].split('/')[2]}'`;
		cases += `WHEN slug=${slug} THEN ${pageView[1]} `;
		slugs.push(slug);
	});

	const query = `UPDATE technologies SET total_views = CASE ${cases} ELSE total_views END WHERE slug in (${slugs.join()})`;
	await Database.raw(query);
};

module.exports = {
	authorize,
	getTechnologyViews,
	updateTechnologyTotalViews,
};
