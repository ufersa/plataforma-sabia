import React from 'react';
import { render } from 'test-utils';

import Responsibles from '../Tables/Responsibles';

describe('<Responsibles />', () => {
	it('should render without crashing', () => {
		const { container } = render(<Responsibles data={[]} />);
		expect(container).toMatchSnapshot();
	});

	it('should render without crashing when the responsible are being passed throught', () => {
		const { container } = render(
			<Responsibles
				data={[
					{
						id: 1234,
						name: 'my name is test',
						email: 'my-email-is-test@test.com',
						lattes_id: '12345',
						lattes_url: 'http://lattes_url.com/my-id-on-lattes',
						verified: 'verified',
					},
				]}
			/>,
		);
		expect(container).toMatchSnapshot();
	});

	it('should not render the lattes information when hideLattesInfo is passed', () => {
		const { container } = render(
			<Responsibles
				data={[
					{
						id: 1234,
						name: 'my name is test',
						email: 'my-email-is-test@test.com',
						lattes_id: '12345',
						lattes_url: 'http://lattes_url.com/my-id-on-lattes',
						verified: 'verified',
					},
				]}
				hideLattesInfo
			/>,
		);
		expect(container).toMatchSnapshot();
	});
});
