/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';

const textareaModifiers = {
	default: ({ colors, metrics }) => css`
		background: white;
		border: 1px solid ${colors.mediumGray};
		border-radius: ${metrics.baseRadius}rem;
		color: ${colors.lightGray};
	`,
	gray: ({ colors, metrics }) => css`
		background: ${colors.lightGray4};
		border: 1px solid ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
	`,
};

export const StyledTextArea = styled.textarea`
	${({ theme: { colors, metrics }, variant }) => css`
		width: 100%;
		height: 12rem;
		font-size: 1.4rem;
		margin: 0.5rem 0;
		padding: 1rem;

		${!!variant && textareaModifiers[variant]({ colors, metrics })}
	`}
`;

const TextField = ({ name, label, form, help, validation, wrapperCss, variant, ...inputProps }) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'} customCss={wrapperCss}>
			<InputLabel htmlFor={name}>
				{label}
				{validation.required && <RequiredIndicator />}
			</InputLabel>

			<Row>
				<StyledTextArea
					id={name}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					variant={variant}
					{...inputProps}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			<InputError>{validationErrorMessage(errors, name, t)}</InputError>
		</InputFieldWrapper>
	);
};

TextField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	form: PropTypes.shape({
		register: PropTypes.func,
		errors: PropTypes.shape({}),
	}),
	help: PropTypes.node,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	wrapperCss: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	variant: PropTypes.oneOf(['default', 'gray']),
};

TextField.defaultProps = {
	form: {},
	validation: {},
	help: null,
	wrapperCss: [],
	variant: 'default',
};

export default TextField;
