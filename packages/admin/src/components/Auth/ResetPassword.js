import React, { useState } from 'react';
import { Container, Link } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Form from './AuthForm';

const ResetPassword = () => {
	const [msg, setMsg] = useState('');
	const location = useLocation();

	const sendReset = async (password) => {
		try {
			const token = new URLSearchParams(location.search).get('token').replace(' ', '+');
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
				method: 'POST',
				body: JSON.stringify({ token, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.status === 200) {
				setMsg('Senha alterada com sucesso!');
			} else {
				setMsg('Algo deu errado');
			}
		} catch (e) {
			setMsg('Algo deu errado, tente novamente.');
		}
	};

	const submit = ({ password, password2 }) => {
		if (password === password2) {
			sendReset(password);
		} else {
			setMsg('As senhas não conferem');
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<p>{msg}</p>
			<Form
				fields={['password', 'password2']}
				onSubmit={submit}
				buttonLabel="Salvar nova senha"
			/>
			<Link href="/">Voltar para a página de login</Link>
		</Container>
	);
};

export default ResetPassword;
