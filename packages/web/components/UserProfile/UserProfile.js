import React, { Fragment } from 'react';
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

const UserProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['profile']);
	const router = useRouter();

	const isCurrentPage = (page) => router?.pathname === `/user/my-account${page.href}`;

	return (
		<Container>
			<UserMsg>
				<SafeHtml
					html={t('profile:welcomeUser', { user: user?.first_name || t('profile:user') })}
				/>
			</UserMsg>
			{getPages(t, user).map(({ id, title, pages }) => (
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
