import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, useModal } from '../../hooks';
import NotAuthorized from './NotAuthorized';

const Protected = ({ children, redirectTo, role }) => {
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { user } = useAuth();
	const router = useRouter();

	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (!user?.email) {
			return openModal('login', {
				message: t('common:signInToContinue'),
			});
		}

		if (role && user.role !== role) {
			if (redirectTo) {
				return router.push(redirectTo);
			}
			setIsAuthorized(false);
		}

		return null;
	}, [user, openModal, role, children, t, redirectTo, router, isAuthorized]);

	return isAuthorized ? <>{children}</> : <NotAuthorized />;
};

Protected.defaultProps = {
	redirectTo: false,
	role: false,
};

Protected.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	redirectTo: PropTypes.string,
	role: PropTypes.string,
};

export default Protected;
