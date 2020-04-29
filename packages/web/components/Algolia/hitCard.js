import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const HitCard = ({
	hit: { id, title, category, price, logo, place, created_at: date, likes, weeks, region },
}) => {
	return (
		<Card
			title={title}
			category={category}
			price={price}
			logo={logo}
			place={place}
			date={new Date(date)}
			likes={likes}
			weeks={weeks}
			region={region}
			url={`technology/${id}`}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
		logo: PropTypes.string,
		place: PropTypes.string,
		created_at: PropTypes.string,
		likes: PropTypes.number,
		weeks: PropTypes.number,
		region: PropTypes.string,
	}).isRequired,
};

export default HitCard;
