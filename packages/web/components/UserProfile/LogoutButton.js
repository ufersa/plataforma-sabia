import React from 'react';
import styled from 'styled-components';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';

const LogoutButton = () => {
	const { t } = useTranslation(['profile']);
	const { logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await router.push('/');
		logout();
	};

	return (
		<StyledButton onClick={handleLogout}>
			<AiOutlineLogout />
			{t('logout')}
		</StyledButton>
	);
};

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	flex-direction: row;
	font-size: 1.6rem;
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.secondary};

	:hover {
		color: ${({ theme }) => theme.colors.darkGreen};
	}

	svg {
		fill: ${({ theme }) => theme.colors.secondary};
		stroke: ${({ theme }) => theme.colors.secondary};
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
	}
`;

export default LogoutButton;
