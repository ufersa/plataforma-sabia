import React from 'react';
import PropTypes from 'prop-types';
import { FaRegListAlt, FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';

import { Container, UserMsg, SectionTitle, SectionLink, LogoutButton } from './styles';

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
			<SectionItem href="">
				<FaRegUserCircle />
				{t('myProfile')}
			</SectionItem>
			<SectionTitle>{t('researcherArea')}</SectionTitle>
			<SectionItem href="/technologies">
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

const SectionItem = ({ href, children }) => (
	<Link href={`/user/my-account${href}`}>
		<SectionLink>{children}</SectionLink>
	</Link>
);

SectionItem.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default UserProfile;
