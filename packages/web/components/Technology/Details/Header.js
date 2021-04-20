import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag } from 'react-icons/fi';
import { Button } from '../../Button';
import ButtonStyles from '../../Button/styles';
import { useTechnology, useAuth, useModal } from '../../../hooks';
import { Likes, Share } from '../../Card';
import ImagesCarousel from './ImagesCarousel';
import { formatMoney } from '../../../utils/helper';
import { ROLES } from '../../../utils/enums/api.enum';

const Header = () => {
	const { technology } = useTechnology();
	const { openModal } = useModal();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);

	const handleClick = ({ target: { name } }) => {
		if (!user.email) {
			return openModal('login', {
				message: t('common:signInToContinue'),
				onSuccessLogin: () => openModal(name, { technology }),
			});
		}

		if (!user.operations.can_buy_technology) {
			return openModal('pendingUserData', {
				message: 'Complete o seu cadastro para adquirir esta tecnologia.',
			});
		}

		return openModal(name, { technology });
	};

	const ownerUser = technology.users?.find((tUser) => tUser.pivot.role === ROLES.OWNER);

	return (
		<HeaderContainer>
			<ImagesCarousel />
			<DescriptionContainer>
				<UpContent>
					<DescriptionTitle>{technology.title}</DescriptionTitle>
					<UpContentButtonsContainer>
						<Share />
						<Likes id={technology.id} count={technology.likes} type="technology" />
					</UpContentButtonsContainer>
				</UpContent>
				<DescriptionContentWrapper>
					<DescriptionText>
						<p>Descrição</p>
						{technology.description}
						{!!ownerUser?.institution && (
							<p>
								{ownerUser.institution.initials} - {ownerUser.institution.name}
							</p>
						)}
					</DescriptionText>
					<ActionsContainer>
						{!!technology.technologyCosts?.is_seller && (
							<TechnologyPrice>
								<h5>{formatMoney(technology.technologyCosts?.price)}</h5>
								<p>A unidade</p>
							</TechnologyPrice>
						)}
						<ActionButtonsContainer>
							{!!technology.technologyCosts?.is_seller && (
								<Button
									variant="success"
									name="buyTechnology"
									onClick={handleClick}
								>
									<FiShoppingBag fontSize="1.6rem" />
									Adquirir essa tecnologia
								</Button>
							)}
						</ActionButtonsContainer>
					</ActionsContainer>
				</DescriptionContentWrapper>
			</DescriptionContainer>
		</HeaderContainer>
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
	${({ theme: { screens, colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 1.6rem;
		border-bottom: 1px solid ${colors.lightGray4};

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

const DescriptionContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export const DescriptionTitle = styled.h2`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.secondary};
		text-align: start;
		font-size: 3.6rem;
		font-weight: 500;
		line-height: 4.2rem;

		@media (max-width: ${screens.medium}px) {
			margin-top: 1rem;
		}
	`}
`;

export const HeaderContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-between;

		@media (max-width: ${screens.large}px) {
			flex-direction: column;
		}
	`}
`;

export const DescriptionText = styled.div`
	${({ theme: { colors } }) => css`
		font-size: 1.2rem;
		font-weight: 500;
		line-height: 1.6rem;
		color: ${colors.lightGray2};
		padding: 1.6rem 0;
		flex-basis: 100%;
		margin-right: 3.2rem;
		text-align: justify;

		p:first-child {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
			margin-bottom: 0.8rem;
		}

		p:last-child {
			color: ${colors.silver};
			font-size: 1.2rem;
			line-height: 2.4rem;
			margin-top: 0.4rem;
		}
	`}
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	${ButtonStyles} {
		display: flex;
		align-items: center;
		font-weight: 700;
		font-size: 1.4rem;
		line-height: 2.4rem;

		svg {
			margin-right: 0.4rem;
		}
	}
`;

export const DescriptionContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-top: 3.2rem;

		@media (max-width: ${screens.medium}px) {
			${ActionsContainer} {
				margin: auto;
			}
		}

		@media (min-width: ${screens.medium}px) {
			padding: 1rem;
		}

		@media (min-width: ${screens.large}px) {
			padding: 0 0 3.2rem 3.2rem;
			margin-top: 0;
		}
	`}
`;

export const TechnologyPrice = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		margin-bottom: 2rem;

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-between;
		}

		h5 {
			font-weight: 500;
			font-size: 3.6rem;
			text-align: center;
			word-break: break-all;

			color: ${colors.silver};

			@media (max-width: ${screens.small}px) {
				font-size: 3rem;
			}
		}

		p {
			align-self: flex-end;
			color: ${colors.lightGray2};
			font-size: 0.8rem;
			font-weight: 700;
			line-height: 1.2rem;
		}
	`}
`;

export const ActionButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		button {
			text-transform: uppercase;
			font-size: 1.8rem;
			padding: 0.8rem;
			border-radius: 2px;
			white-space: nowrap;
			margin-bottom: 1rem;
			width: max-content;
		}

		@media (max-width: ${screens.small + 1}px) {
			button {
				justify-content: center;
			}
		}
	`}
`;

export default Header;
