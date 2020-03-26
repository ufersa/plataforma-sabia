import styled from 'styled-components';

export const Section = styled.section`
	background-color: #f2f2f2;
	padding: 30px 50px;

	h2 {
		margin-bottom: 30px;
		font-size: 4rem;
	}
`;

export const CardsContainer = styled.div`
	max-width: 100%;
	margin: auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 30px;
`;
