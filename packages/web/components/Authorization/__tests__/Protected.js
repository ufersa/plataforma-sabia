import React from 'react';

import { render } from 'test-utils';
import { Protected } from '..';

test('it should not render children if user is not logged in', () => {
	const { container } = render(
		<Protected>
			<h1>Children</h1>
		</Protected>,
	);

	expect(container).toMatchSnapshot();
});
