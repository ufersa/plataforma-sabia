import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import MaskedInputField from '../MaskedInputField';
import { Form } from '../Form';

const onSubmit = jest.fn();

test('MaskedInputField works as expected if required props are provided', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="cpf"
				mask="999.999.999-99"
				pattern={/^\d{3}\.\d{3}\.\d{3}-\d{2}$/}
			/>
		</Form>,
	);

	expect(container).toMatchSnapshot();
});

test('it shows the mask correctly when no default value is provided and the input is focused', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="cpf"
				placeholder="Your CPF"
				mask="999.999.999-99"
				pattern={/^\d{3}\.\d{3}\.\d{3}-\d{2}$/}
			/>
		</Form>,
	);

	const input = screen.getByPlaceholderText('Your CPF');
	input.focus();
	expect(input.value).toBe('___.___.___-__');

	expect(container).toMatchSnapshot();
});

test('it renders the value correctly if the default value is provided with a Mask', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="cpf"
				defaultValue="123.123.123.32"
				mask="999.999.999-99"
				pattern={/^\d{3}\.\d{3}\.\d{3}-\d{2}$/}
			/>
		</Form>,
	);

	expect(container.querySelector('input[name=cpf]')).toHaveValue('123.123.123-32');
	expect(container).toMatchSnapshot();
});

test('it renders the value correctly if the default value is provided without a Mask', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="cpf"
				defaultValue="12312312332"
				mask="999.999.999-99"
				pattern={/^\d{3}\.\d{3}\.\d{3}-\d{2}$/}
			/>
		</Form>,
	);

	expect(container.querySelector('input[name=cpf]')).toHaveValue('123.123.123-32');
	expect(container).toMatchSnapshot();
});

test('it does not render a value if the typed value is invalid ', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="CEP"
				mask="99999-999"
				pattern={/^\d{5}-\d{3}$/}
				placeholder="Your CEP"
			/>
		</Form>,
	);

	const input = screen.getByPlaceholderText('Your CEP');

	fireEvent.change(input, { target: { value: 'Wrong Value!' } });

	expect(input.value).toBe('_____-___');
	expect(container).toMatchSnapshot();
});

test('it shows validation error on submit if the value is invalid', async () => {
	const { container, findByText } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="CEP"
				mask="99999-999"
				pattern={/^\d{5}-\d{3}$/}
				placeholder="Your CEP"
			/>
		</Form>,
	);

	const input = screen.getByPlaceholderText('Your CEP');
	fireEvent.change(input, { target: { value: '12' } });
	fireEvent.submit(container.querySelector('form'));

	await findByText(/padrão inválido/i);
	expect(onSubmit).not.toHaveBeenCalled();
	expect(container).toMatchSnapshot();
});

test('it renders the Mask correctly as the user types', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MaskedInputField
				name="CEP"
				mask="99999-999"
				pattern={/^\d{5}-\d{3}$/}
				placeholder="Your CEP"
			/>
		</Form>,
	);

	const input = screen.getByPlaceholderText('Your CEP');

	fireEvent.change(input, { target: { value: '5' } });
	expect(input.value).toBe('5____-___');

	fireEvent.change(input, { target: { value: '59' } });
	expect(input.value).toBe('59___-___');

	fireEvent.change(input, { target: { value: '59655000' } });
	expect(input.value).toBe('59655-000');

	expect(container).toMatchSnapshot();
});
