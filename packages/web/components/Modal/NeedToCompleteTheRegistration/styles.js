import styled from 'styled-components';

export const StyledModal = styled.div`
	width: 50rem;
	form {
		margin-top: 0rem;
		padding-top: 0rem;
	}
	button {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.primary};
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	a {
		font-weight: 100;
	}
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;

export const StyledLabel = styled.div`
	display: block;
	font-weight: 500;
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.lightGray};
	padding-bottom: 2rem;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Container = styled.div`
	margin-top: 3rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	button {
		width: 100%;
		background-color: ${({ theme }) => theme.colors.secondary};
		margin-top: 1.5rem;
		margin-bottom: 2rem;
	}
`;
