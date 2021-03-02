import React from 'react';
import PropTypes from 'prop-types';
import { TechnologyCard } from '../Card';

const TechnologyHitCard = ({
	hit: {
		id,
		title,
		category,
		private: privateTechnology,
		thumbnail,
		created_at: date,
		likes,
		slug,
		type,
		users,
	},
}) => {
	return (
		<TechnologyCard
			id={id}
			title={title}
			category={category}
			privateTechnology={!!privateTechnology}
			thumbnail={thumbnail?.url}
			date={new Date(date)}
			likes={likes}
			slug={slug}
			type={type}
			users={users}
		/>
	);
};

TechnologyHitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		private: PropTypes.number,
		users: PropTypes.shape({}),
		thumbnail: PropTypes.shape({ url: PropTypes.string }),
		created_at: PropTypes.string,
		likes: PropTypes.number,
		type: PropTypes.string,
		slug: PropTypes.string,
	}).isRequired,
};

export default TechnologyHitCard;
