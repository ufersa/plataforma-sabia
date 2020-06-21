/* eslint-disable jest/no-disabled-tests */
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

test.skip('it renders the form with one row', () => {
	const { container } = render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
				control: {},
			}}
		/>,
	);

	expect(container).toMatchSnapshot();
});

test.skip('it increase the number of rows when clicking in add button', () => {
	render(
		<Responsible
			form={{
				errors: {},
				register: jest.fn(),
			}}
		/>,
	);

	const buttons = screen.getAllByRole('button');

	fireEvent.click(buttons[1]);

	expect(buttons[1]).toMatchInlineSnapshot(`
		.c0 {
		  background-color: hsla(195,86%,64%);
		  color: hsla(0,0%,100%);
		  border-radius: 100%;
		  height: 100%;
		  border: none;
		  font-size: 2rem;
		  text-transform: uppercase;
		  text-align: center;
		  -webkit-text-decoration: none;
		  text-decoration: none;
		  display: inline-block;
		  padding: 1rem !important;
		  float: right;
		  display: -webkit-box;
		  display: -webkit-flex;
		  display: -ms-flexbox;
		  display: flex;
		}

		.c0:hover {
		  opacity: 0.8;
		}

		@media (max-width:450px) {

		}

		@media (max-width:450px) {

		}

		@media (max-width:450px) {

		}

		<button
		  class="c0"
		  color="hsla(0, 0%, 100%)"
		  title=""
		  type="button"
		>
		  <svg>
		    FaPlus mocked
		  </svg>
		</button>
	`);
});

test.skip('it decrease the number of rows when clicking in remove button', () => {
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

test.skip('it should not remove the row when only one is available', () => {
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
