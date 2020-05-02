import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import StyledButton from './styles';

export const Button = ({ children, disabled, onClick, variant, type }) => {
	const { colors } = useTheme();

	const bgColor = variant === 'primary' ? colors.primary : colors.black;

	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			type={type}
			bgColor={bgColor}
			color={colors.white}>
			{children}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary']),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	onClick: () => {},
};

export default Button;
