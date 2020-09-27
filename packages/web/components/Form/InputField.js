/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import get from 'lodash.get';
import { validationErrorMessage } from '@sabia/core';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import Help from './Help';

export const StyledInput = styled.input`
	${({ theme: { colors }, disabled }) => css`
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
	`}
`;

const InputField = ({ name, form, type, label, help, validation, ...inputProps }) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;
	const errorObject = get(errors, name);

	return (
		<InputFieldWrapper hasError={typeof errorObject !== 'undefined'}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<Row>
				<StyledInput
					id={name}
					type={type}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					{...inputProps}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{errors && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</InputFieldWrapper>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.func,
	type: PropTypes.string,
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
};

InputField.defaultProps = {
	form: {},
	type: 'text',
	help: null,
	validation: {},
	label: '',
	placeholder: '',
	icon: () => false,
};

export default InputField;
