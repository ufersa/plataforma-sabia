import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Title, Image, Body, Description, Link } from './styles';

const Item = ({ title, image, description, link }) => {
	return (
		<Wrapper>
			<Title>{title}</Title>
			<Container>
				<Image src={image.src} alt={image.alt} />
				<Body>
					<Description>{description}</Description>
					<Link href={link.href}>{link.label}</Link>
				</Body>
			</Container>
		</Wrapper>
	);
};

Item.propTypes = {
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	image: PropTypes.shape({
		src: PropTypes.string,
		alt: PropTypes.string,
	}).isRequired,
	description: PropTypes.string.isRequired,
	link: PropTypes.shape({
		href: PropTypes.string,
		label: PropTypes.string,
	}).isRequired,
};

export default Item;
