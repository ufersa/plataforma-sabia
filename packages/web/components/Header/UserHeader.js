import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { LoginBox } from './styles';
import { useModal } from '../Modal';

const User = () => {
	const { colors } = useTheme();
	const { openModal } = useModal();

	const handleClick = (e) => {
		e.preventDefault();
		openModal('login');
	};

	return (
		<LoginBox>
			<button type="button" onClick={handleClick}>
				<MdAccountCircle color={colors.orange} />
				<span>Entrar</span>
			</button>
		</LoginBox>
	);
};

export default User;
