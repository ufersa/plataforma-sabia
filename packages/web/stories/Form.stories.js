import React from 'react';
import { action } from '@storybook/addon-actions';
import { Form, InputField, SwitchField, Actions } from '../components/Form';

import { Link } from '../components/Link';
import { Button } from '../components/Button';
import SelectField from '../components/Form/SelectField';
import TextField from '../components/Form/TextField';

export default {
	title: 'Form Components',
};

export const SingleInput = () => {
	return (
		<Form>
			<InputField name="value" label="Label" />
		</Form>
	);
};

export const TextInput = () => {
	return (
		<Form>
			<TextField name="value" label="Label" />
		</Form>
	);
};

export const SwitchInput = () => {
	return (
		<Form>
			<SwitchField label="Test" name="switch-field" />
		</Form>
	);
};

export const SelectInput = () => {
	return (
		<Form onSubmit={action('SelectSubmit')}>
			<SelectField
				label="Choose an option"
				name="select-field"
				options={[
					{
						label: 'Option 1',
						value: 'option-1',
					},
					{
						label: 'Option 2',
						value: 'option-2',
					},
				]}
			/>
			<Button type="submit">Enviar</Button>
		</Form>
	);
};

export const WithSubmitButton = () => {
	return (
		<Form>
			<InputField name="value" label="Label" />
			<Actions>
				<Button type="submit">Enviar</Button>
			</Actions>
		</Form>
	);
};

export const LoginForm = () => {
	return (
		<Form>
			<InputField name="login" label="Login" />
			<InputField name="password" label="Password" type="password" />
			<Actions>
				<Link href="#">Esqueci a senha</Link>
				<Button type="submit">Enviar</Button>
			</Actions>
		</Form>
	);
};
