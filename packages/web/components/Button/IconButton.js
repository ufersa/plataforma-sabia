/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from './styles';

const Button = ({ children, variant, disabled, onClick, type, name, ...inputProps }) => (
	<IconButton
		variant={variant}
		disabled={disabled}
		onClick={onClick}
		type={type}
		name={name}
		{...inputProps}
	>
		{children}
	</IconButton>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['gray', 'info', 'remove']),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string,
};

Button.defaultProps = {
	type: 'button',
	variant: 'gray',
	disabled: false,
	onClick: () => {},
	name: '',
};

export default Button;
