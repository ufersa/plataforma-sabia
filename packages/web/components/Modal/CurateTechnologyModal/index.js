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
	getTechnologyComments,
	getTechnologyCosts,
	getTechnologyTerms,
	updateTechnologyCurationStatus,
} from '../../../services/technology';
import tabs from './tabs';
import {
	StyledModal,
	TabsHeader,
	StyledTab,
	CloseButton,
	ReviewInput,
	ReviewActions,
	ReviewButton,
	CommentsWrapper,
	Comment,
	CommentTitle,
	CommentContent,
} from './styles';
import { normalizeTaxonomies } from '../../../utils/technology';
import { stringToLocaleDate } from '../../../utils/helper';
import { toast } from '../../Toast';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';

const CurateTechnologyModal = ({ closeModal, technology = {} }) => {
	const [assessment, setAssessment] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const {
		data: [technologyCosts, attachments, terms, technologyComment = {}] = [],
		isValidating,
	} = useSWR(
		['getTechnologyDetails', technology.id],
		(_, id) =>
			Promise.all([
				getTechnologyCosts(id, { normalize: true }),
				getAttachments(id, { normalize: true }),
				getTechnologyTerms(id),
				getTechnologyComments(id, { onlyLastComment: true }),
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
								terms,
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

					<ReviewActions>
						<CommentsWrapper singleColumn={!Object.values(technologyComment).length}>
							{!!Object.values(technologyComment).length && (
								<Comment>
									<CommentTitle>
										<p>Comentários do pesquisador</p>
									</CommentTitle>

									<CommentContent>
										<span>
											{stringToLocaleDate(technologyComment.created_at, {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})}
										</span>
										<p>{technologyComment.comment}</p>
									</CommentContent>
								</Comment>
							)}

							<Comment>
								<CommentTitle id="reviewer-assessment-text">
									<p>Observações</p>
									<span>(Obrigatório em caso de correção ou reprovação)</span>
								</CommentTitle>

								<ReviewInput
									rows="6"
									value={inputValue}
									onChange={handleChange}
									aria-labelledby="reviewer-assessment-text"
									placeholder="Digite sua observação"
								/>
							</Comment>
						</CommentsWrapper>

						<div>
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
						</div>
					</ReviewActions>
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
