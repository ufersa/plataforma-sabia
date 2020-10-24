// eslint-disable-next-line import/no-mutable-exports
let config;

if (typeof window === 'undefined' || process.env.APP_ENV === 'test') {
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

	const test = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588_test',
		ALGOLIA_APPLICATION_ID: 'GC7K0E_test',
		ALGOLIA_INDEX_SUFIX: 'test',
		API_URL: 'http://api-test.plataformasabia.com',
		GOOGLE_MAPS_KEY: 'AIzaSyDlQrq14K2OTj_test',
		APP_ENV: 'test',
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
		...(process.env.APP_ENV === 'test' ? test : {}),
		...(process.env.APP_ENV === 'staging' ? staging : {}),
		...(process.env.APP_ENV === 'production' ? production : {}),
	};
	console.log(config);
} else {
	config = window.env || {};
}

export default config;
