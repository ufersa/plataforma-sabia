import styled from 'styled-components';

export const ContentContainer = styled.div`
	background-color: ${(props) => props.bgColor};
	padding: 9rem 5%;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 6rem 1%;
	}
`;

export const ColumnContainer = styled.div`
	display: flex;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const Column = styled.div`
	flex: 1;
	padding: 0 1rem;
`;
