import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(27rem, 1fr));
	grid-gap: 5rem 3rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 0 2rem;
	}
`;
