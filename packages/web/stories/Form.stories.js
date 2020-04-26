import React, { useState } from 'react';
import { Form, InputField, SubmitButton, Actions } from '../components/Form';

import Link from '../components/Link';

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
				<SubmitButton label="Enviar" />
			</Actions>
		</Form>
	);
};
