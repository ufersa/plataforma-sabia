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

test('it renders the form with 2 rows', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />
		</Form>,
	);

	expect(screen.getAllByTestId('row')).toHaveLength(2);
	expect(container).toMatchSnapshot();
});

test('it increases the number of rows when clicking on add button', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />
		</Form>,
	);

	expect(screen.getAllByTestId('row')).toHaveLength(2);
	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	expect(screen.getAllByTestId('row')).toHaveLength(3);
	expect(container).toMatchSnapshot();
});

test('it decreases the number of rows when clicking on remove button', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />,
		</Form>,
	);

	const buttons = screen.getAllByRole('button');
	fireEvent.click(buttons[1]);

	expect(screen.getAllByTestId('row')).toHaveLength(3);

	fireEvent.click(buttons[0]);

	expect(screen.getAllByTestId('row')).toHaveLength(2);
	expect(container).toMatchSnapshot();
});

test('it does not remove a row when thare are only two', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Responsible />,
		</Form>,
	);

	expect(screen.getAllByTestId('row')).toHaveLength(2);
	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[0]);

	expect(screen.getAllByTestId('row')).toHaveLength(2);
	expect(container).toMatchSnapshot();
});
