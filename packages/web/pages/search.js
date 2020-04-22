import React from 'react';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import Head from '../components/head';
import SearchItem from '../components/Search/SearchItem';
import { AlgoliaSearchProvider } from '../components/Search/AlgoliaSearchProvider';

const Search = () => {
	return (
		<div>
			<Head title="Search" />
			<AlgoliaSearchProvider>
				<SearchBox />
				<Hits hitComponent={SearchItem} />
			</AlgoliaSearchProvider>
		</div>
	);
};
export default Search;
