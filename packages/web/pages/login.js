import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Auth from '../providers/authProvider';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await Auth.login({ email, password });
			router.push('/');
			return true;
		} catch (err) {
			return err;
		}
	};

	return (
		<form style={{ marginBottom: 50 }} onSubmit={handleLogin}>
			<h1>Form Login</h1>

			<input
				placeholder="Seu Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				placeholder="Sua Senha"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit">Entrar</button>
		</form>
	);
};

export default Login;
