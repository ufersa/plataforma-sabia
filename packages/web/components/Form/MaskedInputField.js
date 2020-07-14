/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import InputField from './InputField';

const MaskedInputField = ({ mask, name, alwaysShowMask, defaultValue, ...inputFieldProps }) => {
	const [value, setValue] = useState(defaultValue || '');
	return (
		<MaskedInput
			mask={mask}
			alwaysShowMask={alwaysShowMask}
			onChange={(e) => setValue(e.target.value)}
			value={value}
			name={name}
		>
			{() => <InputField name={name} {...inputFieldProps} />}
		</MaskedInput>
	);
};

MaskedInputField.propTypes = {
	mask: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	alwaysShowMask: PropTypes.bool,
	defaultValue: PropTypes.string,
};

MaskedInputField.defaultProps = {
	defaultValue: '',
	alwaysShowMask: false,
};

export default MaskedInputField;
