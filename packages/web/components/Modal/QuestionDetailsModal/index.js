import React from 'react';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from '../../Toast';
import { formatDateLong } from '../../../utils/helper';
import { InputField } from '../../Form';
import { disableQuestion, answerQuestion } from '../../../services/question';
import { STATUS as questionsStatusEnum } from '../../../utils/enums/questions.enum';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, Title, Actions, QuestionWrapper, Info, QuestionText } from './styles';

const QuestionDetailsModal = ({ closeModal, question }) => {
	const form = useForm();
	const router = useRouter();

	const onSubmit = async ({ answer }, status) => {
		if (status === questionsStatusEnum.QUESTION_ANSWERED) {
			const response = await answerQuestion(question.id, answer);

			if (response) {
				toast.success('Pergunta respondida com sucesso');
				mutate(['get-user-unanswered-questions-count']);
			} else {
				toast.error('Houve um erro ao responder esta pergunta');
			}
		} else {
			const response = await disableQuestion(question.id);

			if (response) {
				toast.success('Pergunta recusada com sucesso');
			} else {
				toast.error('Houve um erro ao recusar esta pergunta');
			}
		}

		closeModal();
		router.push('/user/my-account/questions');
	};

	return (
		<Modal as="form">
			<Title>Detalhes da pergunta</Title>

			<QuestionWrapper>
				<Info color="lightGray2">{formatDateLong(question.created_at)}</Info>
				<QuestionText>{question.question}</QuestionText>
				<Info>{question.user.full_name}</Info>
			</QuestionWrapper>

			<InputField
				form={form}
				name="answer"
				label="Resposta"
				variant="gray"
				defaultValue={question.answer ? question.answer : ''}
			/>

			<Actions>
				<Button variant="deny" type="button" onClick={closeModal}>
					Cancelar
				</Button>
				<Button
					variant="refuse"
					type="button"
					onClick={form.handleSubmit((data) =>
						onSubmit(data, questionsStatusEnum.QUESTION_DISABLED),
					)}
					disabled={question.status === questionsStatusEnum.QUESTION_DISABLED}
				>
					Recusar pergunta
				</Button>
				<Button
					variant="approve"
					type="submit"
					onClick={form.handleSubmit((data) =>
						onSubmit(data, questionsStatusEnum.QUESTION_ANSWERED),
					)}
				>
					Enviar resposta
				</Button>
			</Actions>
		</Modal>
	);
};

QuestionDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	question: PropTypes.shape({
		id: PropTypes.number,
		created_at: PropTypes.string,
		question: PropTypes.string,
		answer: PropTypes.string,
		status: PropTypes.string,
		user: PropTypes.shape({
			full_name: PropTypes.string,
		}),
	}).isRequired,
};

export default QuestionDetailsModal;
