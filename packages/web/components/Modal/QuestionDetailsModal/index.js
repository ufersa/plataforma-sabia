import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { toast } from '../../Toast';
import { formatDateLong } from '../../../utils/helper';
import { InputField } from '../../Form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, Title, Actions, QuestionWrapper, Info, QuestionText } from './styles';

const QuestionDetailsModal = ({ closeModal, question }) => {
	const form = useForm();

	console.log(question);

	const onSubmit = () => {
		toast.success('Pergunta respondida com sucesso');
		closeModal();
	};

	const refuseQuestion = () => {
		toast.success('Pergunta recusada com sucesso');
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
				form={{ register: () => {} }}
				name="answer"
				label="Resposta"
				variant="gray"
				defaultValue={question.answer ? question.answer : ''}
			/>

			<Actions>
				<Button variant="deny" type="button" onClick={closeModal}>
					Cancelar
				</Button>
				<Button variant="refuse" type="button" onClick={refuseQuestion}>
					Recusar pergunta
				</Button>
				<Button variant="approve" type="submit">
					Enviar resposta
				</Button>
			</Actions>
		</Modal>
	);
};

QuestionDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	question: PropTypes.shape({
		created_at: PropTypes.string,
		question: PropTypes.string,
		answer: PropTypes.string,
		user: PropTypes.shape({
			full_name: PropTypes.string,
		}),
	}).isRequired,
};

export default QuestionDetailsModal;
