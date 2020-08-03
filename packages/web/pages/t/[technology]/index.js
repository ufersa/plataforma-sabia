import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { getTechnology } from '../../../services/technology';

const Technology = ({ technology }) => {
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
		</>
	);
};

Technology.getInitialProps = async ({ query, res }) => {
	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomies: true,
			normalizeTaxonomies: true,
		});

		if (!technology) {
			res.writeHead(302, {
				Location: '/_error.js',
			}).end();
		}
	}

	return {
		technology,
		namespacesRequired: ['home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
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
