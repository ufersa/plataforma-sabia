import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { MainSearch } from '../components/MainSearch';
import { searchStateToURL, urlToSearchState, findResultsState } from '../utils/algoliaHelper';

import { Intro, ListIdeas, RegisterIdea } from '../components/LandingPage';

const IdeasBank = ({ initialSearchState, resultsState }) => {
	const [searchState, setSearchState] = useState(initialSearchState);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Intro
				title="Não encontrou o que desejava?"
				subtitle="Aqui você pode sugerir novas ideias de desenvolvimento de pesquisa e tecnologia de acordo com sua necessidade e para resolver problemas comuns do nosso povo. Veja abaixo as ideias já sugeridas pelos nossos usuários e registre a sua também."
				image={{
					src: '/brainstorming-rafiki.svg',
					alt:
						'Pessoas fazendo um brainstorming com uma ilustração de uma grande lâmpada acima delas',
				}}
				link={{
					label: 'Cadastre sua ideia',
					href: 'register-idea',
					scroll: true,
				}}
			/>
			<ListIdeas
				searchState={searchState}
				resultsState={resultsState}
				onSearchStateChange={onSearchStateChange}
				createURL={searchStateToURL}
			/>
			<Element id="register-idea" name="register-idea" className="element">
				<RegisterIdea />
			</Element>
		</>
	);
};

IdeasBank.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
};

IdeasBank.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(MainSearch, initialSearchState, 'idea');
	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		initialSearchState,
		resultsState,
	};
};

export default IdeasBank;
