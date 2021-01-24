import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteHits, HitsPerPage } from 'react-instantsearch-dom';
import { FiFilter } from 'react-icons/fi';
import Card from '../Card';
import { ThemeProvider } from '../../../styles';
import { AlgoliaSearchProvider, DebouncedSearchBox, SortBy } from '../../Algolia';
import { algoliaDefaultConfig } from '../../Algolia/provider';

import * as S from './styles';

const ListIdeas = ({
	searchState,
	resultsState,
	onSearchStateChange,
	createURL,
	onSearchParameters,
	widgetsCollector,
}) => {
	return (
		<AlgoliaSearchProvider
			widgetsCollector={widgetsCollector}
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
			onSearchParameters={onSearchParameters}
		>
			<ThemeProvider>
				<S.Wrapper>
					<S.Container>
						<S.Top>
							<S.Title>Banco de ideias</S.Title>
							<DebouncedSearchBox placeholder="Qual ideia você busca?" secondary />
							<S.SortWrapper>
								<FiFilter />
								<span>Ordenar por:</span>
								<SortBy
									defaultRefinement={algoliaDefaultConfig.idea.indexName}
									items={[
										{
											label: 'Lançamento',
											value: `${algoliaDefaultConfig.idea.indexName}_created_time_asc`,
										},
										{
											label: 'Atualização',
											value: `${algoliaDefaultConfig.idea.indexName}_updates_time_asc`,
										},
									]}
								/>
								<HitsPerPage
									items={[
										{
											label: '4 resultados por página',
											value: 4,
										},
										{
											label: '6 resultados por página',
											value: 6,
										},
										{
											label: '12 resultados por página',
											value: 12,
										},
									]}
									defaultRefinement={4}
								/>
							</S.SortWrapper>
						</S.Top>
						<S.Content>
							<InfiniteHits
								hitComponent={Card}
								translations={{
									loadMore: 'Ver mais ideias',
								}}
							/>
						</S.Content>
					</S.Container>
				</S.Wrapper>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

ListIdeas.propTypes = {
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	createURL: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	widgetsCollector: PropTypes.func,
};

ListIdeas.defaultProps = {
	onSearchStateChange: null,
	createURL: null,
	resultsState: null,
	onSearchParameters: null,
	widgetsCollector: null,
};

export default ListIdeas;