import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LoginBox } from './styles';
import { useModal, useAuth } from '../../hooks';

const User = () => {
	const { colors } = useTheme();
	const { openModal } = useModal();
	const { user, logout } = useAuth();
	const { t } = useTranslation(['common']);

	const handleClick = (e) => {
		e.preventDefault();
		if (!user.email) {
			openModal('login');
		} else {
			logout();
		}
	};

	return (
		<LoginBox>
			<button type="button" onClick={handleClick}>
				<MdAccountCircle color={colors.orange} />
				{/* eslint-disable-next-line camelcase */}
				<span>{user?.first_name || t('common:login')}</span>
			</button>
		</LoginBox>
	);
};

export default User;
