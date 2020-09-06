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
	it('render correctly', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
		});

		const { container } = render(
			<Page technology={technology} relatedTechnologies={[{ ...technology }]} />,
		);

		const tabs = ['about', 'description', 'review', 'costs', 'attachments'];

		tabs.forEach(async (tab) => {
			const item = screen.getByTestId(tab);
			fireEvent.click(item);
		});

		expect(container).toMatchSnapshot();
	});
});
