import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';
import Link from '../../Link';
import { SearchItemContainer, SearchItemImage, SearchItemText } from './styles';

const SearchItem = ({ hit }) => {
	const { title, logo, id } = hit;
	const url = `/technology/${id}`;
	return (
		<Link href={url}>
			<SearchItemContainer>
				<SearchItemImage>
					<img src={logo} alt={title} />
				</SearchItemImage>
				<SearchItemText>
					<Highlight attribute="title" hit={hit} tagName="span" />
					<Highlight attribute="description" hit={hit} tagName="span" />
				</SearchItemText>
			</SearchItemContainer>
		</Link>
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
