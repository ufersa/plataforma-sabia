import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useTechnology } from '../../../../hooks';
import { getReviews } from '../../../../services/technology';
import * as Layout from '../../../Common/Layout';
import { Wrapper as LoadingWrapper } from '../../../Loading';
import Section from '../Section';
import Rating from '../../../Rating';

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

const Item = styled.li`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		list-style: none;
		padding: 2rem 0;

		&:not(:last-child) {
			border-bottom: 0.1rem solid ${colors.mediumGray};
		}
	`}
`;

const Header = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		width: 100%;

		@media (max-width: ${screens.small}px) {
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
		}

		div {
			&:first-child {
				width: calc(100% - 12rem);
			}

			&:last-child {
				width: 12rem;
			}
		}
	`}
`;

const FullName = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.8rem;
		font-weight: 500;
		padding-bottom: 0.5rem;
		color: ${colors.blue};
	`}
`;

const Text = styled.p`
	${({ theme: { colors } }) => css`
		font-weight: 300;
		font-size: 1.6rem;
		line-height: 2rem;
		color: ${colors.black};
	`}
`;

const PointsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;

			ul {
				width: 100%;

				&:first-of-type {
					margin-bottom: 1rem;
				}
			}
		}
	`}
`;

const PointsTitle = styled.p`
	${({ positive, theme: { colors } }) => css`
		font-weight: 500;
		color: ${positive ? colors.secondary : colors.red};
	`}
`;

const PointsItem = styled.div`
	${({ theme: { sizes } }) => css`
		display: flex;
		align-items: flex-start;
		justify-content: initial;
		margin: 0.5rem;

		p {
			width: calc(100% - ${sizes.mediumIcon}rem);
		}

		svg {
			width: ${sizes.mediumIcon}rem;
			margin-right: 0.5rem;
		}
	`}
`;

const PositiveIcon = styled(AiFillPlusCircle).attrs(({ theme: { colors, sizes } }) => ({
	color: colors.secondary,
	size: `${sizes.mediumIcon}rem`,
}))``;

const NegativeIcon = styled(AiFillMinusCircle).attrs(({ theme: { colors, sizes } }) => ({
	color: colors.red,
	size: `${sizes.mediumIcon}rem`,
}))``;

export default Review;
