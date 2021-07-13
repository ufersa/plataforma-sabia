/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuth, useModal } from '../../hooks';
import NotAuthorized from './NotAuthorized';
import InlineLogin from './InlineLogin';

const Protected = ({
	children,
	redirectTo,
	userRole,
	inline,
	onlyUnauthorizedMessage,
	messageSize,
	customIsAuthorized,
	messageContext,
}) => {
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { user, isAuthenticated } = useAuth();
	const router = useRouter();

	const isAuthorized =
		isAuthenticated && customIsAuthorized && (userRole ? userRole === user.role?.role : true);

	useEffect(() => {
		if (onlyUnauthorizedMessage) {
			return;
		}

		if (!isAuthenticated && !inline) {
			return openModal('login', {
				message: t('common:signInToContinue'),
			});
		}

		if (!isAuthorized && redirectTo) {
			router.push(redirectTo);
		}

		return () => {};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isAuthenticated,
		openModal,
		router,
		redirectTo,
		isAuthorized,
		onlyUnauthorizedMessage,
		inline,
	]);

	const NotAuthorizedComponent = inline ? (
		<InlineLogin />
	) : (
		<NotAuthorized size={messageSize} messageContext={messageContext} />
	);

	return isAuthorized ? <>{children}</> : NotAuthorizedComponent;
};

Protected.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	redirectTo: PropTypes.string,
	userRole: PropTypes.string,
	inline: PropTypes.bool,
	onlyUnauthorizedMessage: PropTypes.bool,
	messageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	customIsAuthorized: PropTypes.bool,
	messageContext: PropTypes.string,
};

Protected.defaultProps = {
	redirectTo: '',
	userRole: '',
	inline: false,
	onlyUnauthorizedMessage: false,
	messageSize: null,
	customIsAuthorized: true,
	messageContext: '',
};

export default Protected;
