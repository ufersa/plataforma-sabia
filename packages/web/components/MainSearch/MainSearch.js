/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Hits } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { ThemeProvider } from '../../styles';
import { getTabs, getSolutionsComponents } from './solutionsAlgoliaComponents';
import { TabPanel } from '../Tab';

import {
	Wrapper,
	Container,
	FilterContainer,
	FilterContainerHeader,
	MobileCloseButton,
	MobileButtonsContainer,
	FilterContainerBody,
	ResultsContainer,
	ResultsContainerHeader,
	HitsWrapper,
	ResultsFooter,
	Tab,
	TabList,
	TabsHeader,
} from './styles';

import {
	AlgoliaSearchProvider,
	DebouncedSearchBox,
	Stats,
	SortBy,
	HitsPerPage,
	Pagination,
	ClearRefinements,
	Panel,
	ResultsButton,
	ClearFiltersButton,
	ScrollTo,
} from '../Algolia';

import { MobileFilterButton } from '../Mobile';

const MainSearch = ({
	searchState,
	resultsState,
	onSearchStateChange,
	createURL,
	onSearchParameters,
	widgetsCollector,
}) => {
	const { t } = useTranslation(['search', 'common']);
	const [openMobileFilters, setOpenMobileFilters] = useState(false);

	const tabs = useMemo(() => getTabs(t), [t]);
	const solutionsComponents = useMemo(() => getSolutionsComponents(t), [t]);

	const [activeSolutionTab, setActiveSolutionTab] = useState(
		tabs.find((tab) => tab.slug === searchState.solution)?.slug || 'technologies',
	);

	const handleOpenMobileFilters = () => {
		setOpenMobileFilters(true);
		window.scrollTo({ top: 0 });
	};

	return (
		<AlgoliaSearchProvider
			indexName={solutionsComponents[activeSolutionTab].indexName}
			widgetsCollector={widgetsCollector}
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
			onSearchParameters={onSearchParameters}
		>
			<ThemeProvider>
				<ScrollTo alignToTop={false} scrollOn="query">
					<DebouncedSearchBox placeholder={t('search:searchPlaceholder')} />
				</ScrollTo>
				<Wrapper>
					<Container
						onSelect={(index) => {
							setActiveSolutionTab(tabs[index].slug);
						}}
						selectedIndex={tabs.findIndex((tab) => tab.slug === activeSolutionTab)}
					>
						<FilterContainer openMobile={openMobileFilters}>
							<FilterContainerHeader>
								<h2>{t('common:filters')}</h2>
								<ClearRefinements placeholder={t('common:clear')} />
								<MobileCloseButton onClick={() => setOpenMobileFilters(false)}>
									<AiOutlineClose />
								</MobileCloseButton>
							</FilterContainerHeader>
							<Stats />
							<FilterContainerBody>
								{solutionsComponents[activeSolutionTab].filters.map((filter) => (
									<Panel key={filter.header} header={filter.header}>
										<filter.component
											{...filter.componentProps}
											placeholder={filter.componentProps.placeholder}
											label={filter.componentProps.label}
										/>
									</Panel>
								))}
								<MobileButtonsContainer>
									<ResultsButton onClick={() => setOpenMobileFilters(false)} />
									<ClearFiltersButton />
								</MobileButtonsContainer>
							</FilterContainerBody>
						</FilterContainer>
						<ResultsContainer>
							<TabsHeader>
								<TabList>
									{tabs.map((tab) => (
										<Tab key={tab.slug} data-testid={tab.id}>
											{tab.label}
										</Tab>
									))}
								</TabList>
							</TabsHeader>

							{tabs.map((tab) => (
								<TabPanel key={tab.id}>
									<ResultsContainerHeader>
										<SortBy
											defaultRefinement={
												tab.components.sortBy.defaultRefinement
											}
											items={tab.components.sortBy.items.map((item) => ({
												label: item.label,
												value: item.value,
											}))}
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
									<HitsWrapper>
										<Hits hitComponent={tab.components.hits.hitComponent} />
									</HitsWrapper>
								</TabPanel>
							))}

							<MobileFilterButton onClick={handleOpenMobileFilters}>
								{t('search:filter')}
							</MobileFilterButton>
							<ResultsFooter>
								<Pagination />
							</ResultsFooter>
						</ResultsContainer>
					</Container>
				</Wrapper>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

MainSearch.propTypes = {
	searchState: PropTypes.shape({
		solution: PropTypes.string,
	}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	widgetsCollector: PropTypes.func,
};

MainSearch.defaultProps = {
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
	widgetsCollector: null,
};

export default MainSearch;
