import React from 'react';
import { render } from 'test-utils';
import { Protected } from '..';
import * as useAuth from '../../../hooks/useAuth';
import * as useModal from '../../../hooks/useModal';

test('it should return the login modal if user is not logged in', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: null,
	});

	jest.spyOn(useModal, 'default').mockReturnValue({ openModal: jest.fn() });

	const { container } = render(
		<Protected>
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
});

test('it should render children if user is logged in', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
		},
	});

	jest.spyOn(useModal, 'default').mockReturnValue({ openModal: jest.fn() });

	const { container } = render(
		<Protected>
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
});

test('it should render children if user is logged in and has the role', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: 'admin',
		},
	});

	jest.spyOn(useModal, 'default').mockReturnValue({
		openModal: jest.fn(),
	});

	const { container } = render(
		// eslint-disable-next-line jsx-a11y/aria-role
		<Protected role="admin">
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
});

test('it should not render children if user is logged in and does not have the role', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: 'guest',
		},
	});

	jest.spyOn(useModal, 'default').mockReturnValue({
		openModal: jest.fn(),
	});

	const { container } = render(
		// eslint-disable-next-line jsx-a11y/aria-role
		<Protected role="admin">
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
});
