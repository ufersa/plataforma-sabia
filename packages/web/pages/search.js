import React from 'react';
import styled from 'styled-components';
import { Hits } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';
import Head from '../components/head';

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
} from '../components/Algolia';

const Search = () => {
	const { t } = useTranslation(['search', 'common']);
	return (
		<AlgoliaSearchProvider useProxy={false}>
			<Head title="Search" />
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
		</AlgoliaSearchProvider>
	);
};

const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme }) => theme.colors.orange};
`;

const Container = styled.main`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;
`;

const FilterContainer = styled.section`
	flex: 1;
	margin-right: 3rem;
	min-width: 30rem;
`;

const FilterContainerHeader = styled.div`
	display: flex;
	align-items: center;
	min-height: 8rem;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	h2 {
		flex: 1;
		font-size: 2.4rem;
	}
`;

const ResultsContainer = styled.section`
	width: 100%;

	.ais-Hits {
		padding-top: 4rem;

		.ais-Hits-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
			grid-gap: 5rem 3rem;
		}
	}
`;

const ResultsContainerHeader = styled.div`
	min-height: 8rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	> div:not(:first-child) {
		margin-left: 3rem;
	}
`;

const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
`;

Search.getInitialProps = async () => {
	return {
		namespacesRequired: ['common', 'search'],
	};
};

export default Search;
