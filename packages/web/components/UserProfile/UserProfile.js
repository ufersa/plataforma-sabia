import React from 'react';
import { FaRegListAlt } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';

import { Container, UserMsg, SectionTitle, SectionItem, LogoutButton } from './styles';

const UserProfile = () => {
	const { user, logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await router.push('/');
		logout();
	};

	return (
		<Container>
			<UserMsg>
				Olá, <span>{user?.first_name || 'Usuário'}</span>
			</UserMsg>
			<SectionTitle>Área do Pesquisador</SectionTitle>
			<SectionItem as="a" href="/user/my-account">
				<FaRegListAlt />
				Minhas tecnologias
			</SectionItem>
			<LogoutButton onClick={handleLogout}>
				<AiOutlineLogout />
				Sair
			</LogoutButton>
		</Container>
	);
};

export default UserProfile;
