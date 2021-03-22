import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import { Header, Search, Tabs, RelatedSolutions } from '../../../components/Technology/Details';
import {
	getTechnologyTerms,
	getTechnology,
	getTechnologyCosts,
	getAttachments,
} from '../../../services';

const Technology = ({ technology }) => {
	return (
		<>
			<Head title={technology.title} />
			<Search />
			<TechnologyProvider technology={technology}>
				<Wrapper>
					<Container>
						<Header />
						<Tabs />
					</Container>
				</Wrapper>
			</TechnologyProvider>
			<RelatedSolutions technology={technology} />
		</>
	);
};

const Wrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.whiteSmoke};
	`}
`;

const Container = styled.div`
	${({ theme: { screens } }) => css`
		padding: 2rem;
		max-width: 1440px;
		margin: 0 auto;
		@media (min-width: ${screens.medium}px) {
			padding: 6rem 4rem;
		}
	`}
`;

Technology.getInitialProps = async ({ query, res }) => {
	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomies: true,
			normalizeTaxonomies: true,
		});

		if (!technology) {
			return res
				.writeHead(302, {
					Location: '/_error.js',
				})
				.end();
		}

		const getTerms = async () => {
			technology.terms = await getTechnologyTerms(technology.id);
		};

		const getCosts = async () => {
			technology.technologyCosts = await getTechnologyCosts(technology.id, {
				normalize: true,
			});
		};

		const getTechnologyAttachments = async () => {
			technology.attachments = await getAttachments(technology.id, { normalize: true });
		};

		await Promise.all([getTerms(), getCosts(), getTechnologyAttachments()]);
	}

	return {
		technology,
		namespacesRequired: ['common', 'card', 'home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
};

export default Technology;
