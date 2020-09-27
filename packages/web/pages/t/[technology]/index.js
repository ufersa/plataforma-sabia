import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
	getTechnology,
	getTechnologies,
	getTechnologyCosts,
	getAttachments,
	TechnologyProvider,
	getTechnologyTerms
} from '@sabia/core';
import Head from '../../../components/head';

import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { TechnologiesSection } from '../../../components/TechnologiesSection';

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

			{!!relatedTechnologies.length && (
				<TechnologiesSection
					header={t('common:relatedSolutions')}
					technologies={relatedTechnologies}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

const Container = styled.div`
	${({ theme: { colors, screens } }) => css`
		padding: 2rem;
		background-color: ${colors.whiteSmoke};

		@media (min-width: ${screens.medium}px) {
			padding: 6rem 4rem;
		}
	`}
`;

Technology.getInitialProps = async ({ query, res }) => {
	let technology = {};
	let relatedTechnologies = {};

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
			technology.attachments = await getAttachments(query.technology, {
				normalize: true,
			});
		};

		const getRelatedTechnologies = async () => {
			const categoryTerm = technology.terms.find(
				(term) => term.taxonomy.taxonomy === 'CATEGORY' && term.parent_id,
			);

			if (categoryTerm) {
				relatedTechnologies = await getTechnologies({
					term: categoryTerm.slug,
					perPage: 4,
					order: 'DESC',
					orderBy: 'likes',
					notIn: [technology.id],
				});
			}
		};

		await Promise.all([
			getTerms(),
			getCosts(),
			getTechnologyAttachments(),
			getRelatedTechnologies(),
		]);
	}

	return {
		technology,
		relatedTechnologies,
		namespacesRequired: ['common', 'card', 'home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
	relatedTechnologies: PropTypes.arrayOf(PropTypes.object),
};

Technology.defaultProps = {
	relatedTechnologies: [],
};

export default Technology;
