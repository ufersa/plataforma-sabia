import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import ModalContext from '../ModalContext';

describe('<ModalProvider />', () => {
	it('should set overflow: hidden on body when a modal is opened', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('share')}>
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
					<button type="button" onClick={() => openModal('share')}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByLabelText(/close modal/i));

		expect(document.body).not.toHaveStyle('overflow: hidden');
	});

	it('should close modal when clicking X button', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('share')}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByLabelText(/close modal/i));

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should render nothing if modal component is null', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('unexistent_modal')}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should not render original modal wrapper if customModal prop is true', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button
						type="button"
						onClick={() => openModal('share', {}, { customModal: true })}
					>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should close modal when ESC key is pressed', () => {
		const { container } = render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('share', {})}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));

		fireEvent.keyUp(container, { key: 'Escape' });

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should close modal when clicking in overlay', () => {
		render(
			<ModalContext.Consumer>
				{({ openModal }) => (
					<button type="button" onClick={() => openModal('share', {})}>
						Open Modal
					</button>
				)}
			</ModalContext.Consumer>,
		);

		fireEvent.click(screen.getByRole('button'));

		fireEvent.click(screen.getByTestId('modal').parentElement);

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});
});
