import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';

const SearchCard = ({ hit }) => {
	const { name, image } = hit;
	return (
		<div>
			<img src={image} alt={name} />
			<h2>
				<Highlight attribute="name" hit={hit} />
			</h2>
			<p>
				<Highlight attribute="description" hit={hit} />
			</p>
		</div>
	);
};

SearchCard.propTypes = {
	hit: PropTypes.shape({
		name: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
};

export default SearchCard;
