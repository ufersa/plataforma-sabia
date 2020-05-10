/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled, { css } from 'styled-components';

const styles = css`
	margin: 1rem 0;
`;

const StyledSelect = styled(Select)`
	${styles}
`;
const StyledCreatable = styled(CreatableSelect)`
	${styles}
`;

const SelectField = ({ name, form, label, options, validation, creatable, ...selectProps }) => {
	const { register, errors, setValue } = form;
	const [values, setReactSelectValue] = useState([]);
	const Component = creatable ? StyledCreatable : StyledSelect;

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

			<Component
				id={name}
				name={name}
				aria-label={label}
				aria-required={validation.required}
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
	creatable: PropTypes.bool,
	form: PropTypes.shape({
		errors: PropTypes.shape({}),
		setValue: PropTypes.func,
		register: PropTypes.func,
	}).isRequired,
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
	creatable: false,
	validation: {},
	options: [],
};

export default SelectField;
