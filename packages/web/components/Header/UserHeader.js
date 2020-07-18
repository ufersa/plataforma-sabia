import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LoginBox } from './styles';
import { useModal, useAuth } from '../../hooks';
import { UserProfileDropDown } from '../UserProfile';

const UserHeader = () => {
	const [dropDownVisible, setDropDownVisible] = useState(false);
	const { colors } = useTheme();
	const { openModal } = useModal();
	const { user } = useAuth();
	const { t } = useTranslation(['common']);

	const handleDropdownVisible = (e) => {
		e.preventDefault();
		if (!user.email) {
			openModal('login');
		} else {
			setDropDownVisible((prev) => !prev);
		}
	};

	return (
		<LoginBox>
			<button type="button" onClick={handleDropdownVisible}>
				<MdAccountCircle color={colors.secondary} />
				{/* eslint-disable-next-line camelcase */}
				<span>{user?.first_name || t('common:login')}</span>
			</button>
			<UserProfileDropDown visible={dropDownVisible} />
		</LoginBox>
	);
};

export default UserHeader;
