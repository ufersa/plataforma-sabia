import React from 'react';
import { render, screen } from 'test-utils';
import Revisions from '../../../../pages/user/my-account/revisions';

import * as useAuth from '../../../../hooks/useAuth';
import { ROLES } from '../../../../utils/enums/api.enum';
import { STATUS } from '../../../../utils/enums/technology.enums';
import { theme } from '../../../../styles';

const technologies = [
	{
		id: 1,
		title: 'Fake technology',
		updated_at: '2020-10-19T14:27:58.543Z',
		status: STATUS.IN_REVIEW,
	},
	{
		id: 2,
		title: 'Fake technology',
		updated_at: '2020-10-19T14:27:58.543Z',
		status: STATUS.REQUESTED_CHANGES,
	},
	{
		id: 3,
		title: 'Fake technology',
		updated_at: '2020-10-19T14:27:58.543Z',
		status: STATUS.CHANGES_MADE,
	},
];

test('it renders Revisions page correctly', () => {
	jest.spyOn(useAuth, 'default').mockReturnValue({
		user: {
			email: 'test@test.com',
			role: {
				role: ROLES.REVIEWER,
			},
		},
		isAuthenticated: true,
	});

	const { container } = render(
		<Revisions
			technologies={technologies}
			currentPage={1}
			totalPages={1}
			totalItems={3}
			itemsPerPage={5}
		/>,
	);

	const inReviewEl = screen.getByText('Aguardando análise');
	const requestedChangesEl = screen.getByText('Aguardando correção');
	const changesMadeEl = screen.getByText('Correção efetuada');

	expect(container).toMatchSnapshot();

	expect(inReviewEl).toBeInTheDocument();
	expect(inReviewEl).toHaveStyle({ color: theme.colors.lightGray2 });

	expect(requestedChangesEl).toBeInTheDocument();
	expect(requestedChangesEl).toHaveStyle({ color: theme.colors.primary });

	expect(changesMadeEl).toBeInTheDocument();
	expect(changesMadeEl).toHaveStyle({ color: theme.colors.secondary });
});
