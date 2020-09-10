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

const Help = ({ id, label, HelpComponent }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Icon data-tip data-for={id} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<HelpModal show={isOpen} label={label} onHide={() => setIsOpen(false)}>
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
