import React, { useState } from 'react';
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
	const isLoggedIn = !!user?.email;
	const [itemsCount, setItemsCount] = useState(5);

	const {
		data: { questions, totalItems },
		isValidating,
		mutate,
	} = useSWR(
		['getTechnologyQuestions', technology.id, itemsCount],
		(_, id, perPage) =>
			getTechnologyQuestions(id, {
				perPage,
				page: 1,
			}),
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

		if (response) {
			toast.success('Pergunta enviada com sucesso');
			mutate('getTechnologyQuestions');
		} else {
			toast.error('Houve um erro ao enviar sua pergunta');
		}

		form.reset();
	};

	const loadMoreQuestions = () => {
		setItemsCount(itemsCount + 5);
		mutate('getTechnologyQuestions');
	};

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

				{questions?.length ? (
					<Loading loading={isValidating}>
						<S.LastQuestions>
							<S.LastQuestionsTitle>Últimas realizadas</S.LastQuestionsTitle>
							{questions?.map((question) => (
								<Question key={question.id} question={question} />
							))}
							<S.LoadMoreButton
								onClick={loadMoreQuestions}
								disabled={totalItems <= itemsCount}
							>
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
