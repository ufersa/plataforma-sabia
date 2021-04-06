import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { algoliaDefaultConfig } from '../../../components/Algolia/provider';
import { findResultsState, searchStateToURL, urlToSearchState } from '../../../utils/algoliaHelper';
import SolutionList from './SolutionList';

import * as S from './styles';

const InstitutionShowcasePage = ({ initialSearchState, resultsState }) => {
	const [searchState, setSearchState] = useState(initialSearchState);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<S.Wrapper>
			<S.Background>
				<S.InstitutionInfos>
					<img src="http://via.placeholder.com/170" alt="Institution thumbnail" />

					<div>
						<h2>UFERSA - Universidade Federal Rural do Semi-Árido</h2>
						<p>1343 Nacde Turnpike</p>
						<p>WW2dDZ6w3heQbL%QR6Du</p>
						<p>40627%QR6Du</p>
						<p>Lemukrik</p>
						<p>FL</p>
						<p>www.google.com</p>
					</div>
				</S.InstitutionInfos>
			</S.Background>
			<S.Background gray>
				<S.ListWrapper>
					<SolutionList
						indexName={algoliaDefaultConfig.technology.indexName}
						searchState={searchState}
						resultsState={resultsState}
						onSearchStateChange={onSearchStateChange}
					/>
				</S.ListWrapper>
			</S.Background>
		</S.Wrapper>
	);
};

InstitutionShowcasePage.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
};

InstitutionShowcasePage.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(SolutionList, initialSearchState, 'technology');

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		initialSearchState,
		resultsState,
	};
};

export default InstitutionShowcasePage;
