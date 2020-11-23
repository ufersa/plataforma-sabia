import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { SmallSearchBox, AlgoliaSearchProvider } from '../../Algolia';

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
			<SearchBoxWrapper>
				<SearchBoxContainer>
					<SmallSearchBox
						placeholder={t('search:searchPlaceholder')}
						onSubmit={handleSubmit}
						onChange={setTermQuery}
						termQuery={termQuery}
					/>
				</SearchBoxContainer>
			</SearchBoxWrapper>
		</AlgoliaSearchProvider>
	);
};

const SearchBoxWrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.secondary};
		background-image: url(/pattern.png);
		background-size: auto 8.8rem;
		background-repeat: no-repeat;
		background-position: right center;
	`}
`;

export const SearchBoxContainer = styled.div`
	${({ theme: { screens } }) => css`
		height: 8.8rem;
		display: flex;
		align-items: center;
		padding: 1.6rem;
		padding-left: 2rem;
		max-width: 1440px;
		margin: 0 auto;

		@media screen and (min-width: ${screens.medium}px) {
			padding-left: 4rem;
		}
	`}
`;

export default Search;
