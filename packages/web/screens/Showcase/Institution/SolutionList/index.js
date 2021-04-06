import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	HitsPerPage,
	Hits,
	Index,
	connectHits,
	connectStateResults,
	Configure,
} from 'react-instantsearch-dom';
import { AlgoliaSearchProvider, DebouncedSearchBox } from '../../../../components/Algolia';
import { algoliaDefaultConfig } from '../../../../components/Algolia/provider';
import { ThemeProvider } from '../../../../styles';
import * as S from './styles';
import { SolutionCard, SolutionsWrapper } from '../../../../components/SolutionsSection';
import { useTheme } from '../../../../hooks';

const Results = connectStateResults(({ searchResults, type, current, onChange }) => {
	useEffect(() => {
		if (
			type &&
			typeof searchResults?.nbHits !== 'undefined' &&
			current !== searchResults?.nbHits
		) {
			onChange((old) => ({ ...old, [type]: searchResults?.nbHits }));
		}
	}, [current, onChange, searchResults, type]);
	return null;
});

const SolutionList = ({
	indexName,
	searchState,
	resultsState,
	onSearchStateChange,
	onSearchParameters,
	widgetsCollector,
}) => {
	const [searchLength, setSearchLength] = useState({
		technology: 0,
		service: 0,
	});
	const theme = useTheme();

	const institutionId = 12;

	const filters = `institution_id: ${institutionId}`;

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
							<S.Title>Vitrine tecnológica</S.Title>
							<DebouncedSearchBox placeholder="Qual solução você busca?" secondary />
							<S.SortWrapper>
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
							<Index indexName={algoliaDefaultConfig.technology.indexName}>
								<Configure filters={filters} />
								<Results
									type="technology"
									current={searchLength.technology}
									onChange={setSearchLength}
								/>

								{!!searchLength.technology && (
									<SolutionsWrapper
										containerPadding="3.2rem 0"
										header="Tecnologias em destaque"
										headerComponent="title"
										headerProps={{
											align: 'left',
											color: theme.colors.silver,
											centerInMobile: true,
										}}
										algoliaCustomCss={S.algoliaListCss}
										overwriteAlgoliaStyles
									>
										<Hits
											hitComponent={connectHits(({ hit }) => (
												<SolutionCard type="technology" data={hit} />
											))}
										/>
									</SolutionsWrapper>
								)}
							</Index>

							<Index indexName={algoliaDefaultConfig.service.indexName}>
								<Configure filters={filters} />
								<Results
									type="service"
									current={searchLength.service}
									onChange={setSearchLength}
								/>
								{!!searchLength.service && (
									<SolutionsWrapper
										containerPadding="3.2rem 0"
										header="Serviços em destaque"
										headerComponent="title"
										headerProps={{
											align: 'left',
											color: theme.colors.silver,
											centerInMobile: true,
										}}
										algoliaCustomCss={S.algoliaListCss}
										overwriteAlgoliaStyles
									>
										<Hits
											hitComponent={connectHits(({ hit }) => (
												<SolutionCard type="service" data={hit} />
											))}
										/>
									</SolutionsWrapper>
								)}
							</Index>
						</S.Content>
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
