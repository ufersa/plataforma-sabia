import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Hits, Configure, connectHits } from 'react-instantsearch-dom';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { SectionTitle } from '../../../components/Common';
import { SolutionCard, SolutionsWrapper } from '../../../components/SolutionsSection';
import { AlgoliaSearchProvider } from '../../../components/Algolia';
import { algoliaDefaultConfig } from '../../../components/Algolia/provider';
import { useTheme } from '../../../hooks';
import {
	getTechnologyTerms,
	getTechnology,
	getTechnologyCosts,
	getAttachments,
} from '../../../services';

const Technology = ({ technology }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);

	const filters = useMemo(() => {
		const keywords = technology.keywords
			.map((keyword) => `keywords:${keyword.term}`)
			.join(' OR ');

		return keywords.length ? `NOT objectID:${technology.objectID} AND (${keywords})` : '';
	}, [technology.keywords, technology.objectID]);

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

			<AlgoliaSearchProvider indexName={algoliaDefaultConfig.technology.indexName}>
				<Configure filters={filters} synonyms maxFacetHits={4} />

				<SectionTitle bgColor={colors.whiteSmoke} noMargin>
					{t('common:relatedSolutions')}
				</SectionTitle>

				<SolutionsWrapper overrideAlgoliaStyle>
					<Hits
						hitComponent={connectHits(({ hit }) => (
							<SolutionCard type="technology" data={hit} />
						))}
					/>
				</SolutionsWrapper>
			</AlgoliaSearchProvider>

			<AlgoliaSearchProvider indexName={algoliaDefaultConfig.service.indexName}>
				<Configure filters={filters} synonyms maxFacetHits={4} />

				<SolutionsWrapper overrideAlgoliaStyle>
					<Hits
						hitComponent={connectHits(({ hit }) => (
							<SolutionCard type="service" data={hit} />
						))}
					/>
				</SolutionsWrapper>
			</AlgoliaSearchProvider>
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
