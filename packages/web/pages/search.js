import React from 'react';
import { SearchBox, Hits } from 'react-instantsearch-dom';

import Head from '../components/head';
import SearchItem from '../components/Search/SearchItem';

const Search = () => {
	return (
		<>
			<Head title="Search" />
			<SearchBox />
			<Hits hitComponent={SearchItem} />
		</>
	);
};
export default Search;
