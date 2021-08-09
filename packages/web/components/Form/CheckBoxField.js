/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledCheckBoxMark = styled.span`
	${({ theme: { colors } }) => css`
		display: inline-block;
		position: relative;
		margin: -1px 0px 0 0;
		margin-right: 8px;
		vertical-align: middle;
		background: ${colors.white};
		border: 1px solid ${colors.mediumGray};
		border-radius: 0.2rem;
		cursor: pointer;
	`}
`;

const StyledCheckBoxInput = styled.input`
	width: 0px;
	height: 0px;
	position: relative;
`;

const checkboxVariants = {
	default: ({ colors }) => css`
		${StyledCheckBoxMark} {
			width: 2.5rem;
			height: 2.5rem;
		}

		& ${StyledCheckBoxInput}:checked + ${StyledCheckBoxMark}:before {
			top: 16%;
			height: 1.2rem;
			width: 0.7rem;
			border-bottom: 3px solid ${colors.white};
			border-right: 3px solid ${colors.white};
		}
	`,
	rounded: ({ colors }) => css`
		${StyledCheckBoxMark} {
			width: 2rem;
			height: 2rem;
		}

		& ${StyledCheckBoxInput}:checked + ${StyledCheckBoxMark}:before {
			top: 15%;
			height: 0.9rem;
			width: 0.6rem;
			border-bottom: 2px solid ${colors.white};
			border-right: 2px solid ${colors.white};
		}
	`,
};

const StyledCheckBox = styled.div`
	${({ theme: { colors }, noPadding, variant }) => css`
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: ${!noPadding ? '1rem' : '0'};
		font: 1.2rem;

		& ${StyledCheckBoxInput}:checked + ${StyledCheckBoxMark} {
			background: ${colors.blue} -19px top no-repeat;
			border-color: ${colors.blue};

			&:before {
				content: '';
				position: absolute;
				top: 16%;
				right: 34%;
				display: inline-block;
				transform: rotate(45deg);
			}
		}

		${checkboxVariants[variant]({ colors })}
	`}
`;

const StyledCheckBoxLabel = styled.label`
	width: 100%;
	color: ${({ theme }) => theme.colors.lightGray};
	cursor: pointer;

	a {
		color: ${({ theme }) => theme.colors.secondary};
		padding: 0 !important;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: ${({ theme }) => theme.colors.darkGreen};
		}
	}
`;

const CheckBoxField = ({ name, value, label, required, onChange, noPadding, variant, ...rest }) => {
	const handleOnChange = () => onChange((oldValue) => !oldValue);
	return (
		<StyledCheckBox noPadding={noPadding} variant={variant}>
			<StyledCheckBoxInput
				id={name}
				name={name}
				type="checkbox"
				aria-label={label}
				aria-required={required}
				required={required}
				checked={value}
				onChange={handleOnChange}
				{...rest}
			/>
			<StyledCheckBoxMark
				onClick={handleOnChange}
				role="checkbox"
				aria-label={label}
				aria-required={required}
				aria-checked={value}
				tabindex="0"
			/>
			<StyledCheckBoxLabel htmlFor={name}>{label}</StyledCheckBoxLabel>
		</StyledCheckBox>
	);
};
CheckBoxField.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	required: PropTypes.bool,
	onChange: PropTypes.func,
	noPadding: PropTypes.bool,
	variant: PropTypes.oneOf(['default', 'rounded']),
};

CheckBoxField.defaultProps = {
	value: false,
	label: '',
	required: false,
	onChange: () => {},
	noPadding: false,
	variant: 'default',
};

export default CheckBoxField;
