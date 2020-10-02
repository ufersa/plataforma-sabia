import React, { useState } from 'react';
import { MainSearch } from '../../components/MainSearch';
import { appWithTranslation } from '../../utils/i18n';
import Head from '../../components/head';

export default {
	title: 'Algolia/Main Search',
	component: MainSearch,
};
const AlgoliaSearch = () => {
	const [searchState, setSearchState] = useState({});

	const onSearchStateChange = (newSearchState) => {
		setSearchState(newSearchState);
	};

	return (
		<>
			<Head title="Search" />
			<MainSearch searchState={searchState} onSearchStateChange={onSearchStateChange} />
		</>
	);
};
export const MainSearchWithTranslation = appWithTranslation(AlgoliaSearch);
