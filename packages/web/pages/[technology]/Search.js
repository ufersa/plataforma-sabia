import React from 'react';
import { SearchBox, AlgoliaSearchProvider } from '../../components/Algolia';

import { SearchBoxContainer } from './styles';

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

export default Search;
