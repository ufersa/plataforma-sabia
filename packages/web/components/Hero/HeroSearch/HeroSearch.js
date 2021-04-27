import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { SearchBox, AlgoliaSearchProvider } from '../../Algolia';

const HeroSearch = ({ solution, placeholder, algoliaIndexType }) => {
	const [termQuery, setTermQuery] = useState('');
	const { t } = useTranslation('search');
	const handleSubmit = async (e) => {
		e.preventDefault();
		return Router.push({
			pathname: '/search',
			query: {
				query: termQuery,
				solution,
			},
		});
	};

	return (
		<AlgoliaSearchProvider useProxy indexType={algoliaIndexType}>
			<SearchBox
				placeholder={t(placeholder)}
				onChange={setTermQuery}
				onSubmit={handleSubmit}
				termQuery={termQuery}
			/>
		</AlgoliaSearchProvider>
	);
};

HeroSearch.propTypes = {
	solution: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	algoliaIndexType: PropTypes.string.isRequired,
};

export default HeroSearch;
