import React, { useState } from 'react';
import { useTechnology } from '../../../../../hooks';
import { getReviews } from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import { Wrapper as LoadingWrapper } from '../../../../Loading';
import Rating from '../../../../Rating';
import Section from '../../Section';
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
} from './styles';

const Review = () => {
	const { technology } = useTechnology();

	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useState(technology.reviews);

	const selectOptions = [
		{ label: 'Mais Recentes', value: 'created_at|DESC' },
		{ label: 'Mais Bem Avaliados', value: 'rating|DESC' },
		{ label: 'Mais Antigos', value: 'created_at|ASC' },
	];

	const handleOrder = async (event) => {
		setLoading(true);

		const { value } = event.target;
		const [orderBy, order] = value.split('|');

		const data = await getReviews(technology.id, { orderBy, order });
		setReviews(data);

		setLoading(false);
	};

	return (
		<Layout.Cell>
			<Section title="Relatos" hideWhenIsEmpty={false}>
				<SelectContainer>
					<select name="reviews" onChange={handleOrder}>
						{selectOptions.map((option) => (
							<option value={option.value}>{option.label}</option>
						))}
					</select>
				</SelectContainer>

				<LoadingWrapper loading={loading}>
					{!!reviews && (
						<ul>
							{reviews?.map((review) => (
								<Item>
									<Header>
										<div>
											<FullName>{review.user?.full_name}</FullName>
											<Text>
												<span>{review.user?.company}, </span>
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
													<PointsItem positive>
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
													<PointsItem>
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
					)}
				</LoadingWrapper>
			</Section>
		</Layout.Cell>
	);
};

export default Review;
