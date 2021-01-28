import React from 'react';
import { render, screen, fireEvent } from 'test-utils';
import { cache } from 'swr';
import { getFakeTechnology } from '../../../../utils/technology';
import CurateTechnologyModal from '..';

const fakeTechnology = getFakeTechnology();
const closeModal = jest.fn();

jest.mock('../../../../services/technology', () => ({
	getTechnologyCosts: () => [],
	getAttachments: () => [],
	getTechnologyTerms: () => [],
	getTechnologyComments: () => {},
}));

describe('<CurateTechnologyModal />', () => {
	beforeEach(() => {
		cache.clear();
	});

	it('should render all technology tabs', async () => {
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

		await screen.findByText(fakeTechnology.title);

		tabsName.forEach((tab) => {
			const tabElement = screen.getByRole('tab', { name: tab });

			expect(tabElement).toBeInTheDocument();
		});
	});

	it('should close modal when clicking X button', async () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		await screen.findByText(fakeTechnology.title);

		const closeButton = screen.getByLabelText(/close modal/i);

		fireEvent.click(closeButton);

		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	it('should render reviewer actions buttons', async () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		await screen.findByText(fakeTechnology.title);

		expect(screen.getByLabelText(/reject technology/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/approve technology/i)).toBeInTheDocument();
	});

	it('should disable only reject and request changes button if input is empty', async () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		await screen.findByText(fakeTechnology.title);

		expect(screen.getByLabelText(/reject technology/i)).toBeDisabled();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeDisabled();
		expect(screen.getByLabelText(/approve technology/i)).toBeEnabled();
	});

	it('should enable reject and request changes button if input is not empty', async () => {
		render(<CurateTechnologyModal technology={fakeTechnology} closeModal={closeModal} />);

		await screen.findByText(fakeTechnology.title);

		const textArea = await screen.findByRole('textbox', { name: /observações/i });

		fireEvent.change(textArea, { target: { value: 'testing' } });

		expect(textArea.value).toBe('testing');
		expect(screen.getByLabelText(/reject technology/i)).toBeEnabled();
		expect(screen.getByLabelText(/request changes in technology/i)).toBeEnabled();

		// Approve button must stay enabled
		expect(screen.getByLabelText(/approve technology/i)).toBeEnabled();
	});
});
