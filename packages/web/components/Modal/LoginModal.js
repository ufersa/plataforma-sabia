import React, { useState } from 'react';
import { Form, Actions, InputField } from '../Form';
import Link from '../Link';
import Button from '../Button';
import { StyledLoginModal } from './styles';

import { useModal, useAuth } from '../../hooks';

const LoginModal = () => {
	const { closeModal } = useModal();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

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
			<Form onSubmit={handleSubmit}>
				<InputField
					name="login"
					label="Login"
					type="email"
					required
					value={email}
					onChange={setEmail}
				/>
				<InputField
					name="password"
					label="Password"
					type="password"
					required
					value={password}
					onChange={setPassword}
				/>
				<p>{message}</p>
				<Actions>
					<Link hover href="#">
						Esqueci a senha
					</Link>
					<Button type="submit" disabled={loading}>
						{loading ? 'Entrando...' : 'Entrar'}{' '}
					</Button>
				</Actions>
			</Form>
		</StyledLoginModal>
	);
};

export default LoginModal;
