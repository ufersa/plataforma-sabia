import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft as ChevronLeftIcon } from 'react-icons/md';

import useSWR from 'swr';
import { useRouter } from 'next/router';
import { RectangularButton } from '../Button';
import { TabList, TabPanel } from '../Tab';

import * as S from './styles';
import { Title } from '../Common';
import tabs from './tabs';
import { TechnologyProvider } from '../Technology';
import { Loader } from '../Loading/styles';
import {
	getAttachments,
	getTechnologyComments,
	getTechnologyCosts,
	getTechnologyTerms,
	getCNPQAreas,
} from '../../services';
import { normalizeTaxonomies } from '../../utils/technology';

const CurateTechnology = ({ technology }) => {
	const router = useRouter();

	const {
		data: [
			technologyCosts,
			attachments,
			terms,
			technologyComments = {},
			technologyCNPQAreas = {},
		] = [],
		isValidating,
	} = useSWR(
		['getTechnologyDetails', technology.id],
		(_, id) =>
			Promise.all([
				getTechnologyCosts(id, { normalize: true }),
				getAttachments(id, { normalize: true }),
				getTechnologyTerms(id),
				getTechnologyComments(id),
				getCNPQAreas(technology.knowledgeArea.knowledge_area_id, {
					normalizeKnowledgeAreas: true,
				}),
			]),
		{
			revalidateOnFocus: false,
		},
	);

	return (
		<S.Wrapper>
			<S.TitleWrapper>
				<Title align="left" noPadding noMargin>
					{technology.title}
				</Title>
				{isValidating && <Loader />}
			</S.TitleWrapper>

			<S.TabsHeader>
				<TabList>
					{tabs.map((tab) => (
						<S.Tab key={tab.slug} data-testid={tab.slug}>
							{tab.label}
						</S.Tab>
					))}
				</TabList>
			</S.TabsHeader>

			<TechnologyProvider
				technology={{
					...technology,
					taxonomies: normalizeTaxonomies(technology.terms),
					terms,
					attachments,
					technologyCosts,
					technologyCNPQAreas,
					technologyComments,
				}}
			>
				{tabs.map((tab) => (
					<TabPanel key={tab.slug}>
						<tab.component hideWhenIsEmpty={false} noSectionMargin smallTitle />
					</TabPanel>
				))}
			</TechnologyProvider>

			<S.Footer>
				<RectangularButton
					variant="text"
					colorVariant="grey"
					type="button"
					onClick={() => router.push('/user/my-account/curate-technologies')}
				>
					<ChevronLeftIcon fontSize={22} />
					Voltar para a lista
				</RectangularButton>

				<div>
					<RectangularButton
						variant="outlined"
						colorVariant="red"
						// disabled={!inputValue.trim() || isSubmitting}
						// onClick={() => setAssessment(statusEnum.REJECTED)}
					>
						Reprovar tecnologia
					</RectangularButton>

					<RectangularButton
						variant="filled"
						colorVariant="orange"
						// disabled={!inputValue.trim() || isSubmitting}
						// onClick={() => setAssessment(statusEnum.REQUESTED_CHANGES)}
					>
						Solicitar Correção
					</RectangularButton>

					<RectangularButton
						variant="filled"
						colorVariant="green"
						// disabled={isSubmitting}
						// onClick={() => setAssessment(statusEnum.APPROVED)}
					>
						Aprovar Tecnologia
					</RectangularButton>
				</div>
			</S.Footer>
		</S.Wrapper>
	);
};

CurateTechnology.propTypes = {
	technology: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		terms: PropTypes.arrayOf(PropTypes.shape({})),
		knowledgeArea: PropTypes.shape({
			knowledge_area_id: PropTypes.number,
		}),
	}).isRequired,
};

export default CurateTechnology;
