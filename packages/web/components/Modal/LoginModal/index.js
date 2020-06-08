import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Form, Actions, InputField, CheckBoxField } from '../../Form';
import { Link } from '../../Link';
import { Button } from '../../Button';
import { StyledLoginModal, StyledLabel, RegisterContainer } from './styles';
import { useModal, useAuth } from '../../../hooks';

const LoginModal = ({ message: incomingMessage, redirectTo }) => {
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
		} else {
			if (redirectTo) {
				router.push(redirectTo);
			}
			closeModal();
		}
	};

	return (
		<StyledLoginModal>
			<RegisterContainer>
				<StyledLabel>{t('common:areYouNewHere?')}</StyledLabel>
				<Button onClick={() => openModal('register', { closerColor: 'white' })}>
					{t('common:registerYourUser')}
				</Button>
			</RegisterContainer>
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
					placeholder="Password"
					type="password"
					validation={{ required: true }}
				/>
				<CheckBoxField name="remember" label={t('common:rememberpassword')} />
				<p>{message}</p>
				<Actions>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:loggingin') : t('common:login')}
					</Button>
					<Link hover href="#">
						{t('common:forgotPassword')}
					</Link>
				</Actions>
			</Form>
		</StyledLoginModal>
	);
};

LoginModal.propTypes = {
	message: PropTypes.string,
	redirectTo: PropTypes.string,
};

LoginModal.defaultProps = {
	message: '',
	redirectTo: '',
};

export default LoginModal;
