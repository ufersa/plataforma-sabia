import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { useTechnology } from '../../../../../hooks';
import Loading from '../../../../Loading';
import { toast } from '../../../../Toast';
import Section from '../../Section';
import { InputField } from '../../../../Form';
import Question from './Question';
import { getTechnologyQuestions } from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import * as S from './styles';

const FAQ = () => {
	const { technology } = useTechnology();
	const form = useForm();

	const { data, isValidating } = useSWR(
		['getTechnologyQuestions', technology.id],
		(_, id) => getTechnologyQuestions(id),
		{
			initialData: [],
			revalidateOnMount: true,
		},
	);

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
				{data?.questions?.length ? (
					<Loading loading={isValidating}>
						<S.LastQuestions>
							<S.LastQuestionsTitle>Últimas realizadas</S.LastQuestionsTitle>
							{data?.questions?.map((question) => (
								<Question key={question.id} question={question} />
							))}
							<S.LoadMoreButton onClick={loadMoreQuestions}>
								Ver mais perguntas
							</S.LoadMoreButton>
						</S.LastQuestions>
					</Loading>
				) : (
					<S.NoQuestions>Nenhuma pergunta foi feita até o momento.</S.NoQuestions>
				)}
			</Section>
		</Layout.Cell>
	);
};

export default FAQ;
