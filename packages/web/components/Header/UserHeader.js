import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { LoginBox } from './styles';
import { useModal, useAuth } from '../../hooks';

const User = () => {
	const { colors } = useTheme();
	const { openModal } = useModal();
	const { user, logout } = useAuth();

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
				<span>{user?.username || 'Entrar'}</span>
			</button>
		</LoginBox>
	);
};

export default User;
