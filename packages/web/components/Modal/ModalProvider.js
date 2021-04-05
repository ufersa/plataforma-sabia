import React, { useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import { ModalOverlay, Modal, ModalCloseIcon } from './styles';

import ModalContext from './ModalContext';
import NeedToCompleteTheRegistration from './NeedToCompleteTheRegistration';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import EmailConfirmationModal from './EmailConfirmationModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ShareModal from './ShareModal';
import AddReviewModal from './AddReviewModal';
import PendingUserDataModal from './PendingUserDataModal';
import BeAReviewerModal from './BeAReviewerModal';
import RequestSentModal from './RequestSentModal';
import CurateSpecialtiesDeleteModal from './CurateSpecialtiesDeleteModal';
import ContactUsSuccessModal from './ContactUsSuccessModal';
import BuyTechnologyModal from './BuyTechnologyModal';
import CancelOrderModal from './CancelOrderModal';
import TechnologyOrderDetailsModal from './TechnologyOrderDetailsModal';
import UpdateEmailModal from './UpdateEmailModal';
import CreateInstitutionsModal from './CreateInstitutionsModal';
import SettleDealModal from './SettleDealModal';
import ImagesGalleryModal from './ImagesGalleryModal';
import QuestionDetailsModal from './QuestionDetailsModal';
import IframeModal from './IframeModal';
import CKEditorModal from './CKEditorModal';
import EditServiceModal from './EditServiceModal';

const INITIAL_STATE = {
	modal: '',
	props: {},
	// Props applied to modal wrapper
	modalProps: {
		// If true, do not use `Modal` and `CloseIcon`.
		// Returns only `ModalComponent`
		customModal: false,
		// If false, do not let user close the current modal by clicking its overlay
		overlayClick: true,
		// If true, hides the close button
		hideCloseModalIcon: false,
	},
};

const modalReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'OPEN_MODAL':
			return {
				modal: payload.name,
				props: payload.props,
				modalProps: { ...INITIAL_STATE.modalProps, ...payload.modalProps },
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
	addReview: AddReviewModal,
	pendingUserData: PendingUserDataModal,
	beAReviewer: BeAReviewerModal,
	requestToBeReviewerSent: RequestSentModal,
	curateSpecialtiesDelete: CurateSpecialtiesDeleteModal,
	contactUsSuccess: ContactUsSuccessModal,
	buyTechnology: BuyTechnologyModal,
	needToCompleteTheRegistration: NeedToCompleteTheRegistration,
	cancelOrder: CancelOrderModal,
	technologyOrderDetails: TechnologyOrderDetailsModal,
	updateEmail: UpdateEmailModal,
	createInstitutions: CreateInstitutionsModal,
	settleDeal: SettleDealModal,
	imagesGallery: ImagesGalleryModal,
	questionDetails: QuestionDetailsModal,
	iframe: IframeModal,
	ckEditor: CKEditorModal,
	editService: EditServiceModal,
};

const getModalComponent = (modalName) => {
	return mapping[modalName] || null;
};

export const ModalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);
	const ModalComponent = getModalComponent(state.modal);

	const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);

	useEffect(() => {
		const handleKeyUp = ({ key }) => {
			if (key === 'Escape') closeModal();
		};

		if (ModalComponent && document) {
			document.body.classList.add('modal-open');

			window.addEventListener('keyup', handleKeyUp);
		}

		return () => {
			if (document) {
				document.body.classList.remove('modal-open');

				window.removeEventListener('keyup', handleKeyUp);
			}
		};
	}, [ModalComponent, closeModal]);

	const openModal = useCallback(
		(name, props = {}, modalProps = INITIAL_STATE.modalProps) =>
			dispatch({ type: 'OPEN_MODAL', payload: { name, props, modalProps } }),
		[],
	);

	const getModalWrapper = () => {
		if (!ModalComponent) return null;

		const { modalProps } = state;

		if (modalProps.customModal) {
			return React.createElement(ModalComponent, { closeModal, ...state.props });
		}

		return (
			<Modal data-testid="modal">
				{!modalProps.hideCloseModalIcon && (
					<ModalCloseIcon aria-label="Close modal" onClick={() => closeModal()}>
						<AiFillCloseCircle color={state.props?.closerColor} />
					</ModalCloseIcon>
				)}
				{React.createElement(ModalComponent, { ...state.props, closeModal })}
			</Modal>
		);
	};

	const ModalWrapper = getModalWrapper(state.modalProps);

	const handleOverlayClick = useCallback(
		(e) => {
			if (e.target === e.currentTarget) closeModal();
		},
		[closeModal],
	);

	return (
		<ModalContext.Provider value={{ state, openModal, closeModal }}>
			{ModalWrapper && (
				<ModalOverlay
					onClick={state.modalProps.overlayClick ? handleOverlayClick : () => {}}
				>
					{ModalWrapper}
				</ModalOverlay>
			)}
			{children}
		</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

ModalProvider.defaultProps = {};

export default ModalProvider;
