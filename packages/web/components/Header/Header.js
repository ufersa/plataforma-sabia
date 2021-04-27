import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from '../Link';
import { aboutLinks, defaultLinks } from './links';
import { HamburguerMenu } from '../HamburguerMenu';
import UserHeader from './UserHeader';
import ShoppingCart from './ShoppingCart';
import NewSolutionButton from './NewSolutionButton';
import Dropdown from './Dropdown';
import { useAuth } from '../../hooks';
import { internal as internalPages } from '../../utils/consts/pages';

const Header = ({ isAbout }) => {
	const { t } = useTranslation(['common']);
	const router = useRouter();
	const { user } = useAuth();
	const links = isAbout ? aboutLinks : defaultLinks;

	return (
		<StyledHeader>
			<Container>
				<LeftContent>
					<LogoContainer>
						<Link href={internalPages.home}>
							<img src="/logo.svg" alt={t('common:logoDesc')} />
						</Link>
					</LogoContainer>
				</LeftContent>
				<RightContent>
					<MenuLinksWrapper>
						<MenuLinksList>
							{links.map(
								({
									id,
									label,
									to,
									href,
									dropdown,
									sublinks = [],
									scrollLink,
									showOnlyInHamburguer,
									showOnlyIfAuth,
								}) => {
									if (showOnlyInHamburguer || (showOnlyIfAuth && !user.id))
										return null;

									return (
										<MenuLinksItem dropdown={dropdown} key={id || href}>
											{scrollLink ? (
												<ScrollLink
													activeClass="active"
													to={to}
													spy
													smooth
													duration={500}
													offset={-65}
												>
													{label}
													{dropdown && <FaChevronDown />}
												</ScrollLink>
											) : (
												<Link
													href={href}
													className={
														sublinks.find(
															(link) => link.href === router.pathname,
														) && 'active'
													}
												>
													{label}
													{dropdown && <FaChevronDown />}
												</Link>
											)}
											{dropdown && <Dropdown links={sublinks} />}
										</MenuLinksItem>
									);
								},
							)}
						</MenuLinksList>
					</MenuLinksWrapper>
					<UserHeader />
					<ShoppingCart />
					<NewSolutionButton />
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
		padding: 9px 0;
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
	${({ theme: { colors } }) => css`
		font-size: 1.5rem;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 1.2rem;
		position: relative;

		a {
			padding: 0;
			font-weight: bold;
			text-transform: uppercase;
			color: ${colors.black};
			border-bottom: 0.4rem solid transparent;
			height: 100%;
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

			svg {
				margin-left: 0.8rem;
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

Header.propTypes = {
	isAbout: PropTypes.bool,
};

Header.defaultProps = {
	isAbout: false,
};

export default Header;
