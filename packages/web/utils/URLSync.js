import React, { useState, useEffect } from 'react';
import qs from 'query-string';

const updateAfter = 200;

const createURL = (state) => `?${qs.stringify(state)}`;

const searchStateToURL = (searchState) =>
	searchState ? `${window.location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = ({ search }) => qs.parse(search.slice(1));

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
			}, updateAfter),
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
