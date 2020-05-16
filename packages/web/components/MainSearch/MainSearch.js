import React from 'react';
import { Hits } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';

import {
	SearchBoxContainer,
	Container,
	FilterContainer,
	FilterContainerHeader,
	ResultsContainer,
	ResultsContainerHeader,
	ResultsFooter,
} from './styles';

import {
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
} from '../Algolia';

const MainSearch = () => {
	const { t } = useTranslation(['search', 'common']);
	return (
		<>
			<SearchBoxContainer>
				<DebouncedSearchBox placeholder={t('search:searchPlaceholder')} />
			</SearchBoxContainer>

			<Container>
				<FilterContainer>
					<FilterContainerHeader>
						<h2>{t('common:filters')}</h2>
						<ClearRefinements placeholder={t('common:clear')} />
					</FilterContainerHeader>
					<Panel header={t('common:region')}>
						<RefinementList
							attribute="region"
							placeholder={t('search:searchRegionPlaceholder')}
						/>
					</Panel>
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
									label: t('search:sortByPriceAsc'),
									value: 'searchable_data_price_asc',
								},
								{
									label: t('search:sortByPriceDesc'),
									value: 'searchable_data_price_desc',
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
					<ResultsFooter>
						<Pagination />
					</ResultsFooter>
				</ResultsContainer>
			</Container>
		</>
	);
};

export default MainSearch;
