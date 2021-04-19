import React, { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';
import { useTechnology, useModal } from '../../../../../hooks';
import { getReviews } from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import Loading from '../../../../Loading';
import Rating from '../../../../Rating';
import Section from '../../Section';
import { Protected } from '../../../../Authorization';
import { calculateRatingsAverage } from '../../../../../utils/helper';
import {
	SelectContainer,
	Item,
	Header,
	FullName,
	Text,
	PointsContainer,
	PointsTitle,
	PointsItem,
	PositiveIcon,
	NegativeIcon,
	UpContent,
	AddReviewButton,
	RatingText,
} from './styles';

const selectOptions = [
	{ label: 'Mais Recentes', value: 'created_at|DESC' },
	{ label: 'Mais Bem Avaliados', value: 'rating|DESC' },
	{ label: 'Mais Antigos', value: 'created_at|ASC' },
];

const getOrderValue = (raw) => {
	const [orderBy, order] = raw.split('|');
	return { orderBy, order };
};

const Review = () => {
	const { technology } = useTechnology();
	const [ordering, setOrdering] = useState(selectOptions[0].value);
	const [rating, setRating] = useState(null);
	const { openModal } = useModal();

	const { data: reviews, isValidating, mutate } = useSWR(
		['getReviews', technology.id, ordering],
		(_, id, order) => getReviews(id, getOrderValue(order)),
		{
			initialData: technology.reviews,
			revalidateOnMount: true,
		},
	);

	useEffect(() => {
		setRating(calculateRatingsAverage(reviews));
	}, [reviews]);

	const handleOrderBy = (event) => setOrdering(event.target.value);

	const handleAddReviewClick = useCallback(() => {
		return openModal('addReview', { technology, mutate });
	}, [mutate, openModal, technology]);

	return (
		<Layout.Cell>
			<Section
				title="Relatos"
				hideWhenIsEmpty={false}
				render={() =>
					rating && (
						<RatingText aria-label="Média de Avaliações">
							Avaliação dessa tecnologia: <strong>{rating}</strong>{' '}
							<Rating value={rating} size={3} readonly />
						</RatingText>
					)
				}
			>
				<Protected inline>
					<UpContent>
						<AddReviewButton
							aria-label="Adicionar Tecnologia"
							onClick={handleAddReviewClick}
						>
							Avaliar Tecnologia
						</AddReviewButton>

						{!!reviews.length && (
							<SelectContainer>
								<select name="order" value={ordering} onChange={handleOrderBy}>
									{selectOptions.map(({ value, label }) => (
										<option key={value} value={value}>
											{label}
										</option>
									))}
								</select>
							</SelectContainer>
						)}
					</UpContent>

					{reviews.length ? (
						<>
							<Loading loading={isValidating}>
								<ul>
									{reviews?.map((review) => (
										<Item key={review.id}>
											<Header>
												<div>
													<FullName>{review.user?.full_name}</FullName>
													<Text>
														<span>{review.user?.city}/</span>
														<span>{review.user?.state}, </span>
														<span>{review.user?.country}</span>
													</Text>
												</div>

												<Rating value={review.rating} size={2} readonly />
											</Header>

											<Text>{review?.content}</Text>

											<PointsContainer>
												{review.positive && (
													<ul>
														<PointsTitle positive>
															Pontos positivos:
														</PointsTitle>
														{review.positive.map((item) => (
															<PointsItem
																key={`positive-${review.id}-${item}`}
																positive
															>
																<PositiveIcon />
																<Text>{item}</Text>
															</PointsItem>
														))}
													</ul>
												)}
												{review.negative && (
													<ul>
														<PointsTitle>Pontos negativos:</PointsTitle>
														{review.negative.map((item) => (
															<PointsItem
																key={`negative-${review.id}-${item}`}
															>
																<NegativeIcon />
																<Text>{item}</Text>
															</PointsItem>
														))}
													</ul>
												)}
											</PointsContainer>
										</Item>
									))}
								</ul>
							</Loading>
						</>
					) : (
						<p>Nenhum relato cadastrado até o momento</p>
					)}
				</Protected>
			</Section>
		</Layout.Cell>
	);
};

export default Review;
