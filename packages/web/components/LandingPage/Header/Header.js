import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from '../../Link';
import links from './links';
import { HamburguerMenu } from '../../HamburguerMenu';
import UserHeader from './UserHeader';
import NewTechnologyButton from './NewTechnologyButton';

const Header = () => {
	const { t } = useTranslation(['common']);

	return (
		<StyledHeader>
			<Container>
				<LeftContent>
					<LogoContainer>
						<Link href="/">
							<img src="/logo.svg" alt={t('common:logoDesc')} />
						</Link>
					</LogoContainer>
				</LeftContent>
				<RightContent>
					<MenuLinksWrapper>
						<MenuLinksList>
							{links.map(({ id, label, to }) => (
								<MenuLinksItem key={id}>
									<ScrollLink
										activeClass="active"
										to={to}
										spy
										smooth
										duration={500}
										offset={-65}
									>
										{label}
									</ScrollLink>
								</MenuLinksItem>
							))}
						</MenuLinksList>
					</MenuLinksWrapper>
					<UserHeader />
					<NewTechnologyButton />
					<HamburguerMenu links={links} secondary scroll />
				</RightContent>
			</Container>
		</StyledHeader>
	);
};

const StyledHeader = styled.header`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		width: 100%;
		height: 6.5rem;
		position: sticky;
		top: 0;
		z-index: 1100;
		background-color: ${colors.white};
		box-shadow: 0 0.1rem 0.3rem ${colors.darkWhite};
		box-shadow: 0 0 0.4rem ${colors.darkGray3};

		@media (max-width: ${screens.medium}px) {
			height: 6rem;
		}
	`}
`;

const Container = styled.div`
	width: 100%;
	padding-left: 1rem;
	display: flex;
	justify-content: space-between;
`;

const LeftContent = styled.div`
	display: flex;
	align-items: center;
`;

const LogoContainer = styled.div`
	width: 100%;
	height: 100%;

	img {
		height: 100%;
		width: 100%;
	}
`;

const MenuLinksWrapper = styled.nav`
	height: 100%;

	${({ theme: { screens } }) => css`
		@media (max-width: ${screens.large}px) {
			display: none;
		}
	`}
`;

const MenuLinksList = styled.ul`
	display: flex;
	justify-content: space-between;
	padding-left: 2rem;
	height: 100%;
`;

const MenuLinksItem = styled.li`
	${({ theme: { colors, screens } }) => css`
		font-size: 1.5rem;
		height: 100%;
		display: flex;
		align-items: center;

		a {
			font-weight: 500;
			padding: 0 2.4rem;
			text-transform: uppercase;
			color: ${colors.black};
			border-bottom: 0.4rem solid transparent;
			height: 100%;
			display: inline-flex;
			justify-content: center;
			align-items: center;

			&:hover {
				color: ${colors.darkGreen};
			}

			&.active {
				border-color: ${colors.secondary};
			}

			@media (max-width: ${screens.huge}px) {
				padding: 0 1rem;
			}
		}
	`}
`;

const RightContent = styled.div`
	display: flex;
	align-items: center;
`;

export default Header;
