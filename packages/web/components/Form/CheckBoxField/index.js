import React from 'react';
import PropTypes from 'prop-types';
import { StyledCheckBox, StyledCheckBoxLabel, StyledCheckBoxInput } from './styles';

const CheckBoxField = ({ name, value, label, required, onChange }) => {
	const handleOnChange = () => onChange((oldValue) => !oldValue);
	return (
		<StyledCheckBox>
			<StyledCheckBoxInput
				id={name}
				name={name}
				type="checkbox"
				aria-label={label}
				aria-required={required}
				required={required}
				checked={value}
				onChange={handleOnChange}
			/>
			<StyledCheckBoxLabel>{label}</StyledCheckBoxLabel>
		</StyledCheckBox>
	);
};
CheckBoxField.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.bool,
	label: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

CheckBoxField.defaultProps = {
	value: false,
	label: '',
	required: false,
	onChange: () => {},
};
export default CheckBoxField;
