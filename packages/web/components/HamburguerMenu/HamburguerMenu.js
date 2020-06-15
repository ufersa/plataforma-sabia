import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Link } from '../Link';

import { Container, Menu, Bar, Nav, NavList, NavListItem } from './styles';

const HamburguerMenu = ({ links }) => {
	const [open, setOpen] = useState(false);
	const toggleMenu = () => setOpen((prev) => !prev);

	const { pathname } = useRouter();

	return (
		<Container>
			<Menu onClick={toggleMenu} open={open}>
				<Bar />
				<Bar />
				<Bar />
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
};

export default HamburguerMenu;
