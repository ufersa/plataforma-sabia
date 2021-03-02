import React from 'react';
import PropTypes from 'prop-types';
import { ServiceCard } from '../Card';

const ServiceHitCard = ({ hit: { id, name, price, thumbnail, likes, user, measure_unit } }) => {
	return (
		<ServiceCard
			id={id}
			name={name}
			price={price}
			thumbnail={thumbnail?.url}
			likes={likes}
			user={user}
			measureUnit={measure_unit}
		/>
	);
};

ServiceHitCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		price: PropTypes.number,
		thumbnail: PropTypes.shape({ url: PropTypes.string }),
		likes: PropTypes.number,
		user: PropTypes.shape({}),
		measure_unit: PropTypes.string,
	}).isRequired,
};

export default ServiceHitCard;
