import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../../Link';
import { SearchItemContainer, SearchItemImage, SearchItemText } from './styles';

const SearchItem = ({ hit }) => {
	const { title, logo, id } = hit;
	const url = `/technology/${id}`;
	return (
		<SearchItemContainer>
			<SearchItemImage>
				<Link href={url}>
					<img src={logo} alt={title} />
				</Link>
			</SearchItemImage>
			<SearchItemText>
				<Link href={url}>
					<Highlight attribute="category" hit={hit} tagName="span" />
				</Link>
				<Highlight attribute="title" hit={hit} tagName="span" />
			</SearchItemText>
		</SearchItemContainer>
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
