import styled, { css } from 'styled-components';

const cardsGridStyles = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(27rem, 100%));
	grid-gap: 5rem 3rem;
	justify-content: center;
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 0 2rem;
	}

	.ais-Hits-item {
		display: flex;
	}
`;

// eslint-disable-next-line import/prefer-default-export
export const CardsWrapper = styled.div`
	${({ overwriteAlgoliaStyles, algoliaCustomCss }) => css`
		${!overwriteAlgoliaStyles
			? cardsGridStyles
			: css`
					.ais-Hits .ais-Hits-list {
						${cardsGridStyles};
					}
			  `};

		${!!algoliaCustomCss && algoliaCustomCss};
	`}
`;
