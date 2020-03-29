require('dotenv').config();

module.exports = {
	env: {
		ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
		ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
	},
	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		return {
			...config,
			node: {
				fs: 'empty',
			},
		};
	},
};
