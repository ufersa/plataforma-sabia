import React from 'react';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import Head from '../components/head';
import SearchCard from '../components/Search/SearchCard';
import { AlgoliaSearchProvider } from '../components/Search/AlgoliaSearchProvider';

const Search = () => {
	return (
		<div>
			<Head title="Search" />
			<AlgoliaSearchProvider>
				<SearchBox />
				<Hits hitComponent={SearchCard} />
			</AlgoliaSearchProvider>
		</div>
	);
};
export default Search;
