/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const StyledInput = styled(Select)`
	margin: 1rem 0;
`;
const SelectField = ({ name, type, label, options, validation, ...selectProps }) => {
	const { register, errors, setValue } = useFormContext();
	const [values, setReactSelectValue] = useState([]);

	useEffect(() => {
		register({ name, ...validation });
	}, [register, name, validation]);

	const handleChange = (selectedOption) => {
		const selected = Array.isArray(selectedOption)
			? selectedOption.map((s) => s.value)
			: selectedOption.value;

		setValue(name, selected);
		setReactSelectValue(selected);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>

			<StyledInput
				id={name}
				name={name}
				aria-label={label}
				aria-required={validation.required}
				required={validation.required}
				options={options}
				value={values.selectedOption}
				onChange={handleChange}
				{...selectProps}
			/>
			<span>{errors[name]?.message}</span>
		</div>
	);
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		}),
	),
};

SelectField.defaultProps = {
	type: 'text',
	validation: {},
	options: [],
};

export default SelectField;
