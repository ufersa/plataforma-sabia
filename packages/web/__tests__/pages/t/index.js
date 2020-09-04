import React from 'react';
import { render } from 'test-utils';
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

	expect(container).toMatchSnapshot();
});
