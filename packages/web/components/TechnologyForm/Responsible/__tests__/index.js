/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
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

test('it renders the form with one row', () => {
	const { container } = render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
			}}
		/>,
	);

	expect(container).toMatchSnapshot();
});

test('it increase the number of rows when clicking in add button', () => {
	const { container } = render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
			}}
		/>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	expect(container).toMatchSnapshot();
});

test('it decrease the number of rows when clicking in remove button', () => {
	const { container } = render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
			}}
		/>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	const buttons2 = screen.getAllByRole('button');

	fireEvent.click(buttons2[0]);

	expect(container).toMatchSnapshot();
});

test('it should not remove the row when only one is available', () => {
	const { container } = render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
			}}
		/>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[0]);

	expect(container).toMatchSnapshot();
});
