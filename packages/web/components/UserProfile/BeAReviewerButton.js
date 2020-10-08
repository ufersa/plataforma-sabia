import React from 'react';
import styled, { css } from 'styled-components';
import { useAuth, useModal } from '../../hooks';

/**
 * Checks if a given object has falsy properties values
 *
 * @param {object} obj The object
 *
 * @returns {boolean} True if object has falsy props, false otherwise
 */
const hasNullProps = (obj) => Object.values(obj).some((item) => !item);

const BeAReviewerButton = () => {
	const { user } = useAuth();
	const { openModal } = useModal();
	const userHasFalsy = hasNullProps(user);

	const handleClick = () => {
		if (userHasFalsy) return openModal('pendingUserData');

		return false;
	};

	return <Button onClick={handleClick}>Seja um curador</Button>;
};

const Button = styled.button`
	${({ theme: { colors } }) => css`
		background: ${colors.secondary};
		border: none;
		outline: none;
		width: 100%;
		padding: 1.6rem 3.2rem;
		margin-top: 1.2rem;
		margin-bottom: 2rem;

		color: ${colors.white};
		text-transform: uppercase;
		line-height: 2.4rem;
		font-weight: bold;

		:hover,
		:focus {
			background: ${colors.darkGreen};
		}
	`}
`;

export default BeAReviewerButton;
