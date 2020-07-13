import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { LoginBox } from './styles';
import { useModal, useAuth } from '../../hooks';

const User = () => {
	const { colors } = useTheme();
	const { openModal } = useModal();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		if (!user.email) {
			openModal('login');
		} else {
			router.push('/user/my-account');
		}
	};

	return (
		<LoginBox>
			<button type="button" onClick={handleClick}>
				<MdAccountCircle color={colors.secondary} />
				{/* eslint-disable-next-line camelcase */}
				<span>{user?.first_name || t('common:login')}</span>
			</button>
		</LoginBox>
	);
};

export default User;
