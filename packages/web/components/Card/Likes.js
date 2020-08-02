/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTheme, useAuth, useModal } from '../../hooks';
import { LikesContainer } from './styles';

const Likes = ({ technology, count, isLiked }) => {
	const { t } = useTranslation(['card', 'helper']);
	const [like, setLike] = useState(isLiked);
	const { colors } = useTheme();
	const { user } = useAuth();
	const { openModal } = useModal();

	const userIsLoggedIn = !!user?.id;

	function handleLike(event) {
		event.preventDefault();
		event.stopPropagation();

		setLike(!like);

		if (!userIsLoggedIn) {
			return openModal('login', {
				message: t('common:signInToContinue'),
			});
		}

		if (like) {
			console.log('creating bookmark');
		} else {
			console.log('deleting bookmark');
		}

		return true;
	}

	return (
		<LikesContainer onClick={handleLike}>
			{like ? (
				<AiFillHeart color={colors.red} />
			) : (
				<AiOutlineHeart color={colors.secondary} />
			)}
			<span>{count}</span>
		</LikesContainer>
	);
};

Likes.propTypes = {
	technology: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
};

export default Likes;
