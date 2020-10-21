import React from 'react';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import { useAuth, useModal } from '../../hooks';
import { getReviewerUser } from '../../services/user';

const BeAReviewerButton = () => {
	const { user } = useAuth();
	const { openModal } = useModal();

	const { data: { data: currentReviewer = {} } = {}, isValidating } = useSWR(
		'get-current-reviewer',
		() => getReviewerUser(),
		{
			revalidateOnFocus: false,
		},
	);

	/*
	 * 1. Opens modal with request sent message if reviewer status equals pending
	 * 2. Opens user data pending modal if user hasnt completed registration
	 * 3. Opens modal to choose categories if previous conditions hasnt match
	 */
	const handleClick = () => {
		if (currentReviewer.status === 'pending') {
			return openModal('requestToBeReviewerSent');
		}

		if (!user.registration_completed) return openModal('pendingUserData');

		return openModal('beAReviewer');
	};

	return (
		<Button onClick={handleClick} disabled={isValidating}>
			Seja um curador
		</Button>
	);
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

		:hover:not(:disabled),
		:focus:not(:disabled) {
			background: ${colors.darkGreen};
		}

		:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	`}
`;

export default BeAReviewerButton;
