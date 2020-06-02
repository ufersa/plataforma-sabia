import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const HitCard = ({
	hit: {
		title,
		category,
		private: privateTechnology,
		patent,
		thumbnail,
		installation_time,
		created_at: date,
		likes,
		slug,
	},
}) => {
	return (
		<Card
			title={title}
			category={category}
			privateTechnology={!!privateTechnology}
			patent={!!patent}
			thumbnail={thumbnail}
			date={new Date(date)}
			likes={likes}
			installation_time={installation_time}
			url={`technology/${slug}`}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		title: PropTypes.string,
		category: PropTypes.string,
		private: PropTypes.number,
		patent: PropTypes.number,
		thumbnail: PropTypes.string,
		created_at: PropTypes.string,
		likes: PropTypes.number,
		installation_time: PropTypes.number,
		slug: PropTypes.string,
	}).isRequired,
};

export default HitCard;
