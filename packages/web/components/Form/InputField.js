/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

export const StyledInput = styled.input`
	width: 100%;
	height: 5rem;
	font: 1.2em sans-serif;
	margin: 0.5rem 0;
	padding: 1rem;
	background: none;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.colors.mediumGray};
`;

const sanitize = ({ disabled }) => ({ disabled });
const InputField = ({ name, type, label, validation, ...inputProps }) => {
	const {
		register,
		errors,
		formState: { dirty },
	} = useFormContext();

	/**
	 * @see https://react-hook-form.com/advanced-usage/#FormContextPerformance
	 */
	return useMemo(
		() => (
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
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dirty, label, type, name],
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
