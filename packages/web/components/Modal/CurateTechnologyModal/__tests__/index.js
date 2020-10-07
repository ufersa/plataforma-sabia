import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import { getFakeTechnology } from '../../../../utils/technology';
import CurateTechnologyModal from '..';

const fakeTechnology = getFakeTechnology();
const closeModal = jest.fn();

describe('<CurateTechnologyModal />', () => {
	it('should render all technology tabs', () => {
		const tabsName = [
			/identificação/i,
			/objetivos/i,
			/aspectos legais/i,
			/aplicação/i,
			/estágio de desenvolvimento/i,
			/financiamento/i,
			/contribuição/i,
			/custos/i,
			/riscos/i,
			/mapas/i,
			/documentos/i,
		];

		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		tabsName.forEach((tab) => {
			const tabElement = screen.getByRole('tab', { name: tab });
			fireEvent.click(tabElement);
			expect(tabElement).toBeInTheDocument();
		});
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
