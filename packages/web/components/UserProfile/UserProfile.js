import React, { Fragment } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';
import LogoutButton from './LogoutButton';
import BeAReviewerButton from './BeAReviewerButton';
import PageLink from './PageLink';
import getPages from './pages';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';
import themeFile from '../../styles/theme';
import { getUserUnansweredQuestions, getUserNewMessages } from '../../services/user';

const UserProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['profile']);
	const router = useRouter();
	const { colors } = themeFile;
	const userFirstName = user.full_name && user.full_name.split(' ')[0];
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

	const isCurrentPage = (page) => router?.pathname === `/user/my-account${page.href}`;

	return (
		<Container>
			<UserMsg>
				<SafeHtml
					html={t('profile:welcomeUser', { user: userFirstName || t('profile:user') })}
				/>
			</UserMsg>
			{getPages(t, user, {
				questions: userUnansweredQuestions?.total_unanswered,
				messages: userNewMessages?.total_new_messages,
			}).map(({ id, title, pages }) => (
				<Fragment key={id}>
					<SectionTitle>{title}</SectionTitle>
					{pages.map((page) => (
						<PageLink
							active={isCurrentPage(page)}
							key={page.title}
							href={page.href}
							notification={page?.notification}
						>
							<page.icon
								stroke={isCurrentPage(page) ? colors.secondary : colors.lightGray2}
								strokeWidth={isCurrentPage(page) ? 2.5 : 1.5}
							/>
							{page.title}
						</PageLink>
					))}
				</Fragment>
			))}
			{user.role?.role !== rolesEnum.REVIEWER && <BeAReviewerButton />}
			<LogoutButton />
		</Container>
	);
};

const Container = styled.section`
	min-width: 30rem;
`;

const UserMsg = styled.div`
	display: block;
	padding-left: 2rem;
	font-size: 1.6rem;
	color: ${({ theme }) => theme.colors.secondary};

	span {
		font-weight: bold;
	}
`;

const SectionTitle = styled.h3`
	font-family: 'Montserrat';
	font-size: 1.4rem;
	margin: 2rem 0;
	padding: 0.5rem 0;
	text-align: center;
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.lightGray};
	background-color: ${({ theme }) => theme.colors.gray98};
`;

export default UserProfile;
