import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { toast } from '../../../../Toast';
import Section from '../../Section';
import { InputField } from '../../../../Form';
import Question from './Question';
import * as Layout from '../../../../Common/Layout';
import * as S from './styles';

const FAQ = () => {
	const form = useForm();

	const onSubmit = () => {
		toast.success('Pergunta enviada com sucesso');
	};

	const loadMoreQuestions = () => {
		toast.error('Carregar mais perguntas e respostas');
	};

	return (
		<Layout.Cell>
			<Section title="Perguntas e Respostas" hideWhenIsEmpty={false}>
				<S.Form onSubmit={form.handleSubmit(onSubmit)} noValidate>
					<InputField
						form={{ register: () => {} }}
						name="question"
						label="Pergunte ao pesquisador"
						variant="gray"
					/>
					<S.SubmitButton type="submit">
						<FiSend /> Enviar Pergunta
					</S.SubmitButton>
				</S.Form>
				<S.LastQuestions>
					<S.LastQuestionsTitle>Últimas realizadas</S.LastQuestionsTitle>
					<Question />
					<S.LoadMoreButton onClick={loadMoreQuestions}>
						Ver mais perguntas
					</S.LoadMoreButton>
				</S.LastQuestions>
			</Section>
		</Layout.Cell>
	);
};

export default FAQ;
