/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';

/**
 * This component works as a wrapper: uou can provide all of the props InputField component expects.
 * However, you SHOULD provide mask, pattern and name to the component itself.
 *
 * @param {string} mask Mask to be applied (e.g: 99999-999)
 * @typedef {RegExp} pattern Regex pattern to validate the field when it is submitted
 * @returns {React.Component} An InputField instance.
 */
const MaskedInputField = ({
	mask,
	pattern,
	name,
	alwaysShowMask,
	defaultValue,
	...inputFieldProps
}) => {
	const { t } = useTranslation(['error']);
	const [value, setValue] = useState(defaultValue || '');
	return (
		<MaskedInput
			mask={mask}
			alwaysShowMask={alwaysShowMask}
			onChange={(e) => setValue(e.target.value)}
			value={value}
			name={name}
		>
			{() => (
				<InputField
					name={name}
					{...inputFieldProps}
					validation={{
						...inputFieldProps.validation,
						pattern: {
							value: pattern,
							message: t('invalidPattern'),
						},
					}}
				/>
			)}
		</MaskedInput>
	);
};

MaskedInputField.propTypes = {
	mask: PropTypes.string.isRequired,
	pattern: PropTypes.instanceOf(RegExp).isRequired,
	name: PropTypes.string.isRequired,
	alwaysShowMask: PropTypes.bool,
	defaultValue: PropTypes.string,
};

MaskedInputField.defaultProps = {
	defaultValue: '',
	alwaysShowMask: false,
};

export default MaskedInputField;
