import React from 'react';

import { render, screen } from 'test-utils';
import RegisterModal from '../RegisterModal';

const closeModalMock = jest.fn();

describe('<RegisterModal />', () => {
	it('should render correctly', () => {
		const { container } = render(<RegisterModal closeModal={closeModalMock} />);

		expect(screen.getByText('common:registerTitle')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
