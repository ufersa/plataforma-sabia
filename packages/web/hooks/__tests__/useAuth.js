import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '..';
import { UserProvider } from '../../components/User';

const testUser = {
	id: '1',
	email: 'sabiatestinge2e@gmail.com',
	first_name: 'Nicholas2',
	last_name: 'Testing',
	full_name: 'Sabia Testing',
};

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;

describe('userAuth', () => {
	it('can setUser and logout', () => {
		const { result } = renderHook(() => useAuth(), { wrapper });

		expect(result.current.user).toEqual({});

		act(() => {
			result.current.setUser(testUser);
		});

		expect(result.current.user).toEqual(testUser);

		act(() => {
			result.current.logout();
		});

		expect(result.current.user).toEqual({});
	});
});
