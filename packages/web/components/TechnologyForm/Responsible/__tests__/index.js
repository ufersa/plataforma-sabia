/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import Responsible from '..';
import { Form } from '../../../Form';

const onSubmit = jest.fn(() => {});

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
		<Form onSubmit={onSubmit}>
			<Responsible />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});

test('it increase the number of rows when clicking in add button', () => {
	render(
		<Form onSubmit={onSubmit}>
			<Responsible />
		</Form>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	expect(buttons[1]).toMatchSnapshot();
});

test('it decrease the number of rows when clicking in remove button', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />,
		</Form>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	const buttons2 = screen.getAllByRole('button');

	fireEvent.click(buttons2[0]);

	expect(container).toMatchSnapshot();
});

test('it should not remove the row when only one is available', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />
		</Form>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[0]);

	expect(container).toMatchSnapshot();
});
