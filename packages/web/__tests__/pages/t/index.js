import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import Page from '../../../pages/t/[technology]';
import { getFakeTechnology, normalizeAttachments } from '../../../utils/technology';

let technology = getFakeTechnology();

technology = {
	...technology,
	attachments: normalizeAttachments(technology.attachments),
};

test('it render the technology details page', () => {
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
