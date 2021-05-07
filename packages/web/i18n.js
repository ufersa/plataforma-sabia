module.exports = {
	locales: ['pt'],
	defaultLocale: 'pt',
	pages: {
		'/': ['common', 'search', 'card', 'helper', 'pages'],
	},
	loadLocaleFrom: (lang, ns) =>
		// You can use a dynamic import, fetch, whatever. You should
		// return a Promise with the JSON file.
		import(`./public/static/locales/${lang}/${ns}.json`).then((m) => m.default),
};
