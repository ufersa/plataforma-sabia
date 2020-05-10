import React, { useState, useEffect } from 'react';
import qs from 'query-string';

const DEBOUNCE_TIME = 300;

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
		queryParameters.categories = state.refinementList.category.map(encodeURIComponent);
	}

	const queryString = qs.stringifyUrl(
		{ url: '', query: queryParameters },
		{ arrayFormat: 'comma' },
	);

	return `/search${queryString}`;
};

const searchStateToURL = (searchState) => (searchState ? createURL(searchState) : '');

const urlToSearchState = (location) => {
	const { query = '', page = 1, categories = [] } = qs.parse(location.search.slice(1));

	// return an array even if it's a single value
	const allCategories = Array.isArray(categories) ? categories : [categories].filter(Boolean);

	return {
		query: decodeURIComponent(query),
		page,
		refinementList: {
			category: allCategories.map(decodeURIComponent),
		},
	};
};

const withURLSync = (App) => (props) => {
	const [searchState, setSearchState] = useState({});
	const [debouncedSetState, setDebouncedSetState] = useState(null);

	const onPopState = ({ state }) => {
		setSearchState(state || {});
	};

	useEffect(() => {
		setSearchState(urlToSearchState(window.location));
		window.addEventListener('popstate', onPopState);
		return () => {
			window.removeEventListener('popstate', onPopState);
		};
	}, []);

	const onSearchStateChange = (newSearchState) => {
		clearTimeout(debouncedSetState);

		setDebouncedSetState(
			setTimeout(() => {
				window.history.pushState(newSearchState, null, searchStateToURL(newSearchState));
			}, DEBOUNCE_TIME),
		);

		setSearchState(newSearchState);
	};

	return (
		<App
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
			searchState={searchState}
			onSearchStateChange={onSearchStateChange}
			createURL={searchStateToURL}
		/>
	);
};

export default withURLSync;
