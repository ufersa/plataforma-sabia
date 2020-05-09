import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ContentContainer = styled.div`
	background-color: ${(props) => props.bgColor};
	padding: 12rem 5%;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 6rem 1%;
	}
`;
