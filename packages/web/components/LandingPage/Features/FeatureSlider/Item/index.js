import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label, Description } from './styles';

const Item = ({ item, reversed }) => {
	return (
		<Wrapper reversed={reversed}>
			<Container image={item.image}>
				<Label>{item.label}</Label>
				{item.description && <Description>{item.description}</Description>}
			</Container>
		</Wrapper>
	);
};

Item.propTypes = {
	item: PropTypes.shape({
		label: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
	reversed: PropTypes.bool.isRequired,
};

export default Item;
