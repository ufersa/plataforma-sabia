/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';

const currencySettings = {
	BRL: {
		prefix: 'R$ ',
		thousandSeparator: '.',
		decimalSeparator: ',',
		pattern: /(?=.*\d)^(R\$\s)?(([1-9]\d{0,2}(\.\d{3})*)|0)?(,\d{1,2})?$/,
	},
	USD: {
		prefix: '$ ',
		thousandSeparator: ',',
		decimalSeparator: '.',
		pattern: /(?=.*\d)^(\$\s)?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/,
	},
};

/**
 * This component works as a wrapper: you can provide all of the props InputField component expects.
 * However, you SHOULD provide name to the component itself.
 *
 * @returns {React.Component} An InputField instance.
 */
const CurrencyInputField = ({ currency, name, defaultValue, ...inputFieldProps }) => {
	const { t } = useTranslation(['error']);
	const [value, setValue] = useState(defaultValue || '');

	return (
		<NumberFormat
			prefix={currencySettings[currency].prefix}
			thousandSeparator={currencySettings[currency].thousandSeparator}
			decimalSeparator={currencySettings[currency].decimalSeparator}
			onChange={(e) => setValue(e.target.value)}
			value={value}
			name={name}
			customInput={InputField}
			{...inputFieldProps}
			validation={{
				...inputFieldProps.validation,
				pattern: {
					value: currencySettings[currency].pattern,
					message: t('invalidPattern'),
				},
			}}
		/>
	);
};

CurrencyInputField.propTypes = {
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	currency: PropTypes.string,
};

CurrencyInputField.defaultProps = {
	defaultValue: '',
	currency: 'BRL',
};

export default CurrencyInputField;
