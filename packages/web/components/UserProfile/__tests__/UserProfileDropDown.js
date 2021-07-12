import React from 'react';
import { render, screen, act } from 'test-utils';
import { cache } from 'swr';
import UserProfileDropDown from '../UserProfileDropDown';
import * as useAuth from '../../../hooks/useAuth';
import * as userServices from '../../../services/user';

describe('UserProfileDropDown', () => {
	afterEach(() => {
		cache.clear();
	});

	test('it renders as expected if visible is true', () => {
		const { container } = render(<UserProfileDropDown visible toggleVisible={() => {}} />);

		expect(screen.queryAllByRole('list').length).toBeGreaterThan(0);
		expect(screen.queryByRole('button', { name: /sair|logout/i })).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('it does not render if receives visible as false', () => {
		const { container } = render(
			<UserProfileDropDown visible={false} toggleVisible={() => {}} />,
		);

		expect(screen.queryAllByRole('list')).toHaveLength(0);
		expect(screen.queryByRole('button', { name: /sair|logout/i })).toBeNull();
		expect(container).toMatchSnapshot();
	});

	it('should not request notifications if user is unauthenticated', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {},
		});
		const mockedQuestions = jest.spyOn(userServices, 'getUserUnansweredQuestions');
		const mockedMessages = jest.spyOn(userServices, 'getUserNewMessages');

		render(<UserProfileDropDown visible={false} toggleVisible={() => {}} />);

		expect(mockedQuestions).toHaveBeenCalledTimes(0);
		expect(mockedMessages).toHaveBeenCalledTimes(0);
	});

	it('should request notifications if user is authenticated', async () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@email.com',
			},
			isAuthenticated: true,
		});
		const mockedQuestions = jest.spyOn(userServices, 'getUserUnansweredQuestions');
		const mockedMessages = jest.spyOn(userServices, 'getUserNewMessages');

		act(() => {
			render(<UserProfileDropDown visible toggleVisible={() => {}} />);
		});

		// This expect is only for waiting the new render of SWR so we avoid ACT warnings
		expect(await screen.findByRole('button')).toBeInTheDocument();
		expect(mockedQuestions).toHaveBeenCalledTimes(1);
		expect(mockedMessages).toHaveBeenCalledTimes(1);
	});
});
