// eslint-disable-next-line import/no-mutable-exports
let config;

if (typeof window === 'undefined') {
	const production = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588206bb0c0751294097e875',
		ALGOLIA_APPLICATION_ID: 'GC7K0ETHXB',
		ALGOLIA_INDEX_SUFIX: 'production',
		API_URL: 'http://api.plataformasabia.com',
		GOOGLE_MAPS_KEY: 'AIzaSyDlQrq14K2OTjUxioB4fW7NJTzZQ2ZFtxA',
		APP_ENV: 'production',
	};

	const staging = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588206bb0c0751294097e875',
		ALGOLIA_APPLICATION_ID: 'GC7K0ETHXB',
		ALGOLIA_INDEX_SUFIX: 'staging',
		API_URL: 'http://api-staging.plataformasabia.com',
		GOOGLE_MAPS_KEY: 'AIzaSyDlQrq14K2OTjUxioB4fW7NJTzZQ2ZFtxA',
		APP_ENV: 'staging',
	};

	const development = {
		ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
		ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
		ALGOLIA_INDEX_SUFIX: process.env.ALGOLIA_INDEX_SUFIX,
		API_URL: process.env.API_URL,
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
		APP_ENV: 'development',
	};

	config = {
		...development,
		...(process.env.APP_ENV === 'staging' ? staging : {}),
		...(process.env.APP_ENV === 'production' ? production : {}),
	};
} else {
	config = window.env || {};
}

export default config;
