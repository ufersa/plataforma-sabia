import React from 'react';
import { render } from 'test-utils';
import Watcher from '../Watcher';

test('it renders the form.watch return', () => {
	const { container } = render(
		<Watcher
			form={{
				watch: () => 50,
				control: {},
			}}
			property="my-field"
			render={(element) => {
				return <div>{element}</div>;
			}}
		/>,
	);

	expect(container).toMatchSnapshot();
});
