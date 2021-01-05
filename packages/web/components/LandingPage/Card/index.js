import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { limitTextChar } from '../../../utils/helper';

import * as S from './styles';

const Card = ({ title, description, keywords }) => {
	const [toggleShowMore, setToggleShowMore] = useState(false);
	const MAX_DESC_LENGTH = 142;

	const handleToggleShowMore = () => {
		setToggleShowMore(!toggleShowMore);
	};

	return (
		<S.Container>
			<S.Title>{title}</S.Title>
			<S.Description>
				{toggleShowMore ? description : limitTextChar(description, MAX_DESC_LENGTH)}
			</S.Description>
			<S.PillWrapper>
				{keywords.map((keyword) => (
					<S.Pill key={keyword}>{keyword}</S.Pill>
				))}
			</S.PillWrapper>

			<S.Button
				onClick={handleToggleShowMore}
				disabled={description.length <= MAX_DESC_LENGTH}
			>
				Mostrar {toggleShowMore ? 'menos' : 'mais'}
			</S.Button>
		</S.Container>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
