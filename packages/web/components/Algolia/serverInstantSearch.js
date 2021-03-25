/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '../../styles';
import AlgoliaSearchProvider from './provider';
import DebouncedSearchBox from './debouncedSearchBox';

const ServerInstantSearch = ({
	indexName,
	searchState,
	resultsState,
	onSearchStateChange,
	createURL,
	onSearchParameters,
	widgetsCollector,
	searchClient,
	...props
}) => {
	const { t } = useTranslation(['search', 'common']);

	return (
		<AlgoliaSearchProvider
			indexName={indexName}
			searchClient={searchClient}
			searchState={searchState}
			resultsState={resultsState}
			onSearchParameters={onSearchParameters}
			widgetsCollector={widgetsCollector}
			{...props}
		>
			<ThemeProvider>
				<DebouncedSearchBox placeholder={t('search:searchPlaceholder')} />
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

ServerInstantSearch.propTypes = {
	indexName: PropTypes.string,
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	searchClient: PropTypes.shape({}),
	widgetsCollector: PropTypes.func,
};

ServerInstantSearch.defaultProps = {
	indexName: '',
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
	searchClient: {},
	widgetsCollector: null,
};

export default ServerInstantSearch;
