import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { toast } from '../../Toast';
import { formatDateLong } from '../../../utils/helper';
import { InputField } from '../../Form';
import { disableQuestion, answerQuestion } from '../../../services/question';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, Title, Actions, QuestionWrapper, Info, QuestionText } from './styles';

const QuestionDetailsModal = ({ closeModal, question }) => {
	const form = useForm();

	const onSubmit = async ({ answer }) => {
		const response = await answerQuestion(question.id, answer);

		if (response) {
			toast.success('Pergunta respondida com sucesso');
		} else {
			toast.error('Houve um erro ao responder esta pergunta');
		}
		closeModal();
	};

	const refuseQuestion = async () => {
		const response = await disableQuestion(question.id);

		if (response) {
			toast.success('Pergunta recusada com sucesso');
		} else {
			toast.error('Houve um erro ao recusar esta pergunta');
		}

		closeModal();
	};

	return (
		<Modal as="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
					onClick={refuseQuestion}
					disabled={question.status === 'disabled'}
				>
					Recusar pergunta
				</Button>
				<Button variant="approve" type="submit" disabled={question.status === 'disabled'}>
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
