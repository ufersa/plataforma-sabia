import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';

import { Form, Actions, InputField } from '../../Form';
import { Button } from '../../Button';
import {
	StyledLoginModal,
	StyledLabel,
	RegisterContainer,
	StyledLink,
	ErrorMessage,
	SuccessMessage,
} from './styles';
import { internal as internalPages } from '../../../utils/enums/pages.enum';
import { useModal, useAuth } from '../../../hooks';

const LoginModal = ({ message: incomingMessage, error: hasError, redirectTo, onSuccessLogin }) => {
	const { closeModal, openModal } = useModal();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(incomingMessage);
	const [error, setError] = useState(hasError);
	const { t } = useTranslation(['common']);
	const router = useRouter();

	const handleSubmit = async ({ email, password }) => {
		setLoading(true);
		const result = await login(email, password);
		setLoading(false);
		setError(false);
		if (result.error) {
			setError(true);
			if (result.error.error_code === 'UNVERIFIED_EMAIL') {
				router.push(internalPages.confirm_account);
				closeModal();
			} else {
				setMessage(t('common:loginFailed'));
			}
		} else if (result) {
			if (redirectTo) {
				router.push(redirectTo);
			}

			closeModal();

			onSuccessLogin();
		}
	};

	return (
		<StyledLoginModal>
			<Form onSubmit={handleSubmit}>
				<StyledLabel>{t('common:alreadyRegistered?')}</StyledLabel>
				<InputField
					name="email"
					placeholder="E-mail"
					type="email"
					validation={{ required: true }}
				/>
				<InputField
					name="password"
					placeholder="Senha"
					type="password"
					validation={{ required: true }}
				/>
				{error ? (
					<ErrorMessage>{message}</ErrorMessage>
				) : (
					<SuccessMessage>{message}</SuccessMessage>
				)}
				<Actions column>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:loggingin') : t('common:login')}
					</Button>
					<StyledLink
						onClick={() => openModal('forgotPassword', null, { customModal: true })}
					>
						{t('common:forgotPassword')}
					</StyledLink>
				</Actions>
			</Form>
			<RegisterContainer>
				<StyledLabel>{t('common:areYouNewHere?')}</StyledLabel>
				<Button
					onClick={() => {
						router.push(internalPages.register);
						closeModal();
					}}
				>
					{t('common:registerYourUser')}
				</Button>
				<Link href={internalPages.confirm_account} passHref>
					<StyledLink onClick={closeModal}>Confirmar conta</StyledLink>
				</Link>
			</RegisterContainer>
		</StyledLoginModal>
	);
};

LoginModal.propTypes = {
	message: PropTypes.string,
	error: PropTypes.bool,
	redirectTo: PropTypes.string,
	onSuccessLogin: PropTypes.func,
};

LoginModal.defaultProps = {
	message: '',
	error: false,
	redirectTo: '',
	onSuccessLogin: () => {},
};

export default LoginModal;
