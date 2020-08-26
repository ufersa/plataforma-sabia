import React from 'react';
import { render } from 'test-utils';
import Price from '..';

test('it render the Price component', () => {
	const { container } = render(<Price amount={5000} />);

	expect(container).toMatchSnapshot();
});

test('it render the Price component with the correct currency', () => {
	const { container } = render(<Price amount={5000} currency="USD" />);

	expect(container).toMatchSnapshot();
});
