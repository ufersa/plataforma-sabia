require('dotenv').config();

module.exports = {
	env: {
		ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
		ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
		ALGOLIA_INDEX_SUFIX: process.env.ALGOLIA_INDEX_SUFIX,
		API_URL: process.env.API_URL,
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
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
