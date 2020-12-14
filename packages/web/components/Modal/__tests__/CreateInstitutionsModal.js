import React from 'react';

import { render, screen } from 'test-utils';
import CreateInstitutionsModal from '../CreateInstitutionsModal';

const closeModalMock = jest.fn();

describe('<CreateInstitutionsModal />', () => {
	it('should render correctly', () => {
		const { container } = render(<CreateInstitutionsModal closeModal={closeModalMock} />);

		expect(screen.getByRole('form')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
