import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AlgoliaSearchProvider, SmallSearchBox } from '../../Algolia';

const Search = () => {
	const [termQuery, setTermQuery] = useState('');
	const { t } = useTranslation('search');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		return router.push({
			pathname: '/search',
			query: { query: termQuery },
		});
	};
	return (
		<AlgoliaSearchProvider useProxy>
			<SmallSearchBox
				placeholder={t('search:searchPlaceholder')}
				onSubmit={handleSubmit}
				onChange={setTermQuery}
				termQuery={termQuery}
			/>
		</AlgoliaSearchProvider>
	);
};

export default Search;
