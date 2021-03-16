import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const CardsWrapper = styled.div`
	${({ $overrideAlgoliaStyle }) => css`
		${$overrideAlgoliaStyle ? '.ais-Hits .ais-Hits-list' : undefined} {
			display: grid;
			grid-template-columns: repeat(auto-fit, min(27rem, 100%));
			grid-gap: 5rem 3rem;
			justify-content: center;
			@media (max-width: ${({ theme }) => theme.screens.medium}px) {
				padding: 0 2rem;
			}
		}
	`}
`;
