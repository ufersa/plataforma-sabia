import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Form from './AuthForm';

const ResetPassword = ({ location }) => {
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [msg, setMsg] = useState('');
	const [send, setSend] = useState(false);
	const sendReset = async () => {
		const token = new URLSearchParams(location.search).get('token').replace(' ', '+');
		const request = new Request(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
			method: 'POST',
			body: JSON.stringify({ token, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		setSend(true);
		setMsg('Aguarde um momento...');
		return fetch(request)
			.then((response) => {
				setMsg('Sua senha foi alterada com sucesso');
				if (response.status < 200 || response.status >= 400) {
					setMsg('O link usado expirou ou é inválido');
				}
			})
			.catch(() => setMsg('Algo deu errado, tente novamente.'));
	};

	const submit = (e) => {
		e.preventDefault();
		if (password === password2 && password.length > 8) {
			sendReset(password);
		} else {
			alert('As senhas não conferem');
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			{!send ? (
				<Form
					mySubmit={submit}
					setPassword={setPassword}
					setPassword2={setPassword2}
					textButSubmit="Salva nova senha"
				/>
			) : (
				<div>{msg}</div>
			)}
			<Link to="/">Voltar para a página de login</Link>
		</Container>
	);
};
ResetPassword.propTypes = {
	location: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ResetPassword;
