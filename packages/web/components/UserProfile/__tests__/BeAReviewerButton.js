import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import * as useAuth from '../../../hooks/useAuth';
import BeAReviewerButton from '../BeAReviewerButton';

describe('<BeAReviewerButton />', () => {
	it('should render correctly', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {},
		});
		const { container } = render(<BeAReviewerButton />);

		expect(screen.getByRole('button', { name: /seja um curador/i })).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render pending data modal when user hasnt completed registration', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				registration_completed: false,
			},
		});
		render(<BeAReviewerButton />);

		fireEvent.click(screen.getByRole('button', { name: /seja um curador/i }));

		expect(screen.getByText(/você possui dados pendentes/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /ir para meu perfil/i })).toBeInTheDocument();
	});

	it('should render modal to choose categories when user has completed registration', () => {
		jest.spyOn(useAuth, 'default').mockReturnValue({
			user: {
				registration_completed: true,
			},
		});
		render(<BeAReviewerButton />);

		fireEvent.click(screen.getByRole('button', { name: /seja um curador/i }));

		expect(screen.getByText(/que bom poder contar contigo/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /enviar solicitação/i })).toBeInTheDocument();
	});
});
