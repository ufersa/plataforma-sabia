import React from 'react';
import PropTypes from 'prop-types';

import { StyledInput } from './styles';

const InputField = ({ name, type, onChange, value, label, required }) => {
	const handleOnChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<StyledInput
				id={name}
				type={type}
				name={name}
				aria-label={label}
				aria-required={required}
				required={required}
				value={value}
				onChange={handleOnChange}
			/>
		</>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

InputField.defaultProps = {
	value: '',
	type: 'text',
	required: false,
	onChange: () => {},
};

export default InputField;
