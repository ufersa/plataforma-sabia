import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import config from '../../config';

const algoliaClient = algoliasearch(config.ALGOLIA_APPLICATION_ID, config.ALGOLIA_SEARCH_KEY);

export const algoliaDefaultConfig = {
	technology: {
		searchClient: algoliaClient,
		indexName: config.ALGOLIA_INDEX_TECHNOLOGY,
		querySuggestionsIndex: config.ALGOLIA_QUERY_SUGGESTIONS_INDEX_TECHNOLOGY,
	},
	idea: {
		searchClient: algoliaClient,
		indexName: config.ALGOLIA_INDEX_IDEA,
		querySuggestionsIndex: config.ALGOLIA_QUERY_SUGGESTIONS_INDEX_IDEA,
	},
};

const searchClient = {
	search(requests) {
		if (requests.every(({ params }) => params.query.length < 3)) {
			return Promise.resolve({
				results: requests.map(() => ({
					hits: [],
					nbHits: 0,
					nbPages: 0,
					processingTimeMS: 0,
				})),
			});
		}
		return algoliaClient.search(requests);
	},
};

const AlgoliaSearchProvider = ({
	indexType,
	children,
	useProxy,
	searchState,
	onSearchStateChange,
	createURL,
	resultsState,
	onSearchParameters,
	widgetsCollector,
}) => (
	<InstantSearch
		indexName={algoliaDefaultConfig[indexType].querySuggestionsIndex}
		searchClient={useProxy ? searchClient : algoliaClient}
		onSearchStateChange={onSearchStateChange}
		searchState={searchState}
		createURL={createURL}
		resultsState={resultsState}
		onSearchParameters={onSearchParameters}
		widgetsCollector={widgetsCollector}
	>
		{children}
	</InstantSearch>
);

AlgoliaSearchProvider.propTypes = {
	indexType: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
	useProxy: PropTypes.bool,
	searchState: PropTypes.shape({}),
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	widgetsCollector: PropTypes.func,
};

AlgoliaSearchProvider.defaultProps = {
	indexType: 'technology',
	useProxy: false,
	searchState: null,
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
	widgetsCollector: null,
};

export default AlgoliaSearchProvider;
