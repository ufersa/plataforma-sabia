import React from 'react';
import Router from 'next/router';
import { AlgoliaSearchProvider } from './AlgoliaSearchProvider';
import { StyledSearchBox, StyledHits, StyledStats } from './styles';
import SearchCard from './SearchCard';

const Search = () => {
	let termQuery = '';

	const upTermQuery = (upData) => {
		termQuery = upData;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		return Router.push({
			pathname: '/search',
			query: { q: termQuery },
		});
	};
	return (
		<div>
			<AlgoliaSearchProvider>
				<StyledSearchBox
					translations={{
						placeholder: 'Qual solução você busca?',
					}}
					onChange={(e) => upTermQuery(e.currentTarget.value)}
					onSubmit={handleSubmit}
				/>
				<StyledStats
					translations={{
						stats(nbHits, timeSpentMS) {
							let msg;
							if (!nbHits && timeSpentMS) {
								msg = `No results were found for the term "${termQuery}"`;
							}
							if (termQuery.length > 2) {
								msg = `${nbHits} results found for the term "${termQuery}" in ${timeSpentMS}ms`;
							}
							return msg;
						},
					}}
				/>
				<StyledHits hitComponent={SearchCard} />
			</AlgoliaSearchProvider>
		</div>
	);
};

export default Search;
