import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

import { Container, Menu, Bar, Nav } from './styles';

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
				<ul>
					{links.map(({ id, label, href }) => (
						<li key={id}>
							<Link href={href}>{label}</Link>
						</li>
					))}
				</ul>
			</Nav>
		</Container>
	);
};

HamburguerMenu.propTypes = {
	links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HamburguerMenu;
