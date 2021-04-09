import qs from 'query-string';
import { findResultsState as algoliaFindResultsState } from 'react-instantsearch-dom/server';
import { algoliaDefaultConfig } from '../components/Algolia/provider';

const createURL = (state) => {
	const isDefaultRoute =
		!state.query &&
		state.page === 1 &&
		!state.refinementList?.classification?.length &&
		!state.refinementList?.type?.length &&
		!state.refinementList?.dimension?.length &&
		!state.refinementList?.targetAudience?.length &&
		!state.refinementList?.institution?.length &&
		!state.refinementList?.keywords?.length &&
		!state.toggle?.forSale;

	if (isDefaultRoute) {
		return '/search';
	}

	const queryParameters = {};

	if (state?.query) {
		queryParameters.query = encodeURIComponent(state.query);
	}
	if (state?.page !== 1) {
		queryParameters.page = state.page;
	}

	if (state?.refinementList?.classification) {
		queryParameters.classifications = state.refinementList.classification.map(
			encodeURIComponent,
		);
	}

	if (state?.refinementList?.type) {
		queryParameters.types = state.refinementList.type.map(encodeURIComponent);
	}

	if (state?.refinementList?.dimension) {
		queryParameters.dimensions = state.refinementList.dimension.map(encodeURIComponent);
	}

	if (state?.refinementList?.targetAudience) {
		queryParameters.targetAudiences = state.refinementList.targetAudience.map(
			encodeURIComponent,
		);
	}

	if (state?.refinementList?.institution) {
		queryParameters.institutions = state.refinementList.institution.map(encodeURIComponent);
	}

	if (state?.refinementList?.keywords) {
		queryParameters.keywords = state.refinementList.keywords;
	}

	if (state?.toggle?.forSale) {
		queryParameters.forSale = JSON.stringify(state.toggle.forSale);
	}

	const queryString = qs.stringifyUrl(
		{ url: '', query: queryParameters },
		{ arrayFormat: 'comma' },
	);

	return `/search${queryString}`;
};

export const searchStateToURL = (searchState) => (searchState ? createURL(searchState) : '');

export const urlToSearchState = (path) => {
	const url = path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};
	const { query = '', page = 1 } = url;

	const allClassifications = url?.classifications ? url.classifications.split(',') : [];
	const allTypes = url?.types ? url.types.split(',') : [];
	const allDimensions = url?.dimensions ? url.dimensions.split(',') : [];
	const allTargetAudiences = url?.targetAudiences ? url.targetAudiences.split(',') : [];
	const allInstitutions = url?.institutions ? url.institutions.split(',') : [];
	const allKeywords = url?.keywords ? url.keywords.split(',') : [];

	return {
		query: decodeURIComponent(query),
		solution: url?.solution || '',
		page: Number(page),
		refinementList: {
			classification: allClassifications.map(decodeURIComponent),
			type: allTypes.map(decodeURIComponent),
			dimension: allDimensions.map(decodeURIComponent),
			targetAudience: allTargetAudiences.map(decodeURIComponent),
			institution: allInstitutions.map(decodeURIComponent),
			keywords: allKeywords.map(decodeURIComponent),
		},
		toggle: {
			forSale: !!url?.forSale,
		},
	};
};

export const findResultsState = async (
	app,
	initialSearchState,
	indexType = 'technology',
	props = {},
) => {
	const resultsState = await algoliaFindResultsState(app, {
		...algoliaDefaultConfig[indexType],
		searchState: initialSearchState,
		...props,
	});
	return resultsState;
};
