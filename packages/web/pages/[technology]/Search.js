import React from 'react';
import styled from 'styled-components';
import { SearchBox, AlgoliaSearchProvider } from '../../components/Algolia';

const Search = () => {
	return (
		<>
			<AlgoliaSearchProvider>
				<SearchBoxContainer>
					<SearchBox />
				</SearchBoxContainer>
			</AlgoliaSearchProvider>
		</>
	);
};

export const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme: { colors } }) => colors.secondary};
`;

export default Search;
