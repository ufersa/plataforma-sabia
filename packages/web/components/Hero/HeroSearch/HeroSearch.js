import React, { useState } from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { SearchBox, AlgoliaSearchProvider } from '../../Algolia';

const HeroSearch = () => {
	const [termQuery, setTermQuery] = useState('');
	const { t } = useTranslation('search');
	const handleSubmit = async (e) => {
		e.preventDefault();
		return Router.push({
			pathname: '/search',
			query: { query: termQuery },
		});
	};

	return (
		<AlgoliaSearchProvider useProxy>
			<SearchBox
				placeholder={t('search:searchPlaceholder')}
				onChange={setTermQuery}
				onSubmit={handleSubmit}
				termQuery={termQuery}
			/>
		</AlgoliaSearchProvider>
	);
};

export default HeroSearch;
