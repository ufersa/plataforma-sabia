import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useTheme, useAuth, useModal } from '../../hooks';
import { LikesContainer } from './styles';
import { handleBookmark } from '../../services';

const Likes = ({ technology, count, isLiked }) => {
	const [like, setLike] = useState(isLiked);
	const [likes, setLikes] = useState(count);

	const { t } = useTranslation(['common']);
	const { colors } = useTheme();
	const { user, token } = useAuth();
	const { openModal } = useModal();

	const userIsLoggedIn = !!user?.id;

	async function handleLike(event) {
		event.preventDefault();
		event.stopPropagation();

		if (!userIsLoggedIn) {
			return openModal('login', {
				message: t('common:signInToBookmarkTech'),
			});
		}

		setLike(!like);
		setLikes(like ? likes - 1 : likes + 1);

		return handleBookmark({
			active: like,
			technologyId: technology,
			userId: user?.id,
			userToken: token,
		});
	}

	return (
		<LikesContainer onClick={handleLike}>
			{like ? (
				<AiFillHeart color={colors.red} />
			) : (
				<AiOutlineHeart color={colors.secondary} />
			)}
			<span>{likes}</span>
		</LikesContainer>
	);
};

Likes.propTypes = {
	technology: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
};

export default Likes;
