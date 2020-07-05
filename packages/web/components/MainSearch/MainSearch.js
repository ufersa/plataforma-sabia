import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hits } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '../../styles';

import {
	SearchBoxContainer,
	Container,
	FilterContainer,
	FilterContainerHeader,
	MobileButtonsContainer,
	FilterContainerBody,
	ResultsContainer,
	ResultsContainerHeader,
	ResultsFooter,
} from './styles';

import {
	AlgoliaSearchProvider,
	DebouncedSearchBox,
	Stats,
	SortBy,
	HitsPerPage,
	HitCard,
	Pagination,
	ClearRefinements,
	Panel,
	RefinementList,
	ToggleRefinement,
	MobileFilterButton,
	ResultsButton,
} from '../Algolia';

const MainSearch = ({
	searchState,
	resultsState,
	onSearchStateChange,
	createURL,
	onSearchParameters,
}) => {
	const { t } = useTranslation(['search', 'common']);
	const [openMobileFilters, setOpenMobileFilters] = useState(false);
	// const containerRef = useRef(null);

	const handleOpenMobileFiltes = () => {
		setOpenMobileFilters(true);
		// containerRef.current.scrollIntoView();
		window.scrollTo({ top: 0 });
	};

	return (
		<AlgoliaSearchProvider
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
			onSearchParameters={onSearchParameters}
		>
			<ThemeProvider>
				<SearchBoxContainer>
					<DebouncedSearchBox placeholder={t('search:searchPlaceholder')} />
				</SearchBoxContainer>

				{/* <Container ref={containerRef}> */}
				<Container>
					<FilterContainer openMobile={openMobileFilters}>
						<FilterContainerHeader>
							<h2>{t('common:filters')}</h2>
							<ClearRefinements placeholder={t('common:clear')} />
						</FilterContainerHeader>
						<FilterContainerBody>
							<Panel header={t('common:technologies')}>
								<ToggleRefinement
									attribute="private"
									label={t('search:filterOnlyPublic')}
									value={0}
								/>
							</Panel>
							<Panel header={t('common:category')}>
								<RefinementList
									attribute="category"
									placeholder={t('search:searchCategoryPlaceholder')}
								/>
							</Panel>
							<MobileButtonsContainer>
								<ResultsButton onClick={() => setOpenMobileFilters(false)} />
							</MobileButtonsContainer>
						</FilterContainerBody>
					</FilterContainer>
					<ResultsContainer>
						<ResultsContainerHeader>
							<Stats />
							<SortBy
								defaultRefinement="searchable_data"
								items={[
									{
										label: t('search:sortByRelevance'),
										value: 'searchable_data',
									},
									{
										label: t('search:sortByInstallationTimeAsc'),
										value: 'searchable_data_installation_time_asc',
									},
									{
										label: t('search:sortByInstallationTimeDesc'),
										value: 'searchable_data_installation_time_desc',
									},
								]}
							/>
							<HitsPerPage
								items={[
									{
										label: t('search:perPage', { results: 12 }),
										value: 12,
									},
									{
										label: t('search:perPage', { results: 24 }),
										value: 24,
									},
									{
										label: t('search:perPage', { results: 36 }),
										value: 36,
									},
								]}
								defaultRefinement={12}
							/>
						</ResultsContainerHeader>
						<Hits hitComponent={HitCard} />
						<MobileFilterButton onClick={handleOpenMobileFiltes}>
							{t('search:filter')}
						</MobileFilterButton>
						<ResultsFooter>
							<Pagination />
						</ResultsFooter>
					</ResultsContainer>
				</Container>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

MainSearch.propTypes = {
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
};

MainSearch.defaultProps = {
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
};

export default MainSearch;
