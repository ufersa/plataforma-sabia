import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';
import LogoutButton from './LogoutButton';
import PageLink from './PageLink';
import getPages from './pages';

const UserProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['profile']);

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
						<PageLink key={page.title} href={page.href}>
							<page.icon />
							{page.title}
						</PageLink>
					))}
				</Fragment>
			))}
			<LogoutButton />
		</Container>
	);
};

const Container = styled.section`
	padding-top: 3rem;
	min-width: 30rem;

	> a,
	button {
		padding-left: 2rem;
	}
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
