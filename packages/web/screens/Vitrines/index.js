import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { algoliaDefaultConfig } from '../../components/Algolia/provider';
import Head from '../../components/head';
import { findResultsState, searchStateToURL, urlToSearchState } from '../../utils/algoliaHelper';
import SolutionList from './SolutionList';
import * as S from './styles';

const ShowcasePage = ({ initialSearchState, resultsState }) => {
	const [searchState, setSearchState] = useState(initialSearchState);
	const { t } = useTranslation(['pages']);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Head
				title={t('pages:showcase.list.title')}
				description={t('pages:showcase.list.description')}
				keywords={t('pages:showcase.list.keywords')}
			/>
			<S.Wrapper>
				<S.Background>
					<S.ShowcaseHeader>
						<S.Title align="left">Vitrines tecnológicas</S.Title>
						<p>Instituições e Empresas com soluções cadastradas na Plataforma Sabiá</p>
					</S.ShowcaseHeader>
				</S.Background>
				<S.Background gray>
					<S.ListWrapper>
						<SolutionList
							indexName={algoliaDefaultConfig.institution.indexName}
							searchState={searchState}
							resultsState={resultsState}
							onSearchStateChange={onSearchStateChange}
						/>
					</S.ListWrapper>
				</S.Background>
			</S.Wrapper>
		</>
	);
};

ShowcasePage.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
};

ShowcasePage.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(SolutionList, initialSearchState, 'institution');

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		initialSearchState,
		resultsState,
	};
};

export default ShowcasePage;
