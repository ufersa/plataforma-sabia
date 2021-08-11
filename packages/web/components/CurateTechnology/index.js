import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft as ChevronLeftIcon } from 'react-icons/md';

import useSWR from 'swr';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import dompurify from 'isomorphic-dompurify';
import { RectangularButton } from '../Button';
import { TabPanel } from '../Tab';

import * as S from './styles';
import { Title } from '../Common';
import tabs from './tabs';
import { TechnologyProvider } from '../Technology';
import { Loader } from '../Loading/styles';
import {
	getAttachments,
	getTechnologyCosts,
	getTechnologyTerms,
	getCNPQAreas,
	updateTechnologyCurationStatus,
	getTechnologyRevisionHistory,
} from '../../services';
import { isTechnologyAbleToCurate, normalizeTaxonomies } from '../../utils/technology';
import { STATUS as statusEnum } from '../../utils/enums/technology.enums';
import { toast } from '../Toast';

const Editor = dynamic(() => import('../Editor'), {
	ssr: false,
});

const CurateTechnology = ({ technology }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [assessment, setAssessment] = useState('');
	const router = useRouter();
	const form = useForm({ description: '' });
	const [description] = form.watch(['description']);

	const {
		data: [
			technologyCosts,
			attachments,
			terms,
			technologyRevisionsHistory = {},
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
				getTechnologyRevisionHistory(id),
				getCNPQAreas(technology.knowledgeArea.knowledge_area_id, {
					normalizeKnowledgeAreas: true,
				}),
			]),
		{
			revalidateOnFocus: false,
		},
	);

	const handleSubmit = async (values) => {
		setIsSubmitting(true);

		const result = await updateTechnologyCurationStatus(technology.id, {
			description: dompurify.sanitize(values.description),
			assessment,
		});

		if (!result) {
			toast.error('Ocorreu um erro ao registrar sua avaliação.');
		} else {
			toast.success('Avaliação enviada com sucesso');
		}

		setIsSubmitting(false);
		router.push('/user/my-account/curate-technologies');
	};

	const technologyCanBeCurated = isTechnologyAbleToCurate(technology.status);
	const disableActions = !description?.trim() || isSubmitting || !technologyCanBeCurated;

	return (
		<S.Form onSubmit={form.handleSubmit(handleSubmit)}>
			<S.Wrapper>
				<S.TitleWrapper>
					<Title align="left" noPadding noMargin>
						{technology.title}
					</Title>
					{isValidating && <Loader />}
				</S.TitleWrapper>

				<S.TabsHeader>
					<S.TabList>
						{tabs.map((tab) => (
							<S.Tab key={tab.slug} data-testid={tab.slug}>
								{tab.label}
							</S.Tab>
						))}
					</S.TabList>
				</S.TabsHeader>

				<TechnologyProvider
					technology={{
						...technology,
						taxonomies: normalizeTaxonomies(technology.terms),
						terms,
						attachments,
						technologyCosts,
						technologyCNPQAreas,
						technologyRevisionsHistory,
					}}
				>
					{tabs.map((tab) => (
						<TabPanel key={tab.slug}>
							<tab.component hideWhenIsEmpty={false} noSectionMargin smallTitle />
						</TabPanel>
					))}
				</TechnologyProvider>

				<S.Footer>
					<Editor
						config={{
							placeholder:
								'Digite suas observações (obrigatório em caso de correção ou reprovação)',
							removePlugins: ['ImageUpload', 'Table', 'MediaEmbed'],
						}}
						form={form}
						name="description"
						disabled={isSubmitting || !technologyCanBeCurated}
					/>

					{!technologyCanBeCurated && (
						<S.CantCurate>
							O status desta tecnologia não permite uma nova revisão.
						</S.CantCurate>
					)}

					<S.ActionButtons>
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
								type="submit"
								disabled={disableActions}
								onClick={() => setAssessment(statusEnum.REJECTED)}
							>
								Reprovar tecnologia
							</RectangularButton>

							<RectangularButton
								variant="filled"
								colorVariant="orange"
								type="submit"
								disabled={disableActions}
								onClick={() => setAssessment(statusEnum.REQUESTED_CHANGES)}
							>
								Solicitar Correção
							</RectangularButton>

							<RectangularButton
								variant="filled"
								colorVariant="green"
								type="submit"
								disabled={isSubmitting || !technologyCanBeCurated}
								onClick={() => setAssessment(statusEnum.APPROVED)}
							>
								Aprovar Tecnologia
							</RectangularButton>
						</div>
					</S.ActionButtons>
				</S.Footer>
			</S.Wrapper>
		</S.Form>
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
		status: PropTypes.string,
	}).isRequired,
};

export default CurateTechnology;
