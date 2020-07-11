import styled from 'styled-components';

export const Container = styled.div`
	padding: 6rem 4rem;
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
	border-top-left-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border-top-right-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 2rem;
	width: 100%;
`;

export const DescriptionText = styled.p`
	line-height: 17px;
	font-weight: 300;
	color: ${({ theme }) => theme.colors.black};
`;

export const ActionsContainer = styled.div`
	//
`;

export const ImplementationCost = styled.div`
	width: 100%;
	display: none;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;

	button {
		text-transform: uppercase;
		font-size: 1.6rem;
		padding: 0.8rem;
		border-radius: 2px;
	}
`;
