import React from 'react';
import styled from 'styled-components';
import Modal from 'react-overlays/Modal';
import PropTypes from 'prop-types';

const Container = styled.div`
	position: fixed;
	z-index: 1000;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${({ theme }) => theme.colors.black};
	opacity: 0.7;
`;

const StyledModal = styled(Modal)`
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 630px;
	max-width: 94%;
	z-index: 1000;
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: 0 0 20px 0 ${({ theme }) => theme.colors.black};
	padding: 40px 32px;
	border-radius: 10px;
	text-align: left;
	color: ${({ theme }) => theme.colors.lightGray};
	max-height: 60%;
	overflow-y: auto;
`;

const Label = styled.h3`
	margin-bottom: 2.5rem;
`;

const HelpModal = ({ children, show, onHide, label }) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	const renderBackdrop = (props) => <Container {...props} />;

	return (
		<StyledModal show={show} onHide={onHide} renderBackdrop={renderBackdrop}>
			<div>
				{label && <Label>{label}</Label>}
				{children}
				<Modal />
			</div>
		</StyledModal>
	);
};

HelpModal.propTypes = {
	children: PropTypes.element.isRequired,
	show: PropTypes.bool,
	onHide: PropTypes.func,
	label: PropTypes.string,
};

HelpModal.defaultProps = {
	show: false,
	onHide: () => {},
	label: '',
};

export default HelpModal;
