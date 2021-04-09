import React from 'react';
import { render } from 'test-utils';
import { SolutionCard } from '..';

const technologyMock = {
	id: 1,
	title: 'title',
	slug: 'slug',
	users: [{}],
	type: 'any',
	likes: 1,
};

const serviceMock = {
	id: 1,
	name: 'name',
	price: 1,
	user: {
		institution: {
			initials: 'any',
		},
	},
	measure_unit: 'unit',
};

describe('SolutionCard component', () => {
	test('it should render a technology card', () => {
		const { container } = render(<SolutionCard data={technologyMock} type="technology" />);

		expect(container).toMatchSnapshot();
	});

	test('it should render a service card', () => {
		const { container } = render(<SolutionCard data={serviceMock} type="service" />);

		expect(container).toMatchSnapshot();
	});
});
