import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from './styles';

const Button = ({ children, onClick, type, bgColor, color }) => {
	return (
		<StyledButton onClick={onClick} type={type} bgColor={bgColor} color={color}>
			{children}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	bgColor: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	type: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
};

export default Button;
