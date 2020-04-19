import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import StyledButton from './styles';

const Button = ({ children, onClick, variant, type }) => {
	const { colors } = useTheme();

	const bgColor = variant === 'primary' ? colors.primary : colors.black;
	const color = variant === 'primary' ? colors.white : colors.white;

	return (
		<StyledButton onClick={onClick} type={type} bgColor={bgColor} color={color}>
			{children}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary']),
	onClick: PropTypes.func,
	type: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	onClick: () => {},
};

export default Button;
