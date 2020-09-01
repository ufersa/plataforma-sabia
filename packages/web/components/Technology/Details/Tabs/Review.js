import React, { useCallback, useState } from 'react';
import { useTechnology } from '../../../../hooks';
import { getReviews } from '../../../../services/technology';
import * as Layout from '../../../Common/Layout';
import { Wrapper as LoadingWrapper } from '../../../Loading';
import Section from '../Section';

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
					{!!reviews &&
						reviews?.map((review) => (
							<>
								<div>
									<div>
										<p>{review.user?.full_name}</p>
										<p>
											<span>{review.user?.company}, </span>
											<span>{review.user?.city}/</span>
											<span>{review.user?.state}, </span>
											<span>{review.user?.country}</span>
										</p>
									</div>

									<hr />

									<div>
										<p>Stars: {review.rating}</p>
									</div>
								</div>

								<div>
									<p>{review?.content}</p>
								</div>

								<div>
									{review.positive && (
										<>
											<p>Pontos positivos:</p>
											<ul>
												{review.positive.map((item) => (
													<li>{item}</li>
												))}
											</ul>
										</>
									)}
									{review.negative && (
										<>
											<p>Pontos negativos:</p>
											<ul>
												{review.negative.map((item) => (
													<li>{item}</li>
												))}
											</ul>
										</>
									)}
								</div>

								<br />
							</>
						))}
				</LoadingWrapper>
			</Section>
		</Layout.Cell>
	);
};

export default Review;
