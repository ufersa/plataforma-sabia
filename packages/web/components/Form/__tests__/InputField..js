import React from 'react';
import { render, fireEvent } from 'test-utils';

import { waitFor } from '@testing-library/react';
import { Form, InputField } from '..';

describe('InputField', () => {
	test('renders properly and on submit shows validation errors', async () => {
		const onSubmit = jest.fn(() => {});
		const { container, getByLabelText, findByText } = render(
			<Form onSubmit={onSubmit}>
				<InputField
					name="test-input"
					label="Test Input"
					type="text"
					help={<p>Help Text</p>}
					validation={{ required: true }}
				/>
			</Form>,
		);

		const input = getByLabelText(/test input/i);
		expect(input).toHaveAttribute('type', 'text');

		fireEvent.submit(container.querySelector('form'));
		await findByText('error:requiredField');
		expect(onSubmit).not.toHaveBeenCalled();
		expect(container).toMatchSnapshot();
	});

	test('does not trigger validation if not required', async () => {
		const onSubmit = jest.fn(() => {});
		const { container, getByLabelText } = render(
			<Form onSubmit={onSubmit}>
				<InputField
					name="test-input"
					label="Test Input"
					type="text"
					validation={{ required: false }}
				/>
			</Form>,
		);

		const input = getByLabelText(/test input/i);
		expect(input).toHaveAttribute('type', 'text');

		fireEvent.submit(container.querySelector('form'));
		await waitFor(() => expect(onSubmit).toHaveBeenCalled());

		expect(container).toMatchSnapshot();
	});
});
