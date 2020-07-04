import React from 'react';
import { FaRegListAlt, FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';

import { Container, UserMsg, SectionTitle, SectionItem, LogoutButton } from './styles';

const UserProfile = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
	const { t } = useTranslation(['profile']);

	const handleLogout = async () => {
		await router.push('/');
		logout();
	};

	return (
		<Container>
			<UserMsg>
				<SafeHtml html={t('welcomeUser', { user: user?.first_name || t('user') })} />
			</UserMsg>
			<SectionTitle>{t('userArea')}</SectionTitle>
			<SectionItem as="a" href="/user/my-account">
				<FaRegUserCircle />
				{t('myProfile')}
			</SectionItem>
			<SectionTitle>{t('researcherArea')}</SectionTitle>
			<SectionItem as="a" href="/user/my-account/technologies">
				<FaRegListAlt />
				{t('myTechnologies')}
			</SectionItem>
			<LogoutButton onClick={handleLogout}>
				<AiOutlineLogout />
				{t('logout')}
			</LogoutButton>
		</Container>
	);
};

export default UserProfile;
