import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';

const LogoutButton = ({ cb }) => {
	const { t } = useTranslation(['profile']);
	const { logout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await router.push('/');
		logout();
		if (typeof cb === 'function') cb();
	};

	return (
		<StyledButton onClick={handleLogout}>
			<AiOutlineLogout />
			{t('logout')}
		</StyledButton>
	);
};

LogoutButton.propTypes = {
	cb: PropTypes.func,
};

LogoutButton.defaultProps = {
	cb: () => {},
};

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	flex-direction: row;
	font-size: 1.6rem;
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.red};
	padding-left: 2rem;

	:hover {
		color: ${({ theme }) => theme.colors.darkRed};
	}

	svg {
		fill: ${({ theme }) => theme.colors.red};
		stroke: ${({ theme }) => theme.colors.red};
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
	}
`;

export default LogoutButton;
