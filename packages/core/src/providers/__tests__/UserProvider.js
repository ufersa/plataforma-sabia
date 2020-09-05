import React from 'react';
import { render, fireEvent } from 'test-utils';
import { UserProvider } from '..';

const testUser = {
	id: '1',
	email: 'sabiatestinge2e@gmail.com',
	first_name: 'Nicholas2',
	last_name: 'Testing',
	full_name: 'Sabia Testing',
};

const DummyConsumerComponent = () => {
	const { UserContext } = UserProvider;
	return (
		<UserProvider>
			<UserContext.Consumer>
				{({ user, setUser, logout }) => {
					return (
						<>
							<a href="#" onClick={() => setUser(testUser)}>
								Set User
							</a>
							<a href="#" onClick={() => logout()}>
								Logout
							</a>
							<span data-testid="userFullName">{user.full_name}</span>
							<span data-testid="userId">{user.id}</span>
							<span data-testid="userEmail">{user.email}</span>
						</>
					);
				}}
			</UserContext.Consumer>
		</UserProvider>
	);
};

test('UserProvider works', () => {
	const { getByText, getByTestId } = render(<DummyConsumerComponent />);

	expect(getByTestId('userId')).toBeEmptyDOMElement();
	expect(getByTestId('userFullName')).toBeEmptyDOMElement();
	expect(getByTestId('userEmail')).toBeEmptyDOMElement();

	fireEvent(getByText('Set User'), new MouseEvent('click', { bubbles: true }));

	expect(getByTestId('userId')).toHaveTextContent(testUser.id);
	expect(getByTestId('userFullName')).toHaveTextContent(testUser.full_name);
	expect(getByTestId('userEmail')).toHaveTextContent(testUser.email);

	fireEvent(getByText('Logout'), new MouseEvent('click', { bubbles: true }));

	expect(getByTestId('userId')).toBeEmptyDOMElement();
	expect(getByTestId('userFullName')).toBeEmptyDOMElement();
	expect(getByTestId('userEmail')).toBeEmptyDOMElement();
});
