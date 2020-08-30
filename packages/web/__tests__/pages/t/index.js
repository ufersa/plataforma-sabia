import React from 'react';
import { render } from 'test-utils';
import Page from '../../../pages/t/[technology]';
import { getFakeTechnology } from '../../../utils/technology';

const technology = getFakeTechnology();

test('it render the technology details page', () => {
	const { container } = render(
		<Page technology={technology} relatedTechnologies={[{ ...technology }]} />,
	);

	expect(container).toMatchSnapshot();
});
