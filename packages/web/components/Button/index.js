import React from 'react';
import PropTypes from 'prop-types';

import Button from './styles';

const StyledButton = ({ children, type, bgColor, color }) => {
	return (
		<Button type={type} bgColor={bgColor} color={color}>
			{children}
		</Button>
	);
};

StyledButton.propTypes = {
	children: PropTypes.string.isRequired,
	type: PropTypes.string,
	bgColor: PropTypes.string,
	color: PropTypes.string,
};

StyledButton.defaultProps = {
	type: 'button',
	bgColor: '#EF4136',
	color: '#fff',
};

export default StyledButton;
