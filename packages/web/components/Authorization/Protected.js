import React, { useEffect, useCallback } from "react";
import Router from 'next/router'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import NotAuthorized from './NotAuthorized'
import { useModal, useAuth } from '../../hooks';

const Protected = ({ children, redirectTo, role }) => {
    const { t } = useTranslation(['common']);
    const { openModal } = useModal();
    const { user } = useAuth();

    useEffect(() => {
        if (!user.email) {
            return openModal('login', {
                message: t('common:signInToContinue'),
            });
        }

        if (role && user.role !== role) {
            if (!!redirectTo) {
                return Router.push(redirectTo)
            } else {
                return <NotAuthorized />
            };
        }

        return <>{children}</>;
    });

    return <></>
};

Protected.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    redirectTo: PropTypes.string,
    role: PropTypes.string,
};

export default Protected;
