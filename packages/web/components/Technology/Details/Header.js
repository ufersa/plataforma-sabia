import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../Button';
import { useTechnology, useAuth, useModal } from '../../../hooks';
import { Likes, Share } from '../../Card';
import ImagesCarousel from './ImagesCarousel';

const Header = () => {
	const { technology, implementationCosts } = useTechnology();
	const { openModal } = useModal();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);

	const handleClick = ({ target: { name } }) => {
		if (!user.email) {
			return openModal('login', {
				message: t('common:signInToContinue'),
				onSuccessLogin: () => openModal(name),
			});
		}

		return openModal(name);
	};

	return (
		<>
			<MainTitle>{technology.title}</MainTitle>

			<HeaderContainer>
				<ImagesCarousel />
				<DescriptionContainer>
					<UpContent>
						<DescriptionTitle>{technology.title}</DescriptionTitle>
						<UpContentButtonsContainer>
							<Share />
							<Likes id={technology.id} count={technology.likes} />
						</UpContentButtonsContainer>
					</UpContent>
					<DescriptionText>{technology.description}</DescriptionText>
					<ActionsContainer>
						{!!implementationCosts && (
							<ImplementationCost>
								<p>Custo de Implantação:</p>
								<h5>{implementationCosts}</h5>
							</ImplementationCost>
						)}
						<ActionButtonsContainer>
							<Button variant="success" name="buyTechnology" onClick={handleClick}>
								Quero Adquirir Essa Tecnologia
							</Button>
							<Button variant="info">Quero Suporte Para Essa Tecnologia</Button>
						</ActionButtonsContainer>
					</ActionsContainer>
				</DescriptionContainer>
			</HeaderContainer>
		</>
	);
};

export const MainTitle = styled.h1`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		border-bottom: 1px solid ${colors.lightGray4};
		text-align: start;
		font-size: 2.8rem;
		font-weight: 600;
	`}
`;

export const UpContent = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (max-width: ${screens.small}px) {
			flex-direction: column;
		}
	`}
`;

export const UpContentButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-evenly;
		flex-direction: row;

		button {
			text-transform: uppercase;
			font-size: 1.8rem;
			padding: 0.8rem;
			border-radius: 2px;
			margin: 0;
		}

		@media (max-width: ${screens.small}px) {
			width: 100%;
		}
	`}
`;

export const DescriptionTitle = styled.h2`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.secondary};
		text-align: start;
		font-size: 2.8rem;
		font-weight: 600;

		@media (max-width: ${screens.medium}px) {
			margin-top: 1rem;
		}
	`}
`;

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const DescriptionContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;

		@media (min-width: ${screens.medium}px) {
			padding: 1rem;
		}

		@media (min-width: ${screens.large}px) {
			padding: 2rem;
		}
	`}
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

export const ImplementationCost = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 2rem 0;

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-between;
		}

		p {
			font-size: 1.8rem;
			font-weight: 300;
			text-transform: uppercase;
			color: ${colors.black};

			@media (min-width: ${screens.medium}px) {
				margin-right: 0.5rem;
			}
		}

		h5 {
			font-weight: 700;
			font-size: 2rem;
			text-align: center;

			color: ${colors.primary};
		}
	`}
`;

export const ActionButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-evenly;

		@media (max-width: ${screens.medium}px) {
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

			@media (max-width: ${screens.medium}px) {
				margin: 5px 0;
			}
		}
	`}
`;

export default Header;
