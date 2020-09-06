import React, { useState } from 'react';
import { useTechnology } from '../../../../../hooks';
import { getReviews } from '../../../../../services/technology';
import * as Layout from '../../../../Common/Layout';
import Loading from '../../../../Loading';
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

	const handleOrderBy = async (event) => {
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
					<select name="order" onChange={handleOrderBy}>
						{selectOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</SelectContainer>

				<Loading loading={loading}>
					{reviews ? (
						<ul>
							{reviews?.map((review) => (
								<Item key={review.id}>
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
													<PointsItem key={item} positive>
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
													<PointsItem key={item}>
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
					) : (
						<p>Nenhum relato cadastrado até o momento</p>
					)}
				</Loading>
			</Section>
		</Layout.Cell>
	);
};

export default Review;
