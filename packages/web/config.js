import indexes from './algoliaIndexes';

// eslint-disable-next-line import/no-mutable-exports
let config;

if (typeof window === 'undefined' || process.env.APP_ENV === 'testing') {
	const production = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588206bb0c0751294097e875',
		ALGOLIA_APPLICATION_ID: 'GC7K0ETHXB',
		ALGOLIA_INDEX_TECHNOLOGY: `${indexes.technology.default}_production`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_TECHNOLOGY: `${indexes.technology.suggestions}_production`,
		ALGOLIA_INDEX_IDEA: `${indexes.idea.default}_production`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_IDEA: `${indexes.idea.suggestions}_production`,
		ALGOLIA_INDEX_SERVICE: `${indexes.service.default}_production`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_SERVICE: `${indexes.service.suggestions}_production`,
		ALGOLIA_INDEX_ANNOUNCEMENT: `${indexes.announcement.default}_production`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_ANNOUNCEMENT: `${indexes.announcement.suggestions}_production`,
		ALGOLIA_INDEX_INSTITUTION: `${indexes.institution.default}_production`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_INSTITUTION: `${indexes.institution.suggestions}_production`,
		API_URL: 'https://api.plataformasabia.com',
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
		SMARTSUP_KEY: process.env.SMARTSUP_KEY,
		APP_ENV: 'production',
		LOAD_ANALYTICS: true,
		LOAD_HOTJAR: true,
		LOAD_SMARTSUP: true,
	};

	const staging = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588206bb0c0751294097e875',
		ALGOLIA_APPLICATION_ID: 'GC7K0ETHXB',
		ALGOLIA_INDEX_TECHNOLOGY: `${indexes.technology.default}_staging`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_TECHNOLOGY: `${indexes.technology.suggestions}_staging`,
		ALGOLIA_INDEX_IDEA: `${indexes.idea.default}_staging`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_IDEA: `${indexes.idea.suggestions}_staging`,
		ALGOLIA_INDEX_SERVICE: `${indexes.service.default}_staging`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_SERVICE: `${indexes.service.suggestions}_staging`,
		ALGOLIA_INDEX_ANNOUNCEMENT: `${indexes.announcement.default}_staging`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_ANNOUNCEMENT: `${indexes.announcement.suggestions}_staging`,
		ALGOLIA_INDEX_INSTITUTION: `${indexes.institution.default}_staging`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_INSTITUTION: `${indexes.institution.suggestions}_staging`,
		API_URL: 'https://api-staging.plataformasabia.com',
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
		SMARTSUP_KEY: process.env.SMARTSUP_KEY,
		APP_ENV: 'staging',
		LOAD_ANALYTICS: false,
		LOAD_HOTJAR: false,
		LOAD_SMARTSUP: false,
	};

	const testing = {
		ALGOLIA_SEARCH_KEY: '8ea4ffa0588_test',
		ALGOLIA_APPLICATION_ID: 'GC7K0E_test',
		ALGOLIA_INDEX_TECHNOLOGY: `${indexes.technology.default}_test`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_TECHNOLOGY: `${indexes.technology.suggestions}_test`,
		ALGOLIA_INDEX_IDEA: `${indexes.idea.default}_test`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_IDEA: `${indexes.idea.suggestions}_test`,
		ALGOLIA_INDEX_SERVICE: `${indexes.service.default}_test`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_SERVICE: `${indexes.service.suggestions}_test`,
		ALGOLIA_INDEX_ANNOUNCEMENT: `${indexes.announcement.default}_test`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_ANNOUNCEMENT: `${indexes.announcement.suggestions}_test`,
		ALGOLIA_INDEX_INSTITUTION: `${indexes.institution.default}_test`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_INSTITUTION: `${indexes.institution.suggestions}_test`,
		API_URL: 'http://127.0.0.1:3334',
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
		SMARTSUP_KEY: process.env.SMARTSUP_KEY,
		APP_ENV: 'testing',
		LOAD_ANALYTICS: false,
		LOAD_HOTJAR: false,
		LOAD_SMARTSUP: false,
	};

	const development = {
		ALGOLIA_SEARCH_KEY: process.env.ALGOLIA_SEARCH_KEY,
		ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
		ALGOLIA_INDEX_TECHNOLOGY: `${indexes.technology.default}_development`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_TECHNOLOGY: `${indexes.technology.suggestions}_development`,
		ALGOLIA_INDEX_IDEA: `${indexes.idea.default}_development`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_IDEA: `${indexes.idea.suggestions}_development`,
		ALGOLIA_INDEX_SERVICE: `${indexes.service.default}_development`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_SERVICE: `${indexes.service.suggestions}_development`,
		ALGOLIA_INDEX_ANNOUNCEMENT: `${indexes.announcement.default}_development`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_ANNOUNCEMENT: `${indexes.announcement.suggestions}_development`,
		ALGOLIA_INDEX_INSTITUTION: `${indexes.institution.default}_development`,
		ALGOLIA_QUERY_SUGGESTIONS_INDEX_INSTITUTION: `${indexes.announcement.institution}_development`,
		API_URL: process.env.API_URL,
		GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
		SMARTSUP_KEY: process.env.SMARTSUP_KEY,
		APP_ENV: 'development',
		LOAD_ANALYTICS: false,
		LOAD_HOTJAR: false,
		LOAD_SMARTSUP: false,
	};

	config = {
		...development,
		...(process.env.APP_ENV === 'testing' ? testing : {}),
		...(process.env.APP_ENV === 'staging' ? staging : {}),
		...(process.env.APP_ENV === 'production' ? production : {}),
	};
} else {
	config = window.env || {};
}

export default config;
