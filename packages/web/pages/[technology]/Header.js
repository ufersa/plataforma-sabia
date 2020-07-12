import React from 'react';
import { Button } from '../../components/Button';
import { useTechnology } from '../../hooks';

import {
	Title,
	ImageContainer,
	DescriptionContainer,
	HeaderContainer,
	DescriptionText,
	ActionsContainer,
	ImplementationCost,
	ButtonsContainer,
} from './styles';

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

export default Header;
