import React from 'react';
import PropTypes from 'prop-types';
import { HitsPerPage, Hits, Configure, ScrollTo } from 'react-instantsearch-dom';
import { AlgoliaSearchProvider, DebouncedSearchBox, Pagination } from '../../../components/Algolia';
import { ThemeProvider } from '../../../styles';
import * as S from './styles';
import HitCard from '../HitCard';

const ITEMS_PER_PAGE = 20;

const SolutionList = ({
	indexName,
	searchState,
	resultsState,
	onSearchStateChange,
	onSearchParameters,
	widgetsCollector,
}) => {
	const filters = '__meta__.technologies_count > 0 OR __meta__.services_count > 0';

	return (
		<AlgoliaSearchProvider
			indexName={indexName}
			searchState={searchState}
			resultsState={resultsState}
			onSearchStateChange={onSearchStateChange}
			onSearchParameters={onSearchParameters}
			widgetsCollector={widgetsCollector}
		>
			<ThemeProvider>
				<S.Wrapper>
					<S.Container>
						<S.Top>
							<S.Title>Organização</S.Title>
							<DebouncedSearchBox
								placeholder="Qual instituição você busca?"
								secondary
							/>
							<S.SortWrapper>
								<HitsPerPage
									items={[
										{
											label: `${ITEMS_PER_PAGE} resultados por página`,
											value: ITEMS_PER_PAGE,
										},
									]}
									defaultRefinement={ITEMS_PER_PAGE}
								/>
							</S.SortWrapper>
						</S.Top>
						<S.Content>
							<Configure filters={filters} />

							<ScrollTo>
								<Hits hitComponent={HitCard} />
							</ScrollTo>
						</S.Content>
						<Pagination />
					</S.Container>
				</S.Wrapper>
			</ThemeProvider>
		</AlgoliaSearchProvider>
	);
};

SolutionList.propTypes = {
	indexName: PropTypes.string.isRequired,
	searchState: PropTypes.shape({}).isRequired,
	onSearchStateChange: PropTypes.func,
	resultsState: PropTypes.shape({}),
	onSearchParameters: PropTypes.func,
	widgetsCollector: PropTypes.func,
};

SolutionList.defaultProps = {
	onSearchStateChange: null,
	resultsState: null,
	onSearchParameters: null,
	widgetsCollector: null,
};

export default SolutionList;
