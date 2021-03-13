import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { SectionTitle } from '../../../components/Common';
import { SolutionsSection } from '../../../components/SolutionsSection';
import { useTheme } from '../../../hooks';
import {
	getServices,
	getTechnologyTerms,
	getTechnology,
	getTechnologies,
	getTechnologyCosts,
	getAttachments,
} from '../../../services';

const Technology = ({ technology, relatedTechnologies, relatedServices }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);

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

			{(!!relatedTechnologies.length || !!relatedServices.length) && (
				<>
					<SectionTitle bgColor={colors.whiteSmoke} noMargin>
						{t('common:relatedSolutions')}
					</SectionTitle>
					{!!relatedTechnologies.length && (
						<SolutionsSection
							data={relatedTechnologies}
							bgColor={colors.whiteSmoke}
							type="technology"
						/>
					)}

					{!!relatedServices.length && (
						<SolutionsSection
							data={relatedServices}
							bgColor={colors.whiteSmoke}
							type="service"
						/>
					)}
				</>
			)}
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
	let relatedTechnologies = [];
	let relatedServices = [];
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

		const getRelatedTechnologies = async () => {
			const keywords = technology.terms.reduce((acc, term) => {
				const taxonomy = term.taxonomy.taxonomy === 'KEYWORDS';
				if (taxonomy) {
					acc.push(term.id);
				}
				return acc;
			}, []);

			if (keywords.length) {
				const defaultRelatedParams = {
					embed: true,
					keyword: keywords.join(','),
					perPage: 4,
					order: 'DESC',
					orderBy: 'likes',
				};

				[relatedTechnologies, relatedServices] = await Promise.all([
					getTechnologies({ ...defaultRelatedParams, notIn: [technology.id] }),
					getServices(defaultRelatedParams),
				]);
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
		relatedServices,
		namespacesRequired: ['common', 'card', 'home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
	relatedTechnologies: PropTypes.arrayOf(PropTypes.object),
	relatedServices: PropTypes.arrayOf(PropTypes.object),
};

Technology.defaultProps = {
	relatedTechnologies: [],
	relatedServices: [],
};

export default Technology;
