/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { render } from 'test-utils';
import { Protected } from '..';
import * as useAuth from '../../../hooks/useAuth';
// import * as useModal from '../../../hooks/useModal';

test('it should return the login modal if user is not logged in', () => {
	const childrenText = 'children';

	const { container } = render(
		<Protected>
			<h1>{childrenText}</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
	expect(container.querySelector('h1').textContent).not.toEqual(childrenText);
	expect(container.querySelector('form input[type=email]')).toBeTruthy();
	expect(container.querySelector('form input[type=password]')).toBeTruthy();
	expect(container.querySelector('form button[type=submit]')).toBeTruthy();
});

test('it should render children if user is logged in and has the role', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: 'admin',
		},
	});

	const childrenText = 'children';

	const { container } = render(
		<Protected role="admin">
			<h1>{childrenText}</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
	expect(container.querySelector('h1').textContent).toEqual(childrenText);
});

test('it should not render children if user is logged in and does not have the role', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: 'moderator',
		},
	});

	const childrenText = 'children';

	const { container, getByTestId } = render(
		<Protected role="admin">
			<h1>{childrenText}</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
	expect(getByTestId('unauthorized')).toBeInTheDocument();
	expect(container.querySelector('h1').textContent).not.toEqual(childrenText);
});
