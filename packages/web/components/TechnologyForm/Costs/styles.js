import styled from 'styled-components';

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	& > *:not(:first-child):not(:last-child) {
		margin: 0 10px;
	}

	@media (max-width: ${({ theme }) => theme.screens.small}px) {
		flex-direction: column;
		margin-top: 1.5rem;
	}
`;

export const Col = styled.div`
	flex: ${({ size }) => size || 1};

	@media (max-width: ${({ theme }) => theme.screens.small}px) {
		width: 100%;
	}
`;

export const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

export const Hr = styled.hr`
	background-color: #d3d3d3;
	height: 1px;
	border: 0;
`;
