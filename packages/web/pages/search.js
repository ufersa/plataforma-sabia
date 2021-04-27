import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Head from '../components/head';
import { MainSearch } from '../components/MainSearch';
import { searchStateToURL, urlToSearchState, findResultsState } from '../utils/algoliaHelper';

const SearchPage = ({ initialSearchState, resultsState }) => {
	const { t } = useTranslation(['pages']);
	const [searchState, setSearchState] = useState(initialSearchState);
	const router = useRouter();

	const onSearchStateChange = (newSearchState) => {
		const href = searchStateToURL(newSearchState);
		if (typeof window !== 'undefined') router.push(href, href, { shallow: true });

		setSearchState(newSearchState);
	};

	return (
		<>
			<Head
				title={t('pages:search.title')}
				description={t('pages:search.description')}
				keywords={t('pages:search.keywords')}
			/>
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
};

SearchPage.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(MainSearch, initialSearchState);
	return {
		namespacesRequired: ['common', 'search', 'card', 'helper', 'pages'],
		initialSearchState,
		resultsState,
	};
};

export default SearchPage;
