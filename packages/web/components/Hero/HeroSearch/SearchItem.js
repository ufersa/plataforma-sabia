import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { SearchItemContainer, SearchItemText } from './styles';
import { CustomHighlight } from '../../Algolia';

const SearchItem = ({ hit }) => {
	const router = useRouter();

	const handleSuggestionClick = () =>
		router.push({ pathname: '/search', query: { query: hit.query } });

	return (
		<SearchItemContainer role="button" onClick={handleSuggestionClick}>
			<SearchItemText>
				<CustomHighlight attribute="query" hit={hit} tagName="mark" />
			</SearchItemText>
		</SearchItemContainer>
	);
};

SearchItem.propTypes = {
	hit: PropTypes.shape({
		query: PropTypes.string,
	}).isRequired,
};

export default SearchItem;
