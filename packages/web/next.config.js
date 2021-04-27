const { i18n } = require('./next-i18next.config');
require('dotenv').config();

module.exports = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		// Fixes npm packages that depend on `fs` module
		return {
			...config,
			node: {
				fs: 'empty',
			},
		};
	},
	images: {
		domains: [
			'127.0.0.1',
			'localhost',
			'plataformasabia.com',
			'staging.plataformasabia.com',
			'api-staging.plataformasabia.com',
			'api.plataformasabia.com',
		],
	},
	i18n,
};
