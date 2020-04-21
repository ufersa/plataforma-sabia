import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../Link';

const SearchItem = ({ hit }) => {
	const { name, image, objectID } = hit;
	const url = `/technology/${objectID}`;
	return (
		<div>
			<img src={image} alt={name} />
			<Link href={url} className="name_div">
				<Highlight attribute="name" hit={hit} tagName="span" />
			</Link>
			<div>
				<Highlight attribute="description" hit={hit} tagName="span" />
			</div>
		</div>
	);
};

SearchItem.propTypes = {
	hit: PropTypes.shape({
		name: PropTypes.string,
		image: PropTypes.string,
		objectID: PropTypes.string,
	}).isRequired,
};

export default SearchItem;
