import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
	grid-gap: 5rem 3rem;
	justify-content: space-around;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		justify-items: center;
	}
`;
