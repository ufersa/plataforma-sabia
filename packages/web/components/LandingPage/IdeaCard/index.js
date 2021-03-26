import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { limitTextChar } from '../../../utils/helper';

import * as S from './styles';

const MAX_DESC_LENGTH = 142;

const IdeaCard = ({ hit: { id, title, description, keywords } }) => {
	const [toggleShowMore, setToggleShowMore] = useState(false);

	const handleToggleShowMore = () => {
		setToggleShowMore((previousState) => !previousState);
	};

	return (
		<S.Container key={id}>
			<S.Title>{title}</S.Title>
			<S.Description>
				{toggleShowMore ? description : limitTextChar(description, MAX_DESC_LENGTH)}
			</S.Description>
			<S.PillWrapper>
				{keywords?.map((keyword) => (
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

IdeaCard.propTypes = {
	hit: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		description: PropTypes.string,
		keywords: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				term: PropTypes.string,
			}),
		),
	}).isRequired,
};

export default IdeaCard;
