const nextTranslate = require('next-translate');
require('dotenv').config();

module.exports = nextTranslate({
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		if (!isServer) {
			config.resolve.fallback.fs = false;
		}

		return config;
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
	redirects: async () => {
		return [
			{
				source: '/ideias',
				destination: '/',
				permanent: false,
			},
			{
				source: '/editais',
				destination: '/',
				permanent: false,
			},
		];
	},
});
