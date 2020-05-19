import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Head from '../components/head';
import { MainSearch } from '../components/MainSearch';
import { searchStateToURL, urlToSearchState, findResultsState } from '../utils/algoliaHelper';

const DEBOUNCE_TIME = 200;

const SearchPage = ({ initialSearchState, resultsState, router }) => {
	const [searchState, setSearchState] = useState(initialSearchState);
	const [debouncedSetState, setDebouncedSetState] = useState(null);

	const onSearchStateChange = (newSearchState) => {
		clearTimeout(debouncedSetState);

		setDebouncedSetState(
			setTimeout(() => {
				const href = searchStateToURL(newSearchState);

				router.push(href, href, { shallow: true });
			}, DEBOUNCE_TIME),
		);

		setSearchState(newSearchState);
	};

	return (
		<>
			<Head title="Search" />
			<MainSearch
				searchState={searchState}
				resultsState={resultsState}
				onSearchStateChange={onSearchStateChange}
				createURL={searchStateToURL}
			/>
		</>
	);
};

SearchPage.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
	router: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
};

SearchPage.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(MainSearch, initialSearchState);
	return {
		namespacesRequired: ['common', 'search'],
		initialSearchState,
		resultsState,
	};
};

export default withRouter(SearchPage);
