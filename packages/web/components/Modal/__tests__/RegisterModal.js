import React from 'react';

import { render, screen } from 'test-utils';
import RegisterModal from '../RegisterModal';

const closeModalMock = jest.fn();

describe('<RegisterModal />', () => {
	it('should render correctly', () => {
		const { container } = render(<RegisterModal closeModal={closeModalMock} />);

		expect(
			screen.getByText(/você está prestes a descobrir um mundo de oportunidades/i),
		).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
