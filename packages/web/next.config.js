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
		domains: ['127.0.0.1', 'plataformasabia.com', 'staging.plataformasabia.com'],
	},
};
