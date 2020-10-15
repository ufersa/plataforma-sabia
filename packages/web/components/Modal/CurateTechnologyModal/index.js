import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose as CloseIcon } from 'react-icons/md';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { TechnologyProvider } from '../../Technology/TechnologyProvider';
import Loading from '../../Loading';
import { TabList, TabPanel, Tabs as Container } from '../../Tab';
import {
	getAttachments,
	getTechnologyCosts,
	updateTechnologyCurationStatus,
} from '../../../services/technology';
import tabs from './tabs';
import {
	StyledModal,
	TabsHeader,
	StyledTab,
	CloseButton,
	ReviewWrapper,
	ReviewTitle,
	ReviewInput,
	ReviewActions,
	ReviewButton,
} from './styles';
import { normalizeTaxonomies, normalizeTrl } from '../../../utils/technology';
import { toast } from '../../Toast';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';

const CurateTechnologyModal = ({ closeModal, technology = {} }) => {
	const [assessment, setAssessment] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { data: [technologyCosts, attachments] = [], isValidating } = useSWR(
		['getTechnologyDetails', technology.id],
		(_, id) =>
			Promise.all([
				getTechnologyCosts(id, { normalize: true }),
				getAttachments(id, { normalize: true }),
			]),
		{
			revalidateOnFocus: false,
		},
	);

	console.log(technology, 'tech');

	const handleChange = ({ target: { value } }) => setInputValue(value);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		const result = await updateTechnologyCurationStatus(technology.id, {
			description: inputValue,
			assessment,
		});

		if (!result) {
			toast.error('Ocorreu um erro ao registrar sua avaliação.');
		} else {
			toast.success('Avaliação enviada com sucesso');
		}

		setIsSubmitting(false);
		closeModal();
		router.push('/user/my-account/curate-technologies');
	};

	return (
		<StyledModal>
			<form onSubmit={handleSubmit}>
				<Container>
					<TabsHeader>
						<TabList>
							{tabs.map((tab) => (
								<StyledTab key={tab.slug} data-testid={tab.slug}>
									{tab.label}
								</StyledTab>
							))}
						</TabList>
						<CloseButton type="button" aria-label="Close modal" onClick={closeModal}>
							<CloseIcon />
						</CloseButton>
					</TabsHeader>

					<Loading loading={isValidating}>
						<TechnologyProvider
							technology={{
								...technology,
								taxonomies: {
									...normalizeTaxonomies(technology.terms),
									readinessLevel: normalizeTrl(technology.terms),
								},
								technologyCosts,
								attachments,
							}}
						>
							{tabs.map((tab) => (
								<TabPanel key={tab.slug}>
									<tab.component />
								</TabPanel>
							))}
						</TechnologyProvider>
					</Loading>

					<ReviewWrapper>
						<ReviewTitle id="reviewer-assessment-text">
							<h3>Observações</h3>
							<span>(Obrigatório em caso de correção ou reprovação)</span>
						</ReviewTitle>

						<ReviewInput
							rows="8"
							placeholder="Digite sua observação"
							value={inputValue}
							onChange={handleChange}
							aria-labelledby="reviewer-assessment-text"
						/>

						<ReviewActions>
							<ReviewButton
								variant="deny"
								disabled={!inputValue.trim() || isSubmitting}
								onClick={() => setAssessment(statusEnum.REJECTED)}
								aria-label="Reject technology"
							>
								Reprovar Tecnologia
							</ReviewButton>
							<ReviewButton
								variant="requestChanges"
								disabled={!inputValue.trim() || isSubmitting}
								onClick={() => setAssessment(statusEnum.REQUESTED_CHANGES)}
								aria-label="Request changes in technology"
							>
								Solicitar Correção
							</ReviewButton>
							<ReviewButton
								variant="approve"
								disabled={isSubmitting}
								onClick={() => setAssessment(statusEnum.APPROVED)}
								aria-label="Approve technology"
							>
								Aprovar Tecnologia
							</ReviewButton>
						</ReviewActions>
					</ReviewWrapper>
				</Container>
			</form>
		</StyledModal>
	);
};

CurateTechnologyModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	technology: PropTypes.shape({}).isRequired,
};

export default CurateTechnologyModal;
