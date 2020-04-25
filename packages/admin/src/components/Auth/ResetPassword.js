import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
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
			alert('As senhas não conferem');
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<div>{msg}</div>
			<Form
				fields={['password', 'password2']}
				submit={submit}
				buttonLabel="Salvar nova senha"
			/>
			<Link to="/login">Voltar para a página de login</Link>
		</Container>
	);
};

export default ResetPassword;
