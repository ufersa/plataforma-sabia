import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import StyledButton from './styles';

const Button = ({ children, disabled, onClick, variant, type, title }) => {
	const { colors } = useTheme();

	let bgColor;

	switch (variant) {
		case 'primary':
			bgColor = colors.primary;
			break;
		case 'secondary':
			bgColor = colors.lightGray;
			break;
		case 'success':
			bgColor = colors.secondary;
			break;
		default:
			bgColor = colors.primary;
	}

	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			type={type}
			bgColor={bgColor}
			color={colors.white}
			title={title}
		>
			{children}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary', 'success']),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	title: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	onClick: () => {},
	title: '',
};

export default Button;
