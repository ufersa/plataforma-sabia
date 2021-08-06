import React from 'react';
import { render } from 'test-utils';
import Review from '..';
import { getFakeTechnology, normalizeAttachments } from '../../../../utils/technology';

let technology = getFakeTechnology();

technology = {
	...technology,
	attachments: normalizeAttachments(technology.attachments),
};

const data = {
	technology,
};

const formMock = {
	onSubmit: jest.fn(),
	getValues: jest.fn(() => ({ comment: '' })),
	formState: { errors: {} },
	register: jest.fn(),
};

test('it render the review page', () => {
	const { container } = render(<Review data={data} form={formMock} />);

	expect(container).toMatchSnapshot();
});
