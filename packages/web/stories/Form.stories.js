import React, { useState } from 'react';
import { Form, InputField, Actions } from '../components/Form';

import Link from '../components/Link';
import Button from '../components/Button';

export default {
	title: 'Form Components',
};

export const BasicForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return (
		<Form>
			<InputField name="login" label="Login" value={login} onChange={setLogin} />
			<InputField
				name="password"
				label="Password"
				type="password"
				value={password}
				onChange={setPassword}
			/>
			<Actions>
				<Link href="#">Esqueci a senha</Link>
				<Button type="submit">Enviar</Button>
			</Actions>
		</Form>
	);
};
