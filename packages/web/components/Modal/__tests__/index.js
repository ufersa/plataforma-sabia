import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import ModalContext from '../ModalContext';

describe('<ModalProvider />', () => {
	it('should set overflow: hidden on body when a modal is opened', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('login')}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(document.body).toHaveStyle('overflow: hidden');
	});

	it('should remove overflow: hidden on body when modal is closed', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('login')}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByLabelText(/close modal/i));

		expect(document.body).not.toHaveStyle('overflow: hidden');
	});

	it('should not render original modal wrapper if customModal prop is true', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button
						type="button"
						onClick={() => openModal('login', {}, { customModal: true })}
					>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});
});
