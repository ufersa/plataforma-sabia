import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Link } from '../Link';

import { Container, Menu, Bar, Nav, NavList, NavListItem } from './styles';

const HamburguerMenu = ({ links, secondary }) => {
	const [open, setOpen] = useState(false);
	const toggleMenu = () => setOpen((prev) => !prev);

	const { pathname } = useRouter();

	return (
		<Container>
			<Menu onClick={toggleMenu} open={open}>
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
				<Bar secondary={secondary} />
			</Menu>
			<Nav open={open}>
				<NavList>
					{links.map(({ id, label, href }) => (
						<NavListItem key={id} selected={pathname === href}>
							<Link href={href} onClick={toggleMenu}>
								{label}
							</Link>
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
};

HamburguerMenu.defaultProps = {
	secondary: false,
};

export default HamburguerMenu;
