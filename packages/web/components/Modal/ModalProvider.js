import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ModalOverlay, Modal, ModalCloseIcon } from './styles';

import ModalContext from './ModalContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import EmailConfirmationModal from './EmailConfirmationModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ShareModal from './ShareModal';
import ReviewTechnologyModal from './ReviewTechnologyModal';

const INITIAL_STATE = {
	modal: '',
	props: {},
	// Props applied to modal wrapper
	modalProps: {
		// If true, do not use `Modal` and `CloseIcon`.
		// Returns only `ModalComponent`
		customModal: false,
	},
};

const modalReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'OPEN_MODAL':
			return {
				modal: payload.name,
				props: payload.props,
				modalProps: payload.modalProps,
			};
		case 'CLOSE_MODAL':
			return INITIAL_STATE;
		default:
			throw new Error('Invalid action');
	}
};

const mapping = {
	login: LoginModal,
	register: RegisterModal,
	emailConfirmation: EmailConfirmationModal,
	forgotPassword: ForgotPasswordModal,
	share: ShareModal,
	reviewTechnology: ReviewTechnologyModal,
};

const getModalComponent = (modalName) => {
	return mapping[modalName] || null;
};

export const ModalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);
	const ModalComponent = getModalComponent(state.modal);

	const openModal = useCallback(
		(name, props = {}, modalProps = INITIAL_STATE.modalProps) =>
			dispatch({ type: 'OPEN_MODAL', payload: { name, props, modalProps } }),
		[],
	);
	const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);

	const getModalWrapper = () => {
		if (!ModalComponent) return null;

		const { modalProps } = state;

		if (modalProps.customModal) {
			return React.createElement(ModalComponent, { closeModal, ...state.props });
		}

		return (
			<Modal data-testid="modal">
				<ModalCloseIcon onClick={() => closeModal()}>
					<AiFillCloseCircle color={state.props.closerColor} />
				</ModalCloseIcon>
				{React.createElement(ModalComponent, { ...state.props })}
			</Modal>
		);
	};

	const ModalWrapper = getModalWrapper(state.modalProps);

	return (
		<ModalContext.Provider value={{ state, openModal, closeModal }}>
			{ModalComponent && <ModalOverlay>{ModalWrapper}</ModalOverlay>}
			{children}
		</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default ModalProvider;
