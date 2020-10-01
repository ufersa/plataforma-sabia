import React from 'react';
import { MainSearch } from '../../components/MainSearch';
import { appWithTranslation } from '../../utils/i18n';

import AlgoliaData from '../utils/fakeAlgoliaData';

export default {
	title: 'Algolia/Main Search',
	component: MainSearch,
};

const MainSearchTemplate = () => (
	<MainSearch
		searchState={AlgoliaData.searchState}
		resultsState={AlgoliaData.resultsState}
		onSearchStateChange={() => {}}
		createURL={() => {}}
		onSearchParameters={null}
	/>
);

export const MainSearchWithTranslations = appWithTranslation(MainSearchTemplate);
