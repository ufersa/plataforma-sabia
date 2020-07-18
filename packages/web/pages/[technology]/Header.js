import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { useTechnology } from '../../hooks';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const Header = () => {
	const { technology } = useTechnology();

	return (
		<>
			<MainTitle>{technology.title}</MainTitle>

			<HeaderContainer>
				<ImageContainer
					src={technology.thumbnail || defaultThumbnail}
					alt={technology.title}
					data-testid="image"
				/>
				<DescriptionContainer>
					<DescriptionTitle>{technology.title}</DescriptionTitle>
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

export const MainTitle = styled.h1`
	color: ${({ theme: { colors } }) => colors.secondary};
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightGray4};
	text-align: start;
	font-size: 2.8rem;
	font-weight: 600;
`;

export const DescriptionTitle = styled.h2`
	color: ${({ theme: { colors } }) => colors.secondary};
	text-align: start;
	font-size: 2.8rem;
	font-weight: 600;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin-top: 1rem;
	}
`;

export const ImageContainer = styled.img`
	margin: 1rem 1rem 1rem 0;
	width: 100%;
	max-width: 450px;
	height: auto;
	border-radius: ${({ theme: { metrics } }) => metrics.smallRadius}rem;
	-webkit-box-shadow: 0.5px 0.5px 10px 0 ${({ theme: { colors } }) => colors.lightGray3};
	box-shadow: 0.5px 0.5px 10px 0 ${({ theme: { colors } }) => colors.lightGray3};

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
