import React from 'react';
import useSWR from 'swr';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import LogoutButton from './LogoutButton';
import PageLink from './PageLink';
import getPages from './pages';
import { useAuth } from '../../hooks';
import theme from '../../styles/theme';
import { getUserUnansweredQuestions, getUserNewMessages } from '../../services/user';

const UserProfileDropDown = ({ visible, toggleVisible }) => {
	const { t } = useTranslation(['profile']);
	const { user } = useAuth();
	const { colors } = theme;

	const { data: { data: userUnansweredQuestions } = {} } = useSWR(
		['get-user-unanswered-questions-count'],
		() => getUserUnansweredQuestions(),
		{ revalidateOnFocus: false },
	);

	const { data: userNewMessages } = useSWR(
		['get-user-new-messages-count'],
		() => getUserNewMessages(),
		{ revalidateOnFocus: false },
	);

	return (
		visible && (
			<DropDownContainer>
				<DropDownMenu>
					{getPages(t, user, {
						questions: userUnansweredQuestions?.total_unanswered,
						messages: userNewMessages?.total_new_messages,
					}).map(({ pages }) =>
						pages.map((page) => (
							<li key={page.title}>
								<PageLink
									href={page.href}
									onClick={toggleVisible}
									notification={page?.notification}
								>
									<page.icon
										color={colors.secondary}
										stroke={colors.secondary}
										strokeWidth={1.5}
									/>
									{page.title}
								</PageLink>
							</li>
						)),
					)}
					<li>
						<LogoutButton cb={toggleVisible} />
					</li>
				</DropDownMenu>
			</DropDownContainer>
		)
	);
};

UserProfileDropDown.propTypes = {
	visible: PropTypes.bool.isRequired,
	toggleVisible: PropTypes.func.isRequired,
};

const DropDownContainer = styled.div`
	position: relative;
`;

const DropDownMenu = styled.ul`
	${({ theme: { colors, metrics } }) => css`
		position: absolute;
		min-width: 24rem;
		left: calc(50% - 11rem);
		top: calc(100% + 2.1rem);
		background: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		padding: 2rem 1.6rem;
		box-shadow: 0 0 2rem -1.5rem ${colors.secondary};
		transition: 0.3s;

		li {
			a,
			button {
				padding: 0rem;
				font-size: 1.6rem;
				font-weight: 400;
			}
		}

		:hover {
			box-shadow: 0 0 2.2rem -1.5rem ${colors.secondary};
		}

		&::before {
			content: '';
			position: absolute;
			left: calc(50% - 2rem);
			top: -2rem;
			width: 0;
			height: 0;
			border-left: 2rem solid transparent;
			border-right: 2rem solid transparent;
			border-bottom: 2rem solid ${colors.white};
		}

		li:last-child {
			padding-top: 1rem;
			border-top: 0.1rem solid ${colors.border};
		}
	`}
`;

export default UserProfileDropDown;
