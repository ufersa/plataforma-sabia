import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { toast } from '../../../../Toast';
import Section from '../../Section';
import { InputField } from '../../../../Form';
import Question from './Question';
import * as Layout from '../../../../Common/Layout';
import * as S from './styles';

const questionsMock = [
	{
		id: 1,
		question: 'Boa noite, vocês auxiliam na instalação?',
		answer: 'Boa noite. Sim, auxiliamos.',
		created_at: '2020-11-09 12:53:24.000000',
	},
	{
		id: 2,
		question: 'Boa tarde, vocês auxiliam na instalação?',
		answer: 'Boa tarde. Sim, auxiliamos.',
		created_at: '2020-11-19 12:53:24.000000',
	},
	{
		id: 3,
		question: 'Bom dia, vocês auxiliam na instalação?',
		answer: 'Bom dia. Sim, auxiliamos.',
		created_at: '2020-03-14 12:53:24.000000',
	},
];

const FAQ = () => {
	const form = useForm();

	const onSubmit = () => {
		toast.success('Pergunta enviada com sucesso');
	};

	const loadMoreQuestions = () => {
		toast.error('Carregar mais 10 perguntas e respostas');
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
				{questionsMock.length ? (
					<S.LastQuestions>
						<S.LastQuestionsTitle>Últimas realizadas</S.LastQuestionsTitle>
						{questionsMock.map((question) => (
							<Question key={question.id} question={question} />
						))}
						<S.LoadMoreButton onClick={loadMoreQuestions}>
							Ver mais perguntas
						</S.LoadMoreButton>
					</S.LastQuestions>
				) : (
					<S.NoQuestions>Nenhuma pergunta foi feita até o momento.</S.NoQuestions>
				)}
			</Section>
		</Layout.Cell>
	);
};

export default FAQ;
