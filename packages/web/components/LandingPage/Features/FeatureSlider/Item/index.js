import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const Item = ({ item, reversed }) => {
	return (
		<S.Wrapper reversed={reversed}>
			<S.Container image={item.image}>
				<S.Label>{item.label}</S.Label>
				{item.description && <S.Description>{item.description}</S.Description>}
			</S.Container>
		</S.Wrapper>
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
