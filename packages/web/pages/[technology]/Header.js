import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { useTechnology } from '../../hooks';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const Header = () => {
	const { technology } = useTechnology();

	return (
		<>
			<Title>{technology.title}</Title>

			<HeaderContainer>
				<ImageContainer
					src={technology.thumbnail || defaultThumbnail}
					alt={technology.title}
					data-testid="image"
				/>
				<DescriptionContainer>
					<Title>{technology.title}</Title>
					<DescriptionText>{technology.description}</DescriptionText>
					<ActionsContainer>
						<ImplementationCost />
						<ButtonsContainer>
							<Button variant="success">Quero Adquirir Essa Tecnologia</Button>
							<Button variant="info">Quero Suporte Para Essa Tecnologia</Button>
						</ButtonsContainer>
					</ActionsContainer>
				</DescriptionContainer>
			</HeaderContainer>
		</>
	);
};

export const Title = styled.h1`
	color: ${({ theme: { colors } }) => colors.secondary};
	text-align: start;
	font-size: 2.4rem;
	font-weight: 600;
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
	font-weight: 300;
	color: ${({ theme: { colors } }) => colors.black};
	padding: 1rem 0;
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ImplementationCost = styled.div``;

export const ButtonsContainer = styled.div`
	/**
	  * TODO: https://github.com/ufersa/plataforma-sabia/issues/212
	  * change display from none to flex 
	*/

	display: none;
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

export default Header;
