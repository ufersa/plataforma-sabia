import React, { useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { findResultsState } from 'react-instantsearch-dom/server';
import { withRouter } from 'next/router';
import Head from '../components/head';
import { MainSearch } from '../components/MainSearch';
import { algoliaDefaultConfig } from '../components/Algolia/provider';

const DEBOUNCE_TIME = 200;

const encodedCategories = {
	agua: 'Água',
	saneamento: 'Saneamento',
	'energia-eletrica': 'Energia Elétrica',
	'energia-solar': 'Energia Solar',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
	const newKey = encodedCategories[key];
	const newValue = key;

	return {
		...acc,
		[newKey]: newValue,
	};
}, {});

const createURL = (state) => {
	const isDefaultRoute =
		!state.query &&
		state.page === 1 &&
		state.refinementList &&
		state.refinementList.category.length === 0;

	if (isDefaultRoute) {
		return '/search';
	}

	const queryParameters = {};

	if (state.query) {
		queryParameters.query = encodeURIComponent(state.query);
	}
	if (state.page !== 1) {
		queryParameters.page = state.page;
	}
	if (state.refinementList.category) {
		queryParameters.categories = state.refinementList.category
			.map((category) => decodedCategories[category] || category)
			.map(encodeURIComponent);
	}

	const queryString = qs.stringifyUrl(
		{ url: '', query: queryParameters },
		{ arrayFormat: 'comma' },
	);

	return `/search${queryString}`;
};

const searchStateToURL = (searchState) => (searchState ? createURL(searchState) : '');

const urlToSearchState = (path) => {
	const url = path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};
	const { query = '', page = 1 } = url;
	const allCategories = url?.categories ? url.categories.split(',') : [];

	return {
		query: decodeURIComponent(query),
		page,
		refinementList: {
			category: allCategories
				.map((category) => encodedCategories[category] || category)
				.map(decodeURIComponent),
		},
	};
};

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
	const resultsState = await findResultsState(MainSearch, {
		...algoliaDefaultConfig,
		searchState: initialSearchState,
	});
	return {
		namespacesRequired: ['common', 'search'],
		initialSearchState,
		resultsState,
	};
};

export default withRouter(SearchPage);
