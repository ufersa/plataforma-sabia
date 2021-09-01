/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { render, screen } from 'test-utils';
import * as Router from 'next/router';
import { Protected } from '..';
import * as useAuth from '../../../hooks/useAuth';

jest.mock('../../SignInForm', () => ({
	__esModule: true,
	default: () => <div data-testid="sign-in-form" />,
}));

describe('Protected component', () => {
	it('should redirect to login if user is logged out', () => {
		const mockPush = jest.fn();
		jest.spyOn(Router, 'useRouter').mockReturnValue({
			push: mockPush,
			asPath: 'redirecting',
		});
		const childrenText = 'children';

		const { container } = render(
			<Protected>
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
		expect(mockPush).toHaveBeenCalledTimes(1);
		expect(mockPush).toHaveBeenCalledWith('/entrar?redirect=redirecting');
	});

	it('should render children if user is logged in and the component does not require a role', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
			isAuthenticated: true,
		});

		const childrenText = 'children';

		const { container } = render(
			<Protected>
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(container.querySelector('h1').textContent).toEqual(childrenText);
	});

	it('should render children if user is logged in and has the role', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
				role: {
					role: 'admin',
				},
			},
			isAuthenticated: true,
		});

		const childrenText = 'children';

		const { container } = render(
			<Protected userRole="admin">
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(container.querySelector('h1').textContent).toEqual(childrenText);
	});

	it('should not render children if user is logged in and does not have the role', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
				role: {
					role: 'moderator',
				},
			},
			isAuthenticated: true,
		});

		const childrenText = 'children';

		const { container, getByTestId } = render(
			<Protected userRole="admin">
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(getByTestId('notAuthorized')).toBeInTheDocument();
		expect(container.querySelector('h1').textContent).not.toEqual(childrenText);
	});

	it('should redirect to another page when user is not logged in and component have a redirect prop', () => {
		jest.spyOn(Router, 'useRouter').mockReturnValue({
			push: jest.fn(),
		});

		const childrenText = 'children';
		const redirectTo = '/';

		const { container } = render(
			<Protected userRole="admin" redirectTo={redirectTo}>
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(container.querySelector('h1').textContent).not.toEqual(childrenText);
		expect(Router.useRouter().push).toHaveBeenCalledWith(redirectTo);
		expect(Router.useRouter().push).toHaveBeenCalledTimes(1);
	});

	it('should show an inline login when inline props was passed', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: null,
			},
		});

		const childrenText = 'children';

		const { container } = render(
			<Protected inline>
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(screen.getByTestId(/sign-in-form/i)).toBeInTheDocument();
	});

	it('should return only the inline message when onlyUnauthorizedMessage is provided', () => {
		const childrenText = 'children';

		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: null,
			},
		});

		const { container, queryByTestId } = render(
			<Protected onlyUnauthorizedMessage>
				<h1>{childrenText}</h1>
			</Protected>,
		);

		expect(container).toMatchSnapshot();
		expect(container.querySelector('h1').textContent).not.toEqual(childrenText);
		expect(queryByTestId('modal')).not.toBeTruthy();
		expect(queryByTestId('notAuthorized')).toBeTruthy();
		expect(container.querySelector('form input[type=email]')).not.toBeTruthy();
		expect(container.querySelector('form input[type=password]')).not.toBeTruthy();
		expect(container.querySelector('form button[type=submit]')).not.toBeTruthy();
	});
});
