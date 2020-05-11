import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiFillQuestionCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

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

const Help = ({ HelpComponent }) => {
	return (
		<>
			<Icon data-tip data-for="help" />
			<ReactTooltip id="help" type="dark" place="right" effect="solid">
				{HelpComponent}
			</ReactTooltip>
		</>
	);
};

Help.propTypes = {
	HelpComponent: PropTypes.element,
};

Help.defaultProps = {
	HelpComponent: <p>Help Text</p>,
};

export default Help;
