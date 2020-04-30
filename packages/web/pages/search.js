import React from 'react';
import styled from 'styled-components';
import { Hits } from 'react-instantsearch-dom';
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
	return (
		<AlgoliaSearchProvider useProxy={false}>
			<Head title="Search" />
			<SearchBoxContainer>
				<DebouncedSearchBox />
			</SearchBoxContainer>

			<Container>
				<FilterContainer>
					<FilterContainerHeader>
						<h2>Filtros</h2>
						<ClearRefinements />
					</FilterContainerHeader>
					<Panel header="Região">
						<RefinementList attribute="region" placeholder="Busque por região..." />
					</Panel>
					<Panel header="Tecnologias">
						<ToggleRefinement
							attribute="private"
							label="Apenas tecnologias públicas"
							value={0}
						/>
					</Panel>
					<Panel header="Categoria">
						<RefinementList
							attribute="category"
							placeholder="Busque por categoria..."
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
									label: 'Classificação padrão',
									value: 'searchable_data',
								},
								{
									label: 'Preço ascendente',
									value: 'searchable_data_price_asc',
								},
								{
									label: 'Preço descendente',
									value: 'searchable_data_price_desc',
								},
							]}
						/>
						<HitsPerPage
							items={[
								{
									label: '12 resultados por página',
									value: 12,
								},
								{
									label: '24 resultados por página',
									value: 24,
								},
								{
									label: '36 resultados por página',
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

	> div:not(first-child) {
		margin-left: 3rem;
	}
`;

const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
`;

export default Search;
