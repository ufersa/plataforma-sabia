import React, { Fragment } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';
import LogoutButton from './LogoutButton';
import BeAReviewerButton from './BeAReviewerButton';
import PageLink from './PageLink';
import getPages from './pages';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';
import { getUserUnansweredQuestions } from '../../services/user';

const UserProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['profile']);
	const router = useRouter();

	const {
		data: { data },
	} = useSWR(['get-user-unanswered-questions-count'], () => getUserUnansweredQuestions(), {
		initialData: [],
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	const isCurrentPage = (page) => router?.pathname === `/user/my-account${page.href}`;

	return (
		<Container>
			<UserMsg>
				<SafeHtml
					html={t('profile:welcomeUser', { user: user?.first_name || t('profile:user') })}
				/>
			</UserMsg>
			{getPages(t, user, data?.total_unanswered).map(({ id, title, pages }) => (
				<Fragment key={id}>
					<SectionTitle>{title}</SectionTitle>
					{pages.map((page) => (
						<PageLink
							active={page.href !== '' && isCurrentPage(page)}
							key={page.title}
							href={page.href}
							notification={page?.notification}
						>
							<page.icon />
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
	padding-top: 3rem;
	min-width: 30rem;
`;

const UserMsg = styled.div`
	display: block;
	padding-left: 2rem;
	font-size: 2rem;

	span {
		font-weight: bold;
	}
`;

const SectionTitle = styled.h3`
	margin: 2rem 0;
	padding: 0.5rem 0;
	text-align: center;
	text-transform: uppercase;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.colors.secondary};
	background-color: ${({ theme }) => theme.colors.gray98};
	border-radius: ${({ theme }) => theme.metrics.doubleRadius}rem;
`;

export default UserProfile;
