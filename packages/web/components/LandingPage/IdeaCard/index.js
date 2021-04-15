import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { limitTextChar, stringToLocaleDate } from '../../../utils/helper';
import * as S from './styles';

const MAX_DESC_LENGTH = 142;

const IdeaCard = ({ hit: { id, title, description, keywords, user, created_at } }) => {
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

			{toggleShowMore && (
				<S.IconsWrapper>
					<div>
						<FiCalendar fontSize={16} />
						<span>
							{stringToLocaleDate(created_at, {
								day: 'numeric',
								month: 'numeric',
								year: 'numeric',
							})}
						</span>
					</div>
					<div>
						<FiUser fontSize={16} />
						<span>{user.full_name}</span>
					</div>
				</S.IconsWrapper>
			)}

			<S.Button onClick={handleToggleShowMore}>
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
		keywords: PropTypes.arrayOf(PropTypes.string),
		user: PropTypes.shape({
			id: PropTypes.number,
			full_name: PropTypes.string,
		}),
		created_at: PropTypes.string,
	}).isRequired,
};

export default IdeaCard;
