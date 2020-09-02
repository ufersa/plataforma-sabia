import React, { useCallback, useState } from 'react';
import { useTechnology } from '../../../../../hooks';
import { getReviews } from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import { Wrapper as LoadingWrapper } from '../../../../Loading';
import Section from '../../Section';
import Rating from '../../../../Rating';
import { InputFieldWrapper } from '../../../../Form/styles';

import {
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
	const [orderBy, setOrderBy] = useState({
		orderBy: 'created_at',
		order: 'DESC',
	});

	const updateData = useCallback(async () => {
		setLoading(true);

		const response = await getReviews(technology.id, orderBy);
		setReviews(response);

		setLoading(false);
	}, [orderBy, technology.id]);

	const selectOptions = [
		{ label: 'Mais recentes', value: 'created_at|DESC' },
		{ label: 'Mais Bem Avaliados', value: 'rating|DESC' },
		{ label: 'Mais Antigos', value: 'created_at|ASC' },
	];

	const updateOrder = (selected) => {
		const [selectedOrderBy, selectedOrder] = selected.split('|');
		setOrderBy({ orderBy: selectedOrderBy, order: selectedOrder });
		updateData();
	};

	return (
		<Layout.Cell>
			<Section title="Relatos" hideWhenIsEmpty={false}>
				<InputFieldWrapper>
					<select
						name="reviews"
						onChange={(event) => {
							updateOrder(event.target.value);
						}}
					>
						{selectOptions.map((option) => (
							<option value={option.value}>{option.label}</option>
						))}
					</select>
				</InputFieldWrapper>

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
