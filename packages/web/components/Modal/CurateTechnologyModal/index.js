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
import { normalizeTaxonomies } from '../../../utils/technology';
import { toast } from '../../Toast';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';

const CurateTechnologyModal = ({ closeModal, technology = {} }) => {
	const [assessment, setAssessment] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { data: technologyDetails = [], isValidating } = useSWR(
		'getTechnologyDetails',
		() =>
			Promise.all([
				getTechnologyCosts(technology.id, { normalize: true }),
				getAttachments(technology.id, { normalize: true }),
			]),
		{
			revalidateOnFocus: false,
		},
	);

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
								taxonomies: normalizeTaxonomies(technology.terms),
								technologyCosts: technologyDetails[0],
								attachments: technologyDetails[1],
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
						<ReviewTitle>
							<h3>Observações</h3>
							<span>(Obrigatório em caso de correção ou reprovação)</span>
						</ReviewTitle>

						<ReviewInput
							rows="8"
							placeholder="Digite sua observação"
							value={inputValue}
							onChange={handleChange}
						/>

						<ReviewActions>
							<ReviewButton
								variant="deny"
								disabled={!inputValue.trim() || isSubmitting}
								onClick={() => setAssessment(statusEnum.REJECTED)}
							>
								Reprovar Tecnologia
							</ReviewButton>
							<ReviewButton
								variant="requestChanges"
								disabled={!inputValue.trim() || isSubmitting}
								onClick={() => setAssessment(statusEnum.REQUESTED_CHANGES)}
							>
								Solicitar Correção
							</ReviewButton>
							<ReviewButton
								variant="approve"
								disabled={isSubmitting}
								onClick={() => setAssessment(statusEnum.APPROVED)}
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
