import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

const HitCard = ({
	hit: {
		id,
		title,
		category,
		private: privateTechnology,
		thumbnail,
		created_at: date,
		likes,
		slug,
		institution,
	},
}) => {
	return (
		<Card
			id={id}
			title={title}
			category={category}
			privateTechnology={!!privateTechnology}
			thumbnail={thumbnail}
			date={new Date(date)}
			likes={likes}
			url={`t/${slug}`}
			institution={institution}
		/>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		private: PropTypes.number,
		institution: PropTypes.string,
		thumbnail: PropTypes.string,
		created_at: PropTypes.string,
		likes: PropTypes.number,
		slug: PropTypes.string,
	}).isRequired,
};

export default HitCard;
