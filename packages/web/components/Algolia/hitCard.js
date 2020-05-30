import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const HitCard = ({
	hit: { id, title, category, thumbnail, installation_time, created_at: date, likes },
}) => {
	return (
		<Card
			title={title}
			category={category}
			thumbnail={thumbnail}
			date={new Date(date)}
			likes={likes}
			installation_time={installation_time}
			url={`technology/${id}`}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		thumbnail: PropTypes.string,
		created_at: PropTypes.string,
		likes: PropTypes.number,
		installation_time: PropTypes.number,
	}).isRequired,
};

export default HitCard;
