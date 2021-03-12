import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteHits, HitsPerPage } from 'react-instantsearch-dom';
import { FiFilter } from 'react-icons/fi';
import { ThemeProvider } from '../../../styles';
import { AlgoliaSearchProvider, DebouncedSearchBox, SortBy } from '../../Algolia';

import * as S from './styles';

const ListItems = ({
	title,
	searchPlaceholder,
	searchOptions: {
		searchState,
		resultsState,
		onSearchStateChange,
		createURL,
		onSearchParameters,
		widgetsCollector,
		sortBy,
		hits,
	},
}) => {
	return (
		<AlgoliaSearchProvider
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			createURL={createURL}
			onSearchParameters={onSearchParameters}
			widgetsCollector={widgetsCollector}
		>
			<ThemeProvider>
				<S.Wrapper>
					<S.Container>
						<S.Top>
							<S.Title>{title}</S.Title>
							<DebouncedSearchBox placeholder={searchPlaceholder} secondary />
							<S.SortWrapper>
								<FiFilter />
								<span>Ordenar por:</span>
								<SortBy
									defaultRefinement={sortBy.defaultRefinement}
									items={sortBy.items}
								/>
								<HitsPerPage
									items={[
										{
											label: '4 resultados por página',
											value: 4,
										},
									]}
									defaultRefinement={4}
								/>
							</S.SortWrapper>
						</S.Top>
						<S.Content>
							<InfiniteHits
								hitComponent={hits.component}
								translations={{
									loadMore: hits.loadMore,
								}}
							/>
						</S.Content>
					</S.Container>
				</S.Wrapper>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

ListItems.propTypes = {
	title: PropTypes.string.isRequired,
	searchPlaceholder: PropTypes.string.isRequired,
	searchOptions: PropTypes.shape({
		searchState: PropTypes.shape({}).isRequired,
		onSearchStateChange: PropTypes.func,
		createURL: PropTypes.func,
		resultsState: PropTypes.shape({}),
		onSearchParameters: PropTypes.func,
		widgetsCollector: PropTypes.func,
		sortBy: PropTypes.shape({
			defaultRefinement: PropTypes.string.isRequired,
			items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
		}).isRequired,
		hits: PropTypes.shape({
			component: PropTypes.func,
			loadMore: PropTypes.string.isRequired,
		}).isRequired,
	}),
};

ListItems.defaultProps = {
	searchOptions: {
		onSearchStateChange: null,
		createURL: null,
		resultsState: null,
		onSearchParameters: null,
		widgetsCollector: null,
	},
};

export default ListItems;
