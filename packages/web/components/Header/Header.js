import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Link } from '../Link';
import links from './links';
import { HamburguerMenu } from '../HamburguerMenu';
import UserHeader from './UserHeader';
import LanguageSwitcher from './LanguageSwitcher';
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
					<LanguageSwitcher />
					<UserHeader />
					<NewTechnologyButton />
					<HamburguerMenu links={links} />
				</RightContent>
			</Container>
		</StyledHeader>
	);
};

const StyledHeader = styled.header`
	display: flex;
	width: 100%;
	height: 6.5rem;
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: 0 0.1rem 0.3rem ${({ theme }) => theme.colors.darkWhite};

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		height: 6rem;
	}
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
	border-right: 0.1rem solid ${({ theme }) => theme.colors.border};
	width: 100%;
	height: 100%;

	img {
		height: 100%;
		width: 100%;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		border-right: none;
	}
`;

const MenuLinksWrapper = styled.nav`
	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		display: none;
	}
`;

const MenuLinksList = styled.ul`
	display: flex;
	justify-content: space-between;
	padding-left: 2rem;
`;

const MenuLinksItem = styled.li`
	font-size: 1.5rem;

	a {
		font-weight: 500;
		padding: 0 3rem;
		text-transform: uppercase;
		color: ${({ selected, theme }) => (selected ? theme.colors.secondary : theme.colors.black)};

		:hover {
			color: ${({ theme }) => theme.colors.darkGreen};
		}

		@media (max-width: ${({ theme }) => theme.screens.huge}px) {
			padding: 0 1rem;
		}
	}
`;

const RightContent = styled.div`
	display: flex;
	align-items: center;
`;

export default Header;
