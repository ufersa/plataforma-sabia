/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useFormContext } from 'react-hook-form';
import { StyledInput } from './styles';

const sanitize = ({ disabled }) => ({ disabled });
const InputField = ({ name, type, label, validation, ...inputProps }) => {
	const { register, errors } = useFormContext();
	return (
		<div>
			<label htmlFor={name}>{label}</label>

			<StyledInput
				id={name}
				type={type}
				name={name}
				aria-label={label}
				aria-required={validation.required}
				required={validation.required}
				ref={register(validation)}
				{...sanitize(inputProps)}
			/>
			<span>{errors[name]?.message}</span>
		</div>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
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
