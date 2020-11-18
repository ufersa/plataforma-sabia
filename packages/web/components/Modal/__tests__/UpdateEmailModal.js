import React from 'react';

import { render, screen } from 'test-utils';
import UpdateEmailModal from '../UpdateEmailModal';

const closeModalMock = jest.fn();

describe('<UpdateEmailModal />', () => {
	it('should render correctly', () => {
		const { container } = render(
      <UpdateEmailModal closeModal={closeModalMock} />
    );

		expect(screen.getByRole('form')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
