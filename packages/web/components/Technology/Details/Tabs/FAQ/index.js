import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { useTechnology, useAuth } from '../../../../../hooks';
import Loading from '../../../../Loading';
import { toast } from '../../../../Toast';
import Section from '../../Section';
import { InputField } from '../../../../Form';
import Question from './Question';
import {
	getTechnologyQuestions,
	createTechnologyQuestion,
} from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import * as S from './styles';

const FAQ = () => {
	const form = useForm();
	const { technology } = useTechnology();
	const { user } = useAuth();
	const [allQuestions, setAllQuestions] = useState(null);
	const isLoggedIn = !!user?.email;

	const { data, isValidating } = useSWR(
		['getTechnologyQuestions', technology.id],
		(_, id) => getTechnologyQuestions(id),
		{
			initialData: [],
			revalidateOnMount: true,
		},
	);

	const onSubmit = async ({ question }) => {
		const response = await createTechnologyQuestion({
			technology: technology.id,
			question,
		});

		setAllQuestions([response, ...allQuestions]);

		if (response) {
			toast.success('Pergunta enviada com sucesso');
		} else {
			toast.error('Houve um erro ao enviar sua pergunta');
		}

		form.reset();
	};

	const loadMoreQuestions = () => {
		toast.error('Carregar mais 10 perguntas e respostas');
	};

	useEffect(() => {
		if (!isValidating) {
			setAllQuestions(data?.questions);
		}
	}, [data, isValidating]);

	return (
		<Layout.Cell>
			<Section title="Perguntas e Respostas" hideWhenIsEmpty={false}>
				{isLoggedIn && (
					<S.Form onSubmit={form.handleSubmit(onSubmit)} noValidate>
						<InputField
							form={form}
							name="question"
							label="Pergunte ao pesquisador"
							variant="gray"
						/>
						<S.SubmitButton type="submit">
							<FiSend /> Enviar Pergunta
						</S.SubmitButton>
					</S.Form>
				)}

				{allQuestions?.length ? (
					<Loading loading={isValidating}>
						<S.LastQuestions>
							<S.LastQuestionsTitle>Últimas realizadas</S.LastQuestionsTitle>
							{allQuestions?.map((question) => (
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
