import React, { useState } from 'react';
import Router from 'next/router';
import { AlgoliaSearchProvider } from './AlgoliaSearchProvider';
import { StyledSearchBox, StyledHits, StyledStats } from './styles';
import SearchItem from './SearchItem';

const Search = () => {
	const [termQuery, setTermQuery] = useState('');

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
					onChange={(e) => setTermQuery(e.currentTarget.value)}
					onSubmit={handleSubmit}
				/>
				<StyledStats
					translations={{
						stats(nbHits, timeSpentMS) {
							let msg;
							if (!nbHits && timeSpentMS) {
								msg = `Não foram encontrados resultados para o termo "${termQuery}"`;
							}
							if (termQuery.length > 2) {
								msg = `${nbHits} resultados encontrados para o termo "${termQuery}" em ${timeSpentMS}ms`;
							}
							return msg;
						},
					}}
				/>
				<StyledHits hitComponent={SearchItem} />
			</AlgoliaSearchProvider>
		</div>
	);
};

export default Search;
