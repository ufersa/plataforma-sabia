import styled from 'styled-components';

export const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme }) => theme.colors.orange};
`;

export const Container = styled.main`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;
`;

export const FilterContainer = styled.section`
	flex: 1;
	margin-right: 3rem;
	min-width: 30rem;
`;

export const FilterContainerHeader = styled.div`
	display: flex;
	align-items: center;
	min-height: 8rem;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	h2 {
		flex: 1;
		font-size: 2.4rem;
	}
`;

export const ResultsContainer = styled.section`
	width: 100%;

	.ais-Hits {
		padding-top: 4rem;

		.ais-Hits-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
			grid-gap: 5rem 3rem;
		}
	}
`;

export const ResultsContainerHeader = styled.div`
	min-height: 8rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	> div:not(:first-child) {
		margin-left: 3rem;
	}
`;

export const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
`;
