import React from 'react';
import { Container } from '@material-ui/core';
import { useNotify, Notification } from 'react-admin';
import { Link } from 'react-router-dom';
import Form from './AuthForm';

const ForgotPassword = () => {
	const notify = useNotify();

	const handleSubmit = async ({ email }) => {
		try {
			await fetch(
				`${process.env.REACT_APP_API_URL}/auth/forgot-password?email=${email}&scope=admin`,
			);
			notify(
				'Se você possui uma conta em nosso sistema, você receberá um link por email para alterá-la',
			);
		} catch {
			notify('Algo deu errado, tente novamente.', 'warning');
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Notification />
			<Form fields={['email']} onSubmit={handleSubmit} buttonLabel="Recuperar Senha" />
			<Link to="/">Voltar para a página de login</Link>
		</Container>
	);
};

export default ForgotPassword;
