/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import { useForm } from 'react-hook-form';
import Responsible from '..';

jest.mock('react-icons/fa', () => {
	return {
		__esModule: true,
		FaPlus: () => {
			return <svg>FaPlus mocked</svg>;
		},
		FaMinus: () => {
			return <svg>FaMinus mocked</svg>;
		},
	};
});

// eslint-disable-next-line react/prop-types
const ResponsibleWrapper = () => {
	const onSubmit = jest.fn();

	const form = useForm({ mode: 'onChange' });

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Responsible form={form} />
		</form>
	);
};

test('it renders the form with one row', () => {
	const { container } = render(<ResponsibleWrapper />);

	expect(container).toMatchSnapshot();
});

test('it increase the number of rows when clicking in add button', () => {
	render(<ResponsibleWrapper />);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	expect(buttons[1]).toMatchSnapshot();
});

test('it decrease the number of rows when clicking in remove button', () => {
	const { container } = render(<ResponsibleWrapper />);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	const buttons2 = screen.getAllByRole('button');

	fireEvent.click(buttons2[0]);

	expect(container).toMatchSnapshot();
});

test('it should not remove the row when only one is available', () => {
	const { container } = render(<ResponsibleWrapper />);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[0]);

	expect(container).toMatchSnapshot();
});
