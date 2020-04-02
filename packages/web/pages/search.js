import React from 'react';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import Head from '../components/head';
import Nav from '../components/nav';
import { AlgoliaSearchProvider, SearchCard } from '../components/Search';

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
