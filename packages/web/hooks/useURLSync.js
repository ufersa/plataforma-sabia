import { useState, useEffect } from 'react';
import qs from 'query-string';

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

const urlToSearchState = (location) => {
	const url = qs.parse(location.search.slice(1));
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

function useURLSync() {
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

	return { searchState, createURL, onSearchStateChange };
}

export default useURLSync;
