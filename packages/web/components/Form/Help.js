import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillQuestionCircle } from 'react-icons/ai';
import HelpModal from './HelpModal';

const Icon = styled(AiFillQuestionCircle)`
	width: 4rem;
	height: 4rem;
	margin: 0.6rem 0.5rem;
	fill: ${({ theme }) => theme.colors.mediumGray};
	transition: fill 0.2s;
	:hover {
		cursor: pointer;
		fill: ${({ theme }) => theme.colors.darkGray};
	}
`;

const IconButton = styled.span.attrs({
	tabIndex: 0,
})`
	margin: 0;
	border: 0;
	padding: 0;
`;

const Help = ({ id, label, HelpComponent }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<IconButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
				<Icon id={id} />
			</IconButton>
			<HelpModal id={id} show={isOpen} label={label} onHide={() => setIsOpen(false)}>
				{HelpComponent}
			</HelpModal>
		</>
	);
};

Help.propTypes = {
	id: PropTypes.string,
	HelpComponent: PropTypes.node,
	label: PropTypes.string,
};

Help.defaultProps = {
	id: '',
	HelpComponent: <p>Help Text</p>,
	label: '',
};

export default Help;
