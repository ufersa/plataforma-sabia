import React, { useCallback, useState } from 'react';
import { useTechnology } from '../../../../hooks';
import { getReviews } from '../../../../services/technology';
import * as Layout from '../../../Common/Layout';
import Loading from '../../../Loading';
import Section from '../Section';

const Review = () => {
	const { technology } = useTechnology();

	const [reviews, setReviews] = useState(technology.reviews);
	const [loading, setLoading] = useState(false);
	const [orderBy, setOrderBy] = useState({
		orderBy: 'created_at',
		order: 'DESC',
	});

	const updateReviewsData = useCallback(async () => {
		setLoading(true);

		const response = await getReviews(technology.id, orderBy);
		setReviews(response);

		setLoading(false);
	}, [orderBy, technology.id]);

	const reviewSelectOptions = [
		{ label: 'Mais recentes', value: 'created_at|DESC' },
		{ label: 'Mais Bem Avaliados', value: 'rating|DESC' },
		{ label: 'Mais Antigos', value: 'created_at|ASC' },
	];

	const updateReviewSelectOrder = (selected) => {
		const [selectedOrderBy, selectedOrder] = selected.split('|');
		setOrderBy({ orderBy: selectedOrderBy, order: selectedOrder });
		updateReviewsData();
	};

	return (
		<Layout.Cell>
			<Section title="Relatos" hideWhenIsEmpty={false}>
				<select
					name="reviews"
					onChange={(event) => {
						updateReviewSelectOrder(event.target.value);
					}}
				>
					{reviewSelectOptions.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
				</select>

				{loading ? (
					<Loading />
				) : (
					!!reviews &&
					reviews?.map((review) => (
						<>
							<p>{review.id}</p>
						</>
					))
				)}
			</Section>
		</Layout.Cell>
	);
};

export default Review;
