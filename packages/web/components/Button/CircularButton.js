import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import { CircularButton } from './styles';

const Button = ({
	children,
	disabled,
	onClick,
	variant,
	type,
	title,
	size,
	float,
	name,
	height,
	width,
}) => {
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
			size={size}
			title={title}
			float={float}
			name={name}
			height={height}
			width={width}
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
	size: PropTypes.string,
	name: PropTypes.string,
	height: PropTypes.string,
	width: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	onClick: () => {},
	title: '',
	size: 'small',
	float: 'right',
	name: '',
	height: null,
	width: null,
};

export default Button;
