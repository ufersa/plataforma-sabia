import styled from 'styled-components';

export const Section = styled.section`
	background-color: ${(props) => props.bgColor};
	padding: 12rem 0;
	width: 100%;

	h2 {
		padding: 0 3rem;
		margin-bottom: 12rem;
		text-align: center;

		span {
			font-weight: bold;
		}
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 6rem 0;

		h2 {
			font-size: 3rem;
			margin-bottom: 6rem;
		}
	}
`;

export const CardsContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
	grid-gap: 7rem 4rem;
`;
