import React, { useState } from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { StyledHits, StyledStats } from './styles';
import { SearchBox, AlgoliaSearchProvider } from '../../Algolia';
import SearchItem from './SearchItem';

const HeroSearch = () => {
	const [termQuery, setTermQuery] = useState('');
	const { t } = useTranslation('search');
	const handleSubmit = async (e) => {
		e.preventDefault();
		return Router.push({
			pathname: '/search',
			query: { q: termQuery },
		});
	};
	return (
		<AlgoliaSearchProvider>
			<SearchBox
				placeholder={t('search:searchPlaceholder')}
				onChange={(e) => setTermQuery(e.currentTarget.value)}
				onSubmit={handleSubmit}
			/>
			<StyledStats
				translations={{
					stats(nbHits, timeSpentMS) {
						let msg;
						if (termQuery.length > 2 && nbHits) {
							msg = t('search:foundTerms', { nbHits, termQuery, timeSpentMS });
						} else if (!nbHits && timeSpentMS) {
							msg = t('search:termNotFound', { termQuery });
						}
						return msg;
					},
				}}
			/>
			<StyledHits hitComponent={SearchItem} />
		</AlgoliaSearchProvider>
	);
};

export default HeroSearch;
