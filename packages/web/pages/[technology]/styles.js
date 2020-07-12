import styled from 'styled-components';

export const Container = styled.div`
	padding: 2rem;

	@media (min-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 6rem 4rem;
	}
`;

export const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme }) => theme.colors.secondary};
`;

export const Title = styled.h1`
	color: ${({ theme }) => theme.colors.secondary};
	text-align: start;
	font-size: 2.4rem;
	font-weight: 600;
	line-height: 34px;
`;

export const ImageContainer = styled.img`
	padding: 1rem 1rem 1rem 0;
	width: 100%;
	max-width: 450px;
	height: auto;
	border-top-left-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border-top-right-radius: ${({ theme }) => theme.metrics.baseRadius}rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		max-width: 100%;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;

	@media (min-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 1rem;
	}

	@media (min-width: ${({ theme }) => theme.screens.large}px) {
		padding: 2rem;
	}
`;

export const DescriptionText = styled.p`
	line-height: 17px;
	font-weight: 300;
	color: ${({ theme }) => theme.colors.black};
	padding: 10px 0;
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ImplementationCost = styled.div``;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}

	button {
		text-transform: uppercase;
		font-size: 1.8rem;
		padding: 0.8rem;
		border-radius: 2px;

		&:first-child {
			margin-right: 5px;
		}

		&:last-child {
			margin-right: 5px;
		}

		@media (max-width: ${({ theme }) => theme.screens.medium}px) {
			margin: 5px 0;
		}
	}
`;
