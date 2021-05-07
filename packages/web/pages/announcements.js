import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import useTranslation from 'next-translate/useTranslation';
import {
	Intro,
	ListItems,
	AnnouncementCard,
	RegisterAnnouncement,
} from '../components/LandingPage';
import { findResultsState, searchStateToURL, urlToSearchState } from '../utils/algoliaHelper';
import { algoliaDefaultConfig } from '../components/Algolia/provider';
import Head from '../components/head';

const searchComponents = {
	sortBy: {
		defaultRefinement: algoliaDefaultConfig.announcement.indexName,
		items: [
			{
				label: 'Lançamento',
				value: `${algoliaDefaultConfig.announcement.indexName}_created_at_asc`,
			},
			{
				label: 'Atualização',
				value: `${algoliaDefaultConfig.announcement.indexName}_created_at_desc`,
			},
		],
	},
	hits: {
		component: AnnouncementCard,
		loadMore: 'Ver mais editais',
	},
};

const AnnouncementsPage = ({ initialSearchState, resultsState }) => {
	const { t } = useTranslation(['pages']);

	const [searchState, setSearchState] = useState(initialSearchState);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Head
				title={t('pages:announcements.title')}
				description={t('pages:announcements.description')}
				keywords={t('pages:announcements.keywords')}
			/>
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
				indexName={algoliaDefaultConfig.announcement.indexName}
				searchState={searchState}
				resultsState={resultsState}
				onSearchStateChange={onSearchStateChange}
				searchComponents={searchComponents}
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
	const resultsState = await findResultsState(ListItems, initialSearchState, 'announcement', {
		searchComponents,
	});
	return {
		initialSearchState,
		resultsState,
	};
};

export default AnnouncementsPage;
