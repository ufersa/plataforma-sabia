import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Link as ScrollLink } from 'react-scroll';
import { Link as NextLink } from '../Link';

import { Container, Menu, Bar, Nav, NavList, NavListItem } from './styles';

const HamburguerMenu = ({ links, secondary, scroll }) => {
	const [open, setOpen] = useState(false);
	const toggleMenu = () => setOpen((prev) => !prev);
	const { pathname } = useRouter();

	const Link = scroll ? ScrollLink : NextLink;

	return (
		<Container>
			<Menu onClick={toggleMenu} open={open}>
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
			</Menu>
			<Nav open={open}>
				<NavList>
					{links.map(({ id, label, href, to, sublinks = [] }) => (
						<NavListItem key={id} selected={pathname === href}>
							{scroll ? (
								<>
									<ScrollLink
										activeClass="active"
										to={to}
										spy
										smooth
										duration={500}
										offset={-60}
									>
										{label}
									</ScrollLink>
									{sublinks?.map((link) => (
										<NextLink
											key={link.id}
											href={link.href}
											className="sublink"
										>
											{link.label}
										</NextLink>
									))}
								</>
							) : (
								<Link href={href} onClick={toggleMenu}>
									{label}
								</Link>
							)}
						</NavListItem>
					))}
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
