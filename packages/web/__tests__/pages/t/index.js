import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import Page from '../../../pages/t/[technology]';
import { getFakeTechnology, normalizeAttachments } from '../../../utils/technology';
import * as useAuth from '../../../hooks/useAuth';

let technology = getFakeTechnology();

technology = {
	...technology,
	attachments: normalizeAttachments(technology.attachments),
};

describe('Technology Details Page', () => {
	const tabs = ['about', 'description', 'review', 'costs', 'attachments'];

	function mockLogin(user) {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: user,
			},
		});
	}

	function clickOnAllTabs() {
		tabs.forEach(async (tab) => {
			const item = screen.getByTestId(tab);
			fireEvent.click(item);
		});
	}

	it('render correctly when user is logged in', () => {
		mockLogin('test@test.com');

		const { container } = render(
			<Page technology={technology} relatedTechnologies={[{ ...technology }]} />,
		);

		clickOnAllTabs();

		expect(container).toMatchSnapshot();
	});

	it('render correctly when user is not logged in', () => {
		mockLogin(null);

		const { container } = render(
			<Page technology={technology} relatedTechnologies={[{ ...technology }]} />,
		);

		clickOnAllTabs();

		expect(container).toMatchSnapshot();
	});
});
