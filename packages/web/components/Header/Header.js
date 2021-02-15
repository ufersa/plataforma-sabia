import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from '../Link';
import links from './links';
import { HamburguerMenu } from '../HamburguerMenu';
import UserHeader from './UserHeader';
import NewSolutionButton from './NewSolutionButton';
import Dropdown from './Dropdown';
import ShoppingCart from './ShoppingCart';

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
							{links.map(({ id, label, href, dropdown, external, sublinks = [] }) => (
								<MenuLinksItem dropdown={dropdown} key={id}>
									<Link
										activeClass={pathname === href ? 'active' : ''}
										href={href}
										target={external ? '_blank' : '_self'}
										rel={external ? 'noreferrer' : ''}
									>
										{label}
										{dropdown && <FaChevronDown />}
									</Link>
									{dropdown && <Dropdown links={sublinks} />}
								</MenuLinksItem>
							))}
						</MenuLinksList>
					</MenuLinksWrapper>
				</LeftContent>
				<RightContent>
					<UserHeader />
					<ShoppingCart />
					<NewSolutionButton />
					<HamburguerMenu links={links} scroll />
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
		height: 100%;

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
		display: flex;
		align-items: center;
		position: relative;

		a {
			padding: 0 3rem;
			text-transform: uppercase;
			color: ${colors.black};
			display: inline-flex;
			justify-content: center;
			align-items: center;

			&:hover,
			&:focus-within {
				color: ${colors.darkGreen};
			}

			&.active {
				border-color: ${colors.secondary};
			}

			@media (max-width: ${screens.huge}px) {
				padding: 0 1rem;
			}
		}

		&:hover > .dropdown,
		&:focus-within > .dropdown,
		.dropdown:hover,
		.dropdown:focus {
			visibility: visible;
			opacity: 1;
			display: block;
		}
	`}
`;

const RightContent = styled.div`
	display: flex;
	align-items: center;
`;

export default Header;
