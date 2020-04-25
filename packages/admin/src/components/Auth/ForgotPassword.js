import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Form from './AuthForm';

const ForgotPassword = () => {
	const [msg, setMsg] = useState('');

	const sendEmail = async (email) => {
		try {
			await fetch(
				`${process.env.REACT_APP_API_URL}/auth/forgot-password?email=${email}&scope=admin`,
			);
			setMsg(
				'Se você possui uma conta em nosso sistema, você receberá um link por email para alterá-la',
			);
		} catch {
			setMsg('Algo deu errado, tente novamente.');
		}
	};

	const submit = ({ email }) => sendEmail(email);

	return (
		<Container component="main" maxWidth="xs">
			<div>{msg}</div>
			<Form fields={['email']} submit={submit} buttonLabel="Recuperar Senha" />
			<Link to="/login">Voltar para a página de login</Link>
		</Container>
	);
};

export default ForgotPassword;
