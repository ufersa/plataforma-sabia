import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ item }) => {
	return (
		<div>
			<img src={item.image} alt="" />
			<h2>{item.label}</h2>
			{item.description && <p>{item.description}</p>}
		</div>
	);
};

Item.propTypes = {
	item: PropTypes.shape({
		label: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
};

export default Item;
