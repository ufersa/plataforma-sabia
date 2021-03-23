/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '../../styles';
import AlgoliaSearchProvider from './provider';
import DebouncedSearchBox from './debouncedSearchBox';

const ServerInstantSearch = ({
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
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	searchClient: PropTypes.shape({}),
	widgetsCollector: PropTypes.func,
};

ServerInstantSearch.defaultProps = {
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
	searchClient: {},
	widgetsCollector: null,
};

export default ServerInstantSearch;
