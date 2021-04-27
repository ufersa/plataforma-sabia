import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuth, useModal } from '../../../hooks';
import { handleBookmark } from '../../../services';
import { Container } from './styles';

const Likes = ({ id, count, colorVariant, type }) => {
	const [filled, setFilled] = useState(null);
	const [currentLikes, setCurrentLikes] = useState(count);
	const [animation, setAnimation] = useState(null);

	const { t } = useTranslation(['common']);
	const { user, setUser } = useAuth();
	const { openModal } = useModal();

	const userIsLoggedIn = !!user?.id;
	const animationTimeInMilliseconds = 1500;
	const solutionTypeProperty = `${type}Bookmarks`;

	useEffect(() => {
		const solutionBookmarks = user[solutionTypeProperty];

		const isLiked = solutionBookmarks?.some((bookmark) => bookmark.id === id);
		setFilled(!!isLiked);
	}, [id, user, type, solutionTypeProperty]);

	/*
	 * If we're deleting a bookmark, we should update user and remove it from bookmarks object
	 * Otherwise, we should add the current id to user bookmarks
	 */
	const updateUser = (bookmarkWillBeDeleted) => {
		if (bookmarkWillBeDeleted) {
			return setUser({
				[solutionTypeProperty]: user[solutionTypeProperty]?.filter(
					(item) => item.id !== id,
				),
			});
		}

		return setUser({
			[solutionTypeProperty]: [
				...user[solutionTypeProperty],
				{
					id,
					objectId: `${type}-${id}`,
					pivot: {
						[`${type}_id`]: id,
						user_id: user.id,
					},
				},
			],
		});
	};

	async function handleLike(e) {
		e.preventDefault();

		if (!userIsLoggedIn) {
			return openModal('login', {
				message: t('common:signInToBookmarkSolution'),
			});
		}

		if (animation) {
			return null;
		}

		setAnimation(filled ? 'dislike' : 'like');

		setTimeout(() => {
			setCurrentLikes(filled ? currentLikes - 1 : currentLikes + 1);
		}, animationTimeInMilliseconds / 2);

		setTimeout(() => {
			setAnimation(null);
		}, animationTimeInMilliseconds);

		const solutionType = `${type}Id`;

		handleBookmark({
			active: filled,
			[solutionType]: id,
			userId: user?.id,
		});

		updateUser(filled);

		return setFilled(!filled);
	}

	return (
		<Container
			onClick={handleLike}
			animation={animation}
			duration={animationTimeInMilliseconds / 1000}
			colorVariant={colorVariant}
			filled={filled}
		>
			{filled ? <AiFillHeart /> : <AiOutlineHeart />}
			<span>{currentLikes}</span>
		</Container>
	);
};

Likes.propTypes = {
	id: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	colorVariant: PropTypes.string,
	type: PropTypes.oneOf(['technology', 'service']).isRequired,
};

Likes.defaultProps = {
	colorVariant: 'default',
};

export default Likes;
