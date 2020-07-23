import React from 'react';
import { render, screen } from 'test-utils';
import UserProfileDropDown from '../UserProfileDropDown';

describe('UserProfileDropDown', () => {
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
});
