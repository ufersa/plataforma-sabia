import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from 'styled-components';
import StyledButton from './styles';

const Button = ({
	children,
	disabled,
	onClick,
	variant,
	type,
	title,
	uppercase,
	name,
	as,
	href,
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
			bgColor = colors.secondary;
			break;
		case 'info':
			bgColor = colors.blue;
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
			uppercase={uppercase}
			name={name}
			as={as}
			href={href}
		>
			{children}
		</StyledButton>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'info']),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	title: PropTypes.string,
	uppercase: PropTypes.bool,
	name: PropTypes.string,
	as: PropTypes.string,
	href: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	onClick: () => {},
	title: '',
	uppercase: true,
	name: '',
	as: 'button',
	href: undefined,
};

export default Button;
