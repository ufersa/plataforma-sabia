import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	ClearRefinements,
	Panel,
	Hits,
	SortBy,
	HitsPerPage,
	RefinementList,
	Pagination,
	Stats,
} from 'react-instantsearch-dom';
import { AiOutlineReload } from 'react-icons/ai';
import { AlgoliaSearchProvider } from '../providers';

import Head from '../components/head';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';

const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme }) => theme.colors.orange};
`;

const Container = styled.main`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;
`;

const SideWrapper = styled.div``;

const FilterContainer = styled.section`
	flex: 1;
	margin-right: 3rem;
	min-width: 30rem;
`;

const FilterContainerHeader = styled.div`
	min-height: 8rem;
	align-items: center;
	display: flex;
	justify-content: space-between;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	h2 {
		font-size: 2.4rem;
	}

	.ais-ClearRefinements {
		font-size: 1.2rem;

		&-button {
			font-weight: 400;
			background: none;
			border: 0;
		}
	}
`;

const ClearFilter = styled.div`
	display: flex;
	align-items: center;

	svg {
		margin-right: 0.8rem;
	}
`;

const FilterContainerBody = styled.div`
	padding: 4rem 0;

	.ais-Panel {
		&-header {
			line-height: 1.6;
			font-weight: 500;
			text-transform: uppercase;
			margin-bottom: 1rem;

			&-body {
			}
		}
	}

	.ais-SearchBox {
		&-input {
			min-height: 4rem;
			width: 100%;
			padding: 1.5rem 2rem;
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			color: ${({ theme }) => theme.colors.black};
			font-weight: 400;
			font-size: 1.4rem;
		}

		&-submit,
		&-reset {
			display: none;
		}
	}

	.ais-RefinementList {
		&-item {
			margin-top: 2rem;
			cursor: pointer;
		}

		&-label {
			display: flex;
			align-items: center;
		}

		&-checkbox {
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			color: ${({ theme }) => theme.colors.black};
			height: 2rem;
			width: 2rem;
			margin-right: 2rem;
		}

		&-labelText {
			font-size: 1.8rem;
			margin-right: 1.5rem;
			color: ${({ theme }) => theme.colors.darkGray};
		}

		&-count {
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			color: ${({ theme }) => theme.colors.black};
			font-size: 1.3rem;
			padding: 0.2rem 0.5rem;
			font-weight: 500;
		}
	}
`;

const ResultsContainer = styled.section`
	width: 100%;

	.ais-Hits {
		padding-top: 4rem;

		&-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr)); /* auto-fit x auto-fill */
			grid-gap: 5rem 3rem;
		}
	}
`;

const ResultsHeader = styled.div`
	min-height: 8rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	select {
		font-size: 1.6rem;
		background: none;
		border: none;
	}

	.ais-Stats {
		flex: 1;

		&-text {
			font-size: 1.4rem;
			color: ${({ theme }) => theme.colors.darkGray};
		}
	}

	.ais-HitsPerPage-select {
		margin-left: 3rem;
	}
`;

const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
	font-size: 1.6rem;

	.ais-Pagination-list {
		display: flex;
		justify-content: center;

		li:not(:first-child) {
			margin-left: 0.4rem;
		}

		li:not(:last-child) {
			margin-right: 0.4rem;
		}
	}

	.ais-Pagination-item {
		height: 5rem;
		width: 5rem;

		&--disabled {
			opacity: 0.33;
		}
	}

	.ais-Pagination-link {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
		height: 100%;
		width: 100%;
		background-color: ${({ theme }) => theme.colors.gray98};
		color: ${({ theme }) => theme.colors.black};

		&--selected {
			background-color: ${({ theme }) => theme.colors.orange};
			color: ${({ theme }) => theme.colors.white};
		}
	}
`;

const HitCard = ({
	hit: { id, title, category, price, image, place, date, likes, weeks, region },
}) => {
	return (
		<Card
			title={title}
			category={category}
			price={price}
			image={image}
			place={place}
			date={new Date(date)}
			likes={likes}
			weeks={weeks}
			region={region}
			url={`technology/${id}`}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
		image: PropTypes.string,
		place: PropTypes.string,
		date: PropTypes.string,
		likes: PropTypes.number,
		weeks: PropTypes.number,
		region: PropTypes.string,
	}).isRequired,
};

const Search = () => {
	return (
		<AlgoliaSearchProvider useProxy={false}>
			<Head title="Search" />
			<SearchBoxContainer>
				<SearchBox />
			</SearchBoxContainer>

			<Container>
				<SideWrapper>
					<FilterContainer>
						<FilterContainerHeader>
							<h2>Filtros</h2>
							<ClearFilter data-layout="desktop">
								<ClearRefinements
									translations={{
										reset: (
											<>
												<AiOutlineReload />
												Limpar
											</>
										),
									}}
								/>
							</ClearFilter>
						</FilterContainerHeader>
						<FilterContainerBody>
							<Panel header="Região">
								<RefinementList
									attribute="region"
									limit={30}
									searchable
									translations={{
										placeholder: 'Busque por região...',
									}}
									noResults="Nenhum resultado"
									operator="or"
								/>
							</Panel>
						</FilterContainerBody>
					</FilterContainer>
				</SideWrapper>
				<ResultsContainer>
					<ResultsHeader>
						<Stats
							translations={{
								stats(nbHits) {
									return `${nbHits} soluções encontradas`;
								},
							}}
						/>
						<SortBy
							defaultRefinement="searchable_data"
							items={[
								{
									label: 'Classificar por mais relevante',
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
					</ResultsHeader>
					<Hits hitComponent={HitCard} />
					<ResultsFooter>
						<Pagination showFirst={false} showLast={false} />
					</ResultsFooter>
				</ResultsContainer>
			</Container>
		</AlgoliaSearchProvider>
	);
};

export default Search;
