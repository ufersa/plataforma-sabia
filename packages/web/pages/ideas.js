import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { useTranslation } from 'next-i18next';
import { algoliaDefaultConfig } from '../components/Algolia/provider';
import { searchStateToURL, urlToSearchState, findResultsState } from '../utils/algoliaHelper';
import { Intro, ListItems, RegisterIdea, IdeaCard } from '../components/LandingPage';
import Head from '../components/head';

const searchComponents = {
	sortBy: {
		defaultRefinement: algoliaDefaultConfig.idea.indexName,
		items: [
			{
				label: 'Lançamento',
				value: `${algoliaDefaultConfig.idea.indexName}_created_at_asc`,
			},
			{
				label: 'Atualização',
				value: `${algoliaDefaultConfig.idea.indexName}_created_at_desc`,
			},
		],
	},
	hits: {
		component: IdeaCard,
		loadMore: 'Ver mais ideias',
	},
};

const IdeasBank = ({ initialSearchState, resultsState }) => {
	const [searchState, setSearchState] = useState(initialSearchState);
	const { t } = useTranslation(['pages']);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Head
				title={t('pages:ideas.title')}
				description={t('pages:ideas.description')}
				keywords={t('pages:ideas.keywords')}
			/>
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
			<ListItems
				title="Banco de ideias"
				searchPlaceholder="Qual ideia você busca?"
				createURL={searchStateToURL}
				indexName={algoliaDefaultConfig.idea.indexName}
				searchState={searchState}
				resultsState={resultsState}
				onSearchStateChange={onSearchStateChange}
				searchComponents={searchComponents}
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
	const resultsState = await findResultsState(ListItems, initialSearchState, 'idea', {
		searchComponents,
	});
	return {
		namespacesRequired: ['common', 'search', 'card', 'helper', 'pages'],
		initialSearchState,
		resultsState,
	};
};

export default IdeasBank;
