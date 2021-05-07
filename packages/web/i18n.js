module.exports = {
	locales: ['pt'],
	defaultLocale: 'pt',
	pages: {
		'*': ['profile', 'common', 'pages', 'search', 'helper'],
		'/_error': ['error'],
		'/': ['card'],
		'/search': ['card'],
		'/t/[technology]': ['card'],
		'/announcements': ['card'],
		'/ideas': ['card'],
		'/service/new': ['error'],
		'/technology/[id]/edit': ['error'],
		'/technology/[id]/edit/[step]': ['error'],
		'/vitrine/[institution]': ['card'],
		'/vitrines': ['search', 'card'],
		'rgx:^/user/my-account/*': ['account', 'datagrid', 'error'],
	},
	loadLocaleFrom: (lang, ns) =>
		// You can use a dynamic import, fetch, whatever. You should
		// return a Promise with the JSON file.
		import(`./public/static/locales/${lang}/${ns}.json`).then((m) => m.default),
};
