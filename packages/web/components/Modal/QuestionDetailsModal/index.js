import React from 'react';
import PropTypes from 'prop-types';
import { formatDateLong } from '../../../utils/helper';
import { InputField } from '../../Form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, Title, Actions, QuestionWrapper, Info, QuestionText } from './styles';

const questionMock = {
	id: 1,
	question: 'Boa noite, vocês auxiliam na instalação?',
	answer: 'Boa noite. Sim, auxiliamos.',
	user: 'Fulano',
	created_at: '2020-11-09 12:53:24.000000',
};

const QuestionDetailsModal = ({ closeModal }) => {
	return (
		<Modal>
			<Title>Detalhes da pergunta</Title>

			<QuestionWrapper>
				<Info color="lightGray2">{formatDateLong(questionMock.created_at)}</Info>
				<QuestionText>{questionMock.question}</QuestionText>
				<Info>{questionMock.user}</Info>
			</QuestionWrapper>

			<InputField
				form={{ register: () => {} }}
				name="answer"
				label="Resposta"
				variant="gray"
				defaultValue={questionMock.answer}
			/>

			<Actions>
				<Button variant="deny" type="button" onClick={closeModal}>
					Cancelar
				</Button>
				<Button variant="refuse" type="button" onClick={closeModal}>
					Recusar pergunta
				</Button>
				<Button variant="approve" type="button" onClick={closeModal}>
					Enviar resposta
				</Button>
			</Actions>
		</Modal>
	);
};

QuestionDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default QuestionDetailsModal;
