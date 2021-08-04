/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import useTranslation from 'next-translate/useTranslation';
import get from 'lodash.get';
import { Controller } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { InputFieldWrapper, InputLabel, InputError, Row, inputModifiers } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';

export const StyledInput = styled(MaskedInput)`
	${({ theme: { colors, metrics }, disabled, variant }) => css`
		width: 100%;
		height: 4.4rem;
		font-size: 1.4rem;
		margin: 0.5rem 0;
		padding: 1.2rem;
		background: ${colors.white};
		border: 1px solid ${colors.mediumGray};
		border-radius: 0.2rem;
		color: ${colors.lightGray};
		opacity: ${disabled ? 0.5 : 1};

		&::placeholder {
			color: ${colors.lightGray2};
			font-weight: 300;
			font-style: italic;
		}

		${!!variant && inputModifiers[variant]({ colors, metrics })}
	`}
`;

/**
 * This component works as a maskd input field. You SHOULD provide mask, pattern and name to the component.
 *
 * @param {string} mask Mask to be applied (e.g: 99999-999)
 * @typedef {RegExp} pattern Regex pattern to validate the field when it is submitted
 * @returns {React.Component} An InputField instance.
 */
const MaskedInputField = ({
	mask,
	pattern,
	name,
	alwaysShowMask,
	defaultValue,
	label,
	help,
	form,
	validation,
	placeholder,
	wrapperCss,
	variant,
	...inputProps
}) => {
	const { t } = useTranslation(['error']);
	const {
		formState: { errors },
		control,
	} = form;
	const errorObject = get(errors, name);

	return (
		<InputFieldWrapper hasError={typeof errorObject !== 'undefined'} customCss={wrapperCss}>
			{label && (
				<InputLabel htmlFor={name}>
					{label} {validation.required && <RequiredIndicator />}
				</InputLabel>
			)}
			<Row>
				<Controller
					render={({ field }) => (
						<StyledInput
							mask={mask}
							type="text"
							placeholder={
								!label && validation.required ? `${placeholder} *` : placeholder
							}
							aria-label={label}
							aria-required={validation.required}
							alwaysShowMask={alwaysShowMask}
							variant={variant}
							{...field}
							{...inputProps}
						/>
					)}
					control={control}
					name={name}
					id={name}
					defaultValue={String(defaultValue)}
					rules={{
						...validation,
						pattern: {
							value: pattern,
							message: t('error:invalidPattern'),
						},
					}}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{errors && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</InputFieldWrapper>
	);
};

MaskedInputField.propTypes = {
	mask: PropTypes.string.isRequired,
	pattern: PropTypes.instanceOf(RegExp).isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	alwaysShowMask: PropTypes.bool,
	label: PropTypes.string,
	help: PropTypes.node,
	placeholder: PropTypes.string,
	form: PropTypes.shape({
		formState: PropTypes.shape({ errors: PropTypes.shape({}) }),
		control: PropTypes.shape({}),
	}),
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	wrapperCss: PropTypes.arrayOf(PropTypes.string),
	variant: PropTypes.oneOf(['default', 'gray', 'rounded']),
};

MaskedInputField.defaultProps = {
	defaultValue: '',
	alwaysShowMask: false,
	label: '',
	help: null,
	validation: {},
	form: {},
	placeholder: '',
	wrapperCss: [],
	variant: 'default',
};

export default MaskedInputField;
