/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputFieldWrapper, InputLabel, InputError } from './styles';

const StyledInput = styled.input`
	width: 100%;
	height: 4.4rem;
	font: 1em sans-serif;
	margin: 0.5rem 0;
	padding: 1.2rem;
	background: white;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.2rem;
	color: ${({ theme }) => theme.colors.lightGray};
`;

const InputField = ({ name, form, type, label, validation, ...inputProps }) => {
	const { register, errors } = form;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<StyledInput
				id={name}
				type={type}
				name={name}
				aria-label={label}
				aria-required={validation.required}
				ref={register(validation)}
				{...inputProps}
			/>

			<InputError>{errors[name]?.message}</InputError>
		</InputFieldWrapper>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	form: PropTypes.shape({
		register: PropTypes.func,
		errors: PropTypes.shape({}),
	}).isRequired,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
};

InputField.defaultProps = {
	type: 'text',
	validation: {},
};

export default InputField;
