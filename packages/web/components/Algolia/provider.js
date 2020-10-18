import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

const algoliaClient = algoliasearch(
	process.env.ALGOLIA_APPLICATION_ID,
	process.env.ALGOLIA_SEARCH_KEY,
);

const defaultIndexName = `searchable_data_${process.env.ALGOLIA_INDEX_SUFIX}`;

export const algoliaDefaultConfig = {
	searchClient: algoliaClient,
	indexName: defaultIndexName,
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
	children,
	useProxy,
	searchState,
	onSearchStateChange,
	createURL,
	resultsState,
	onSearchParameters,
}) => (
	<InstantSearch
		indexName={defaultIndexName}
		searchClient={useProxy ? searchClient : algoliaClient}
		onSearchStateChange={onSearchStateChange}
		searchState={searchState}
		createURL={createURL}
		resultsState={resultsState}
		onSearchParameters={onSearchParameters}
	>
		{children}
	</InstantSearch>
);

AlgoliaSearchProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
	useProxy: PropTypes.bool,
	searchState: PropTypes.shape({}),
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
};

AlgoliaSearchProvider.defaultProps = {
	useProxy: false,
	searchState: null,
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
};

export default AlgoliaSearchProvider;
