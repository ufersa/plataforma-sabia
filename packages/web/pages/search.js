import React from 'react';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import Head from '../components/head';
import Nav from '../components/nav';
import AlgoliaSearchProvider from '../components/Search/AlgoliaSearchProvider';
import SearchCard from '../components/Search/SearchCard';

const Search = () => (
	<div>
		<Head title="Search" />
		<Nav />

		<AlgoliaSearchProvider>
			<SearchBox />
			<Hits hitComponent={SearchCard} />
		</AlgoliaSearchProvider>
	</div>
);

export default Search;
