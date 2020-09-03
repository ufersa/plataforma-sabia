import React from 'react';
import { render } from 'test-utils';
import Review from '..';
import { Form } from '../../../Form';
import { getFakeTechnology } from '../../../../utils/technology';

const data = {
	technology: getFakeTechnology(),
};

const onSubmit = jest.fn(() => {});

test('it render the review page', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Review data={data} />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});
