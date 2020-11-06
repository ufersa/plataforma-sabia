import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Form, Actions, InputField, CheckBoxField } from '../../Form';
import { Button } from '../../Button';
import {
	StyledLoginModal,
	StyledLabel,
	RegisterContainer,
	StyledLink,
	ErrorMessage,
} from './styles';
import { useModal, useAuth } from '../../../hooks';

const LoginModal = ({ message: incomingMessage, redirectTo, onSuccessLogin }) => {
	const { closeModal, openModal } = useModal();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(incomingMessage);
	const { t } = useTranslation(['common']);
	const router = useRouter();

	const handleSubmit = async ({ email, password }) => {
		setLoading(true);
		const result = await login(email, password);
		setLoading(false);

		if (result.error) {
			if (result.error.error_code === 'UNVERIFIED_EMAIL') {
				openModal('emailConfirmation');
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
				<CheckBoxField name="remember" label={t('common:rememberpassword')} />
				<ErrorMessage>{message}</ErrorMessage>
				<Actions column>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:loggingin') : t('common:login')}
					</Button>
					<StyledLink
						onClick={() => openModal('forgotPassword', { closerColor: 'white' })}
					>
						{t('common:forgotPassword')}
					</StyledLink>
				</Actions>
			</Form>
			<RegisterContainer>
				<StyledLabel>{t('common:areYouNewHere?')}</StyledLabel>
				<Button onClick={() => openModal('register', undefined, { customModal: true })}>
					{t('common:registerYourUser')}
				</Button>
			</RegisterContainer>
		</StyledLoginModal>
	);
};

LoginModal.propTypes = {
	message: PropTypes.string,
	redirectTo: PropTypes.string,
	onSuccessLogin: PropTypes.func,
};

LoginModal.defaultProps = {
	message: '',
	redirectTo: '',
	onSuccessLogin: () => {},
};

export default LoginModal;
