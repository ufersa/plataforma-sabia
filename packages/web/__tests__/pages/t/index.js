import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import Page from '../../../pages/t/[technology]';
import { getFakeTechnology, normalizeAttachments } from '../../../utils/technology';
import * as useAuth from '../../../hooks/useAuth';

let technology = getFakeTechnology();

technology = {
	...technology,
	attachments: normalizeAttachments(technology.attachments),
};

const service = {
	id: 1,
	name: 'Service Name',
	price: 100,
	thumbnail: null,
	likes: 1,
	user: {
		institution: {
			name: 'Institution Name',
		},
	},
	measure_unit: 'week',
};

describe('Technology Details Page', () => {
	const tabs = ['about', 'description', 'review', 'costs', 'attachments'];

	test.each([
		['logged in', 'test@test.com'],
		['not logged in', null],
	])('render correctly when user is %s', (_, email) => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email,
			},
			isAuthenticated: !!email,
		});

		const { container } = render(
			<Page
				technology={technology}
				relatedTechnologies={[technology]}
				relatedServices={[service]}
			/>,
		);

		tabs.forEach((tab) => {
			const item = screen.getByTestId(tab);
			fireEvent.click(item);
		});

		expect(container).toMatchSnapshot();
	});

	it('should not render implementation costs if the technology does not have it', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				email: 'test@test.com',
			},
			isAuthenticated: true,
		});
		const technologyNoCosts = { ...technology, technologyCosts: {} };

		render(<Page technology={technologyNoCosts} relatedTechnologies={[technologyNoCosts]} />);

		expect(screen.queryByText(/custo de implantação/i)).not.toBeInTheDocument();
	});
});
