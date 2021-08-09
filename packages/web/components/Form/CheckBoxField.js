/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { validationErrorMessage } from '../../utils/helper';
import { InputError } from './styles';

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
		flex-shrink: 0;
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

const StyledCheckBoxLabel = styled.label`
	${({ theme: { colors }, noPadding, variant }) => css`
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: ${!noPadding ? '1rem' : '0'};
		font: 1.2rem;
		cursor: pointer;

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

		a {
			color: ${({ theme }) => theme.colors.secondary};
			padding: 0 !important;
			transition: color 0.2s ease-in-out;

			&:hover {
				color: ${({ theme }) => theme.colors.darkGreen};
			}
		}

		${checkboxVariants[variant]({ colors })}
	`}
`;

const CheckboxWrapper = styled.div``;

const StyledError = styled(InputError)`
	font-size: 1.4rem;
	margin-top: 0.5rem;
`;

const CheckBoxField = ({
	name,
	value,
	label,
	required,
	onChange,
	noPadding,
	variant,
	form,
	validation,
	...rest
}) => {
	const { t } = useTranslation();
	const handleOnChangeNoForm = () => onChange((oldValue) => !oldValue);
	const {
		formState: { errors },
	} = form;

	return (
		<CheckboxWrapper>
			<StyledCheckBoxLabel noPadding={noPadding} variant={variant} htmlFor={name}>
				<StyledCheckBoxInput
					id={name}
					name={name}
					type="checkbox"
					aria-label={label}
					aria-required={required}
					required={required}
					onChange={handleOnChangeNoForm}
					{...(!form && { checked: !!value })}
					{...rest}
					{...((!!form && form.register(name, validation)) || {})}
				/>
				<StyledCheckBoxMark
					onClick={handleOnChangeNoForm}
					role="checkbox"
					aria-label={label}
					aria-required={required}
					aria-checked={value}
					tabindex="0"
				/>
				{label}
			</StyledCheckBoxLabel>
			{errors && Object.keys(errors).length ? (
				<StyledError>{validationErrorMessage(errors, name, t)}</StyledError>
			) : null}
		</CheckboxWrapper>
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
	form: PropTypes.shape({
		register: PropTypes.func,
		formState: PropTypes.shape({ errors: PropTypes.shape({}) }),
	}),
	validation: PropTypes.shape({}),
};

CheckBoxField.defaultProps = {
	value: false,
	label: '',
	required: false,
	onChange: () => {},
	noPadding: false,
	variant: 'default',
	form: null,
	validation: {},
};

export default CheckBoxField;
