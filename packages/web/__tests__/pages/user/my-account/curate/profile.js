import React from 'react';
import { render, screen } from 'test-utils';
import CurateProfile from '../../../../../pages/user/my-account/curate-profile';

import * as useAuth from '../../../../../hooks/useAuth';
import { ROLES } from '../../../../../utils/enums/api.enum';

const categories = [
	{
		id: 1,
		term: 'Category',
		parent_id: null,
	},
	{
		id: 2,
		term: 'Subcategory',
		parent_id: 1,
	},
];

test('it renders Profile page correctly', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: {
				role: ROLES.REVIEWER,
			},
		},
		isAuthenticated: true,
	});

	const { container } = render(<CurateProfile categories={categories} />);

	expect(container).toMatchSnapshot();

	expect(screen.getByText(categories[0].term)).toBeInTheDocument();
});

test('it renders Profile page and empty Specialties', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: {
				role: ROLES.REVIEWER,
			},
		},
		isAuthenticated: true,
	});

	const { container } = render(<CurateProfile categories={[]} />);

	expect(container).toMatchSnapshot();

	expect(screen.getByText('Nenhuma área de atuação!')).toBeInTheDocument();
});
