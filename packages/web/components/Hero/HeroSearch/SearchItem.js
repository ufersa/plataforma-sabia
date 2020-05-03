import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../Link';
import { SearchItemContainer, SearchItemImage, SearchItemText } from './styles';
import { CustomHighlight } from '../../Algolia';

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
					<CustomHighlight attribute="title" hit={hit} />
					<CustomHighlight attribute="description" hit={hit} maxTextSize={15} />
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
