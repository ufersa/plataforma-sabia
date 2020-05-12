import React from 'react';
import { useNotify, Notification } from 'react-admin';
import { Container } from '@material-ui/core';
import { useLocation, useHistory, Link } from 'react-router-dom';
import Form from './AuthForm';

const ResetPassword = () => {
	const notify = useNotify();
	const location = useLocation();
	const history = useHistory();

	const handleSubmit = async ({ password, password2, recaptchaToken }) => {
		if (password !== password2) {
			return notify('As senhas não conferem', 'warning');
		}

		try {
			const token = new URLSearchParams(location.search).get('token').replace(' ', '+');
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
				method: 'POST',
				body: JSON.stringify({ token, password }),
				headers: {
					'Content-Type': 'application/json',
					recaptchaToken,
				},
			});

			if (response.status === 200) {
				notify('Senha alterada com sucesso!');
				return history.push('/');
			}
			return notify('Link inválido', 'warning');
		} catch (e) {
			return notify('Algo deu errado, tente novamente.', 'warning');
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Notification />
			<Form
				fields={['password', 'password2']}
				onSubmit={handleSubmit}
				buttonLabel="Salvar nova senha"
			/>
			<Link to="/">Voltar para a página de login</Link>
		</Container>
	);
};

export default ResetPassword;
