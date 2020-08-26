import React from 'react';
import { render } from 'test-utils';
import Review from '..';
import { Form } from '../../../Form';

const onSubmit = jest.fn(() => {});

test('it render the review page', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Review />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});
