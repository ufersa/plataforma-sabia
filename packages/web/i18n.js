module.exports = {
	locales: ['pt'],
	defaultLocale: 'pt',
	pages: {
		'*': ['profile', 'common', 'pages', 'search', 'helper', 'error'],
		'/': ['card'],
		'/search': ['card'],
		'/t/[technology]': ['card'],
		'/announcements': ['card'],
		'/ideas': ['card'],
		'/vitrine/[institution]': ['card'],
		'/vitrines': ['card'],
		'rgx:^/user/my-account/*': ['account', 'datagrid'],
		'/cadastrar': ['account'],
		'/confirmar-conta': ['account'],
	},
	loadLocaleFrom: (lang, ns) =>
		import(`./public/static/locales/${lang}/${ns}.json`).then((m) => m.default),
	logBuild: process.env.NODE_ENV === 'development',
};
