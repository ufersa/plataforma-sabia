/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { Link as NextLink } from '../../Link';

const styles = ({ $bgColor, $color, disabled, fullWidth }) => css`
	background-color: ${$bgColor};
	color: ${$color};
	border: none;
	font-size: 1.4rem;
	font-weight: bold;
	line-height: 2.4rem;
	text-transform: uppercase;
	padding: 0.8rem 7.7rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	width: ${fullWidth ? '100%' : 'auto'};
	box-shadow: 0 0.6rem 1.6rem 0 rgba(0, 0, 0, 0.15);
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}

	${disabled &&
		css`
			opacity: 0.8;
			cursor: not-allowed;
		`}
`;

export const StyledButton = styled.button`
	${styles}
`;

export const StyledNextLink = styled(NextLink)`
	${styles}
`;

export const StyledScrollLink = styled(ScrollLink)`
	${styles}
`;

const Button = ({
	children,
	disabled,
	onClick,
	variant,
	type,
	fullWidth,
	isLink,
	linkType,
	...rest
}) => {
	const { colors } = useTheme();
	const Link = isLink && linkType === 'default' ? StyledNextLink : StyledScrollLink;

	let bgColor;

	switch (variant) {
		case 'primary':
			bgColor = colors.primary;
			break;
		case 'secondary':
			bgColor = colors.secondary;
			break;
		default:
			bgColor = colors.primary;
	}

	return isLink ? (
		<Link $bgColor={bgColor} $color={colors.white} {...rest}>
			{children}
		</Link>
	) : (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			type={type}
			$bgColor={bgColor}
			$color={colors.white}
			fullWidth={fullWidth}
		>
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
	fullWidth: PropTypes.bool,
	isLink: PropTypes.bool,
	linkType: PropTypes.oneOf(['default', 'scroll']),
};

Button.defaultProps = {
	type: 'button',
	variant: 'primary',
	disabled: false,
	fullWidth: false,
	onClick: () => {},
	isLink: false,
	linkType: 'default',
};

export default Button;
