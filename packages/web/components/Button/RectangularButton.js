/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { RectangularButton as StyledButton } from './styles';

const RectangularButton = ({
	children,
	colorVariant,
	variant,
	disabled,
	onClick,
	type,
	name,
	...inputProps
}) => {
	return (
		<StyledButton
			colorVariant={colorVariant}
			variant={variant}
			disabled={disabled}
			onClick={onClick}
			type={type}
			name={name}
			{...inputProps}
		>
			{children}
		</StyledButton>
	);
};

RectangularButton.propTypes = {
	children: PropTypes.node.isRequired,
	colorVariant: PropTypes.oneOf(['grey', 'red', 'orange', 'green']),
	variant: PropTypes.oneOf(['text', 'outlined', 'filled']),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.string,
	name: PropTypes.string,
};

RectangularButton.defaultProps = {
	colorVariant: 'grey',
	variant: 'text',
	disabled: false,
	onClick: () => {},
	type: 'button',
	name: '',
};

export default RectangularButton;
