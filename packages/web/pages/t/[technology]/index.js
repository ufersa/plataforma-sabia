import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { getTechnology, getTechnologies } from '../../../services/technology';
import { TechnologiesSection } from '../../../components/TechnologiesSection';
import { useTheme } from '../../../hooks';

const Technology = ({ technology, relatedTechnologies }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	return (
		<>
			<Head title={technology.title} />
			<Search />

			<TechnologyProvider technology={technology}>
				<Container>
					<Header />
					<Tabs />
				</Container>
			</TechnologyProvider>
			{relatedTechnologies?.length && (
				<TechnologiesSection
					header={t('common:relatedSolutions')}
					technologies={relatedTechnologies}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

Technology.getInitialProps = async ({ query, res }) => {
	let technology = {};
	let relatedTechnologies = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomies: true,
			normalizeTaxonomies: true,
		});

		if (!technology) {
			res.writeHead(302, {
				Location: '/_error.js',
			}).end();
		} else {
			let term = technology.taxonomies.category.split(',')[0];
			term = term.toLowerCase().replace(' ', '-');
			relatedTechnologies = await getTechnologies({
				term,
				perPage: 4,
				order: 'DESC',
				orderBy: 'likes',
			});
		}
	}

	return {
		technology,
		relatedTechnologies,
		namespacesRequired: ['home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
	relatedTechnologies: PropTypes.arrayOf(PropTypes.object),
};
Technology.defaultProps = {
	relatedTechnologies: [],
};
export const Container = styled.div`
	${({ theme: { colors, screens } }) => css`
		padding: 2rem;
		background-color: ${colors.whiteSmoke};

		@media (min-width: ${screens.medium}px) {
			padding: 6rem 4rem;
		}
	`}
`;

export default Technology;
