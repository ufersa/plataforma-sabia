import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import { CircularButton } from './styles';

const Button = ({ children, disabled, onClick, variant, type, title, small, float }) => {
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
			bgColor = colors.green;
			break;
		case 'info':
			bgColor = colors.lightBlue;
			break;
		case 'remove':
			bgColor = colors.lightGray3;
			break;
		default:
			bgColor = colors.primary;
	}

	return (
		<CircularButton
			onClick={onClick}
			disabled={disabled}
			type={type}
			bgColor={bgColor}
			color={colors.white}
			small={small}
			title={title}
			float={float}
		>
			{children}
		</CircularButton>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'remove']),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	title: PropTypes.string,
	float: PropTypes.string,
	small: PropTypes.bool,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	onClick: () => {},
	title: '',
	small: false,
	float: 'right',
};

export default Button;
