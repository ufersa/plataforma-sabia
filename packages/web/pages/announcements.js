import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import {
	Intro,
	ListItems,
	AnnouncementCard,
	RegisterAnnouncement,
} from '../components/LandingPage';
import { findResultsState, searchStateToURL, urlToSearchState } from '../utils/algoliaHelper';
import { ServerInstantSearch } from '../components/Algolia';
import { algoliaDefaultConfig } from '../components/Algolia/provider';

const AnnouncementsPage = ({ initialSearchState, resultsState }) => {
	const [searchState, setSearchState] = useState(initialSearchState);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Intro
				title="Encontre editais mais recentes"
				subtitle="Aqui você pode indicar novos editais publicados e realizar buscas nos registros mais atuais de incentivo à pesquisa e inovação. Quem sabe você encontra aquele investimento que precisa, hein?"
				image={{
					src: '/completed-rafiki.svg',
					alt:
						'Ilustração de uma mulher marcando itens como completados em uma folha de papel',
				}}
				link={{
					label: 'Cadastre um edital',
					href: 'register-announcement',
					scroll: true,
				}}
			/>
			<ListItems
				title="Banco de editais"
				searchPlaceholder="Qual edital você busca?"
				createURL={searchStateToURL}
				searchOptions={{
					indexName: algoliaDefaultConfig.announcement.indexName,
					searchState,
					createURL: searchStateToURL,
					resultsState,
					onSearchStateChange,
					sortBy: {
						defaultRefinement: algoliaDefaultConfig.announcement.indexName,
						items: [
							{
								label: 'Lançamento',
								value: `${algoliaDefaultConfig.announcement.indexName}_created_time_asc`,
							},
							{
								label: 'Atualização',
								value: `${algoliaDefaultConfig.announcement.indexName}_created_time_desc`,
							},
						],
					},
					hits: {
						component: AnnouncementCard,
						loadMore: 'Ver mais editais',
					},
				}}
			/>
			<Element id="register-announcement" name="register-announcement" className="element">
				<RegisterAnnouncement />
			</Element>
		</>
	);
};

AnnouncementsPage.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
};

AnnouncementsPage.getInitialProps = async ({ asPath }) => {
	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(ServerInstantSearch, initialSearchState, 'idea');
	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		initialSearchState,
		resultsState,
	};
};

export default AnnouncementsPage;
