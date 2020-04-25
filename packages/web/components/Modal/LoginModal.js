import React, { useState } from 'react';

const LoginModal = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState({ error: false, message: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			setMessage({
				error: true,
				message: 'Entre com seu email e senha.',
			});
		}
	};

	return (
		<div className="login-form">
			{message}
			<form onSubmit={handleSubmit}>
				<label htmlFor="login-email">
					E-mail:
					<input
						id="login-email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label htmlFor="login-password">
					Senha:
					<input
						id="login-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Entrar" />
			</form>
		</div>
	);
};

export default LoginModal;
