import React from 'react';
import { render } from 'test-utils';
import Loading from '..';

describe('Loading component', () => {
	const childrenText = 'hi';

	it('render loading or children correctly', () => {
		const { container, rerender } = render(
			<Loading loading={false}>
				<h1>{childrenText}</h1>
			</Loading>,
		);

		expect(container.querySelector('h1').textContent).toEqual(childrenText);

		rerender(
			<Loading loading>
				<h1>{childrenText}</h1>
			</Loading>,
		);

		expect(container.querySelector('h1')?.textContent).toBeFalsy();
		expect(container).toMatchSnapshot();
	});

	it('render with another variants', () => {
		const { container, rerender } = render(
			<Loading variant="secondary">
				<h1>{childrenText}</h1>
			</Loading>,
		);

		rerender(
			<Loading variant="white">
				<h1>{childrenText}</h1>
			</Loading>,
		);

		expect(container).toMatchSnapshot();
	});
});
