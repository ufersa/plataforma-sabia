import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Title, Image, Description, Link } from './styles';

const Item = ({ title, image, description, link }) => {
	return (
		<Wrapper>
			<Title>{title}</Title>
			<Container>
				<Image src={image.src} alt={image.alt} />
				<Description>{description}</Description>
				<Link href={link.href}>{link.label}</Link>
			</Container>
		</Wrapper>
	);
};

Item.propTypes = {
	title: PropTypes.string.isRequired,
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
