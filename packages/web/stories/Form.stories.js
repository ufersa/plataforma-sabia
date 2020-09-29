import React from 'react';
import { Form, InputField, SwitchField, Actions } from '../components/Form';

import { Link } from '../components/Link';
import { Button } from '../components/Button';
import SelectField from '../components/Form/SelectField';
import TextField from '../components/Form/TextField';

export default {
	title: 'Form Components',
	component: Form,
	argTypes: {
		onSubmit: {
			action: 'submit',
		},
	},
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
		<Form>
			<SelectField
				label="Choose an option"
				name="select-field"
				validation={{ required: true }}
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

			<SelectField
				label="Choose Multiple option"
				name="select-multi-field"
				options={[
					{
						label: 'Option 1',
						value: 'option-1',
					},
					{
						label: 'Option 2',
						value: 'option-2',
					},
					{
						label: 'Option 3',
						value: 'option-3',
					},
				]}
				isMulti
				validation={{ required: true }}
			/>
			<SelectField
				label="Creatable Multiple option"
				name="select-multi-creatable-field"
				options={[
					{
						label: 'Option 1',
						value: 'option-1',
					},
					{
						label: 'Option 2',
						value: 'option-2',
					},
					{
						label: 'Option 3',
						value: 'option-3',
					},
				]}
				validation={{ required: true }}
				isMulti
				creatable
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
			<InputField
				name="login"
				label="Login"
				placeholder="Enter you Login"
				validation={{ required: true }}
			/>
			<InputField
				name="password"
				label="Password"
				placeholder="Enter you password"
				type="password"
				validation={{ required: 'Mensagem de erro customizada' }}
			/>
			<Actions>
				<Link href="#">Esqueci a senha</Link>
				<Button type="submit">Enviar</Button>
			</Actions>
		</Form>
	);
};
