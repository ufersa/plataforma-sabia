/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { RectangularButton as StyledButton } from './styles';

const RectangularButton = forwardRef(
	(
		{
			children,
			colorVariant,
			variant,
			disabled,
			onClick,
			type,
			name,
			backgroundUrl,
			fullWidth,
			autoX,
			boxShadow,
			uppercase,
			boldText,
			...inputProps
		},
		ref,
	) => {
		return (
			<StyledButton
				colorVariant={colorVariant}
				variant={variant}
				disabled={disabled}
				onClick={onClick}
				type={type}
				name={name}
				backgroundUrl={backgroundUrl}
				fullWidth={fullWidth}
				autoX={autoX}
				boxShadow={boxShadow}
				ref={ref}
				uppercase={uppercase}
				boldText={boldText}
				{...inputProps}
			>
				{children}
			</StyledButton>
		);
	},
);

RectangularButton.propTypes = {
	children: PropTypes.node.isRequired,
	colorVariant: PropTypes.oneOf(['grey', 'red', 'orange', 'green', 'blue', 'silver']),
	variant: PropTypes.oneOf(['text', 'outlined', 'filled', 'backgroundImage', 'round']),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.string,
	name: PropTypes.string,
	backgroundUrl: PropTypes.string,
	fullWidth: PropTypes.bool,
	autoX: PropTypes.bool,
	boxShadow: PropTypes.bool,
	uppercase: PropTypes.bool,
	boldText: PropTypes.bool,
};

RectangularButton.defaultProps = {
	colorVariant: 'grey',
	variant: 'text',
	disabled: false,
	onClick: () => {},
	type: 'button',
	name: '',
	backgroundUrl: '',
	fullWidth: false,
	autoX: false,
	boxShadow: false,
	uppercase: false,
	boldText: false,
};

RectangularButton.displayName = 'RectangularButton';

export default RectangularButton;
