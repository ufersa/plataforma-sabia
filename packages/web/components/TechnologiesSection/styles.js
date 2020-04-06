import styled from 'styled-components';

export const Section = styled.section`
	background-color: ${(props) => props.bgColor};
	padding: 12rem 0;
	width: 100%;

	h2 {
		margin-bottom: 12rem;
		text-align: center;

		span {
			font-weight: bold;
		}
	}
`;

export const CardsContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	grid-gap: 7rem 4rem;
`;
