import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { Link } from '../Link';
import links from './links';
import { HamburguerMenu } from '../HamburguerMenu';
import UserHeader from './UserHeader';
import NewTechnologyButton from './NewTechnologyButton';

const Header = () => {
	const { t } = useTranslation(['common']);
	const { pathname } = useRouter();
	return (
		<StyledHeader>
			<Container>
				<LeftContent>
					<LogoContainer>
						<Link href="/">
							<img src="/logo.svg" alt={t('common:logoDesc')} />
						</Link>
					</LogoContainer>
					<MenuLinksWrapper>
						<MenuLinksList>
							{links.map(({ id, label, href }) => (
								<MenuLinksItem key={id} selected={pathname === href}>
									<Link href={href}>{label}</Link>
								</MenuLinksItem>
							))}
						</MenuLinksList>
					</MenuLinksWrapper>
				</LeftContent>
				<RightContent>
					<UserHeader />
					<NewTechnologyButton />
					<HamburguerMenu links={links} />
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
		border-bottom: 0.1rem solid ${colors.border};

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
	${({ theme: { colors, screens } }) => css`
		border-right: 0.1rem solid ${colors.border};
		width: 100%;
		height: 100%;

		img {
			height: 100%;
			width: 100%;
		}

		@media (max-width: ${screens.medium}px) {
			border-right: none;
		}
	`}
`;

const MenuLinksWrapper = styled.nav`
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
`;

const MenuLinksItem = styled.li`
	${({ theme: { colors, screens }, selected }) => css`
		font-size: 1.2rem;

		a {
			padding: 0 3rem;
			text-transform: uppercase;
			color: ${selected ? colors.secondary : colors.silver};

			:hover {
				color: ${colors.darkGreen};
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
