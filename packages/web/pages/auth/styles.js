import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 50rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 10rem 0 0 0;
	font-size: 3rem;
`;

export const Message = styled.div`
	width: 50%;
	padding: 3rem;
	text-align: center;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	box-shadow: 0rem 0rem 1rem ${({ theme }) => theme.colors.lightGray};

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;
