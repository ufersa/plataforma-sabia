export default {
	technology: {
		default: `${process.env.ALGOLIA_INDEX_PREFIX}_technology`,
		suggestions: `${process.env.ALGOLIA_INDEX_PREFIX}_technology_query_suggestions`,
	},
	idea: {
		default: `${process.env.ALGOLIA_INDEX_PREFIX}_ideas`,
		suggestions: `${process.env.ALGOLIA_INDEX_PREFIX}_ideas_query_suggestions`,
	},
	service: {
		default: `${process.env.ALGOLIA_INDEX_PREFIX}_services`,
		suggestions: `${process.env.ALGOLIA_INDEX_PREFIX}_services_query_suggestions`,
	},
};
