import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Actions, InputField, CheckBoxField } from '../../Form';
import { Link } from '../../Link';
import { Button } from '../../Button';
import { StyledLoginModal, StyledLabel, RegisterContainer } from './styles';

import { useModal, useAuth } from '../../../hooks';

const LoginModal = () => {
	const { closeModal, openModal } = useModal();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(true);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { t } = useTranslation(['common']);

	const handleSubmit = async () => {
		setLoading(true);
		const result = await login(email, password);
		setLoading(false);

		if (result === false) {
			setMessage('Por favor verifique suas credenciais');
			setEmail('');
			setPassword('');
		} else {
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
					name="login"
					placeholder="E-mail"
					type="email"
					required
					value={email}
					onChange={setEmail}
				/>
				<InputField
					name="password"
					placeholder="Password"
					type="password"
					required
					value={password}
					onChange={setPassword}
				/>
				<CheckBoxField
					name="remember"
					label={t('common:rememberpassword')}
					value={remember}
					onChange={setRemember}
				/>
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

export default LoginModal;
