import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Form from './AuthForm';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [msg, setMsg] = useState('');
	const [send, setSend] = useState(false);

	const sendEmail = async () => {
		const request = new Request(
			`${process.env.REACT_APP_API_URL}/auth/forgot-password?email=${email}&scope=admin`,
		);
		setSend(true);
		setMsg('Aguarde um momento...');
		return fetch(request)
			.then((response) => {
				setMsg(
					'Enviamos um link de recuperação de senha para o seu Email \n Verifique sua caixa de spam.',
				);
				if (response.status < 200 || response.status >= 400) {
					setMsg('Não encontramos seu Email em nosso banco de dados.');
				}
			})
			.catch(() => setMsg('Algo deu errado, tente novamente.'));
	};

	const submit = (e) => {
		e.preventDefault();
		sendEmail(email);
	};
	return (
		<Container component="main" maxWidth="xs">
			{!send ? (
				<Form mySubmit={submit} setEmail={setEmail} textButSubmit="Recuperar Senha" />
			) : (
				<div>{msg}</div>
			)}
			<Link to="/">Voltar para a página de login</Link>
		</Container>
	);
};

export default ForgotPassword;
