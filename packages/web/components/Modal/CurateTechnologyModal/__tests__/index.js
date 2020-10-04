import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import { getFakeTechnology } from '../../../../utils/technology';
import CurateTechnologyModal from '..';

const fakeTechnology = getFakeTechnology();
const closeModal = jest.fn();

describe('<CurateTechnologyModal />', () => {
	it('should render all technology tabs', () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		expect(screen.getByRole('tab', { name: /identificação/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /objetivos/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /aspectos legais/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /aplicação/i })).toBeInTheDocument();
		expect(
			screen.getByRole('tab', { name: /estágio de desenvolvimento/i }),
		).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /financiamento/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /contribuição/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /custos/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /riscos/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /mapas/i })).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /documentos/i })).toBeInTheDocument();
	});

	it('should close modal when clicking X button', () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		fireEvent.click(screen.getByLabelText(/close modal/i));
		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	it('should render reviewer actions buttons', () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		expect(screen.getByLabelText(/reject technology/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/approve technology/i)).toBeInTheDocument();
	});

	it('should disable only reject and request changes button if input is empty', () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		expect(screen.getByLabelText(/reject technology/i)).toBeDisabled();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeDisabled();
		expect(screen.getByLabelText(/approve technology/i)).toBeEnabled();
	});

	it('should enable reject and request changes button if input is not empty', () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		const textArea = screen.getByRole('textbox', { name: /observações/i });

		fireEvent.change(textArea, { target: { value: 'testing' } });

		expect(textArea.value).toBe('testing');
		expect(screen.getByLabelText(/reject technology/i)).toBeEnabled();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeEnabled();

		// Approve button must stay enabled
		expect(screen.getByLabelText(/approve technology/i)).toBeEnabled();
	});
});
