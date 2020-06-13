import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, useModal } from '../../hooks';
import NotAuthorized from './NotAuthorized';

const Protected = ({ children, redirectTo, role }) => {
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { user } = useAuth();
	const router = useRouter();

	const isLoggedIn = !!user?.email;
	const isAuthorized = isLoggedIn && (role ? role === user.role : true);

	useEffect(() => {
		if (!isLoggedIn) {
			return openModal('login', {
				message: t('common:signInToContinue'),
			});
		}

		if (!isAuthorized && redirectTo) {
			router.push(redirectTo);
		}

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn, openModal, router, redirectTo, isAuthorized]);

	return isAuthorized ? <>{children}</> : <NotAuthorized />;
};

Protected.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	redirectTo: PropTypes.string,
	role: PropTypes.string,
};

Protected.defaultProps = {
	redirectTo: '',
	role: '',
};

export default Protected;
