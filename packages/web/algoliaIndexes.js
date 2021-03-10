const ALGOLIA_INDEX_PREFIX = 'searchable';

export default {
	technology: {
		default: `${ALGOLIA_INDEX_PREFIX}_technology`,
		suggestions: `${ALGOLIA_INDEX_PREFIX}_technology_query_suggestions`,
	},
	idea: {
		default: `${ALGOLIA_INDEX_PREFIX}_ideas`,
		suggestions: `${ALGOLIA_INDEX_PREFIX}_ideas_query_suggestions`,
	},
	service: {
		default: `${ALGOLIA_INDEX_PREFIX}_services`,
		suggestions: `${ALGOLIA_INDEX_PREFIX}_services_query_suggestions`,
	},
};
