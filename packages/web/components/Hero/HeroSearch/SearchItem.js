import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../../Link';

const SearchItem = ({ hit }) => {
	const { title, logo, id } = hit;
	const url = `/technology/${id}`;
	return (
		<div className="container">
			<div className="image">
				<Link href={url}>
					<img src={logo} alt={title} />
				</Link>
			</div>
			<div className="text">
				<Link href={url}>
					<Highlight className="category" attribute="category" hit={hit} tagName="span" />
				</Link>
				<br />
				<div className="title">
					<Highlight attribute="title" hit={hit} tagName="span" />
				</div>
			</div>
		</div>
	);
};

SearchItem.propTypes = {
	hit: PropTypes.shape({
		title: PropTypes.string,
		logo: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
};

export default SearchItem;
