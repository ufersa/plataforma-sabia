import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../../Link';

const SearchItem = ({ hit }) => {
	const { title, image, id } = hit;
	const url = `/technology/${id}`;
	return (
		<div>
			<img src={image} alt={title} />
			<Link href={url} className="name_div">
				<Highlight attribute="category" hit={hit} tagName="span" />
			</Link>
			<div>
				<Highlight attribute="title" hit={hit} tagName="span" />
			</div>
		</div>
	);
};

SearchItem.propTypes = {
	hit: PropTypes.shape({
		title: PropTypes.string,
		image: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
};

export default SearchItem;
