/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { RectangularButton as StyledButton, LoaderWrapper, ButtonWrapper } from './styles';

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
			isLoading,
			...inputProps
		},
		ref,
	) => {
		return (
			<ButtonWrapper>
				<StyledButton
					colorVariant={colorVariant}
					variant={variant}
					disabled={disabled || isLoading}
					onClick={onClick}
					type={type}
					name={name}
					backgroundUrl={backgroundUrl}
					fullWidth={fullWidth}
					autoX={autoX}
					boxShadow={boxShadow}
					ref={ref}
					{...inputProps}
				>
					{children}
				</StyledButton>
				{isLoading && (
					<LoaderWrapper buttonColorVariant={colorVariant}>
						<ScaleLoader />
					</LoaderWrapper>
				)}
			</ButtonWrapper>
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
	isLoading: PropTypes.bool,
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
	isLoading: false,
};

RectangularButton.displayName = 'RectangularButton';

export default RectangularButton;
