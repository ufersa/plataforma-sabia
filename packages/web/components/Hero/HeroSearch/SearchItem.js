import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../Link';
import { SearchItemContainer, SearchItemImage, SearchItemText } from './styles';
import { CustomHighlight } from '../../Algolia';

const SearchItem = ({ hit }) => {
	const { title, thumbnail, slug } = hit;
	const dynamicTechnologyRoute = '/t/[technology]';
	const url = `/t/${slug}`;
	return (
		<Link href={dynamicTechnologyRoute} as={url}>
			<SearchItemContainer>
				<SearchItemImage>
					<img src={thumbnail} alt={title} />
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
		thumbnail: PropTypes.string,
		slug: PropTypes.string,
	}).isRequired,
};

export default SearchItem;
