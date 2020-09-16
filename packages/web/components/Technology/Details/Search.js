import React from 'react';
import styled from 'styled-components';
import { AlgoliaSearchProvider } from '@sabia/core';
import { SearchBox } from '../../Algolia';

const Search = () => {
	return (
		<>
			<AlgoliaSearchProvider useProxy>
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
