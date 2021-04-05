import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import { Link as NextLink } from '../Link';

import { Container, Menu, Bar, Nav, NavList, NavListItem, ButtonLink } from './styles';
import { useAuth, useModal } from '../../hooks';

const HamburguerMenu = ({ links, secondary, scroll }) => {
	const [open, setOpen] = useState(false);
	const toggleMenu = () => setOpen((prev) => !prev);
	const { pathname } = useRouter();
	const { user } = useAuth();
	const { openModal } = useModal();

	return (
		<Container>
			<Menu onClick={toggleMenu} open={open}>
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
			</Menu>
			<Nav open={open}>
				<NavList>
					{links.map(
						({
							id,
							label,
							href,
							to,
							sublinks = [],
							scrollLink,
							showOnlyIfAuth,
							openModalComponent,
							isButton,
						}) => {
							if (showOnlyIfAuth && !user.id) return null;

							if (isButton) {
								return (
									<NavListItem key={id || href} selected={pathname === href}>
										<ButtonLink
											onClick={() => {
												if (openModalComponent) {
													toggleMenu();
													openModal(openModalComponent);
												}
											}}
										>
											{label}
										</ButtonLink>
									</NavListItem>
								);
							}

							return (
								<NavListItem key={id || href} selected={pathname === href}>
									{scroll && scrollLink ? (
										<>
											<ScrollLink
												activeClass="active"
												to={to}
												spy
												smooth
												duration={500}
												offset={-60}
												onClick={toggleMenu}
											>
												{label}
											</ScrollLink>
											{sublinks?.map((link) => (
												<NextLink
													key={link.id}
													href={link.href}
													className="sublink"
													onClick={toggleMenu}
												>
													{link.label}
												</NextLink>
											))}
										</>
									) : (
										<NextLink href={href} onClick={toggleMenu}>
											{label}
										</NextLink>
									)}
								</NavListItem>
							);
						},
					)}
				</NavList>
			</Nav>
		</Container>
	);
};

HamburguerMenu.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			label: PropTypes.string,
			href: PropTypes.string,
		}),
	).isRequired,
	secondary: PropTypes.bool,
	scroll: PropTypes.bool,
};

HamburguerMenu.defaultProps = {
	secondary: false,
	scroll: false,
};

export default HamburguerMenu;
