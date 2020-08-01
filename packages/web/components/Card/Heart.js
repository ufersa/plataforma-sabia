/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTheme, useAuth } from '../../hooks';
import { LikesContainer } from './styles';

const Card = ({ technology, likes, isLiked }) => {
	// const { t } = useTranslation(['card', 'helper']);
	const { colors } = useTheme();
	// const { user } = useAuth();

	// const userIsLoggedIn = !!user?.id;

	useEffect(() => {
		// TODO
		// if (userIsLoggedIn) {
		// 	const bookmarks = getBookmarks(user.id, technology).then((bookmarks) => {
		// 		//
		// 	});
		// }

		// TODO
		// return openModal('login', {
		// 	message: t('common:signInToContinue'),
		// });

		return () => {};
	}, []);

	return (
		<LikesContainer>
			{isLiked ? (
				<AiFillHeart color={colors.red} />
			) : (
				<AiOutlineHeart color={colors.secondary} />
			)}
			<span>{likes}</span>
		</LikesContainer>
	);
};

Card.propTypes = {
	technology: PropTypes.number.isRequired,
	likes: PropTypes.number,
	isLiked: PropTypes.bool.isRequired,
};

Card.defaultProps = {
	likes: null,
};

export default Card;
