import styled from 'styled-components';

export const Section = styled.section`
	background-color: ${(props) => props.bgColor};
	padding: 120px;

	h3 {
		margin-bottom: 130px;
		font-size: 5.6rem;
		line-height: 6.4rem;
		text-align: center;
		font-weight: normal;

		span {
			font-weight: bold;
		}
	}
`;

export const CardsContainer = styled.div`
	max-width: calc(100%-60px);
	margin: auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 70px 40px;
`;
