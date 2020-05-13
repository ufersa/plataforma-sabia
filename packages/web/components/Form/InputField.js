/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { StyledInput, Styledicon, ContentInput } from './styles';

const sanitize = ({ disabled }) => ({ disabled });
const InputField = ({
	name,
	type,
	onChange,
	value,
	label,
	placeholder,
	icon,
	required,
	...inputProps
}) => {
	const handleOnChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<ContentInput>
				{icon() && <Styledicon>{icon()}</Styledicon>}
				<StyledInput
					icon={icon()}
					id={name}
					type={type}
					name={name}
					aria-label={label}
					aria-required={required}
					required={required}
					value={value}
					placeholder={placeholder}
					{...sanitize(inputProps)}
					onChange={handleOnChange}
				/>
			</ContentInput>
		</>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.func,
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
	label: '',
	placeholder: '',
	icon: () => false,
};

export default InputField;
