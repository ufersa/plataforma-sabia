import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

import { Container, Menu, Bar, Nav, NavList, NavListItem } from './styles';

const HamburguerMenu = ({ links }) => {
	const [open, setOpen] = useState(false);

	const toggleMenu = () => setOpen((prev) => !prev);

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
						<NavListItem key={id}>
							<Link href={href}>{label}</Link>
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
