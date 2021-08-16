/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import get from 'lodash.get';
import styled, { css } from 'styled-components';
import { InputFieldWrapper, InputLabel, InputError, Row, inputModifiers } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';

const StyledNumberFormat = styled(NumberFormat)`
	${({ theme: { colors, metrics }, disabled, variant }) => css`
		width: 100%;
		height: 4.4rem;
		font-size: 1.4rem;
		margin: 0.5rem 0;
		padding: 1.2rem;
		background: ${colors.white};
		border: 1px solid ${colors.mediumGray};
		border-radius: 0.2rem;
		color: ${colors.lightGray};
		opacity: ${disabled ? 0.5 : 1};

		&::placeholder {
			color: ${colors.lightGray2};
			font-weight: 300;
			font-style: italic;
		}

		${!!variant && inputModifiers[variant]({ colors, metrics })}
	`}
`;

const currencySettings = {
	pt: {
		prefix: 'R$ ',
		thousandSeparator: '.',
		decimalSeparator: ',',
		pattern: /(?=.*\d)^(R\$\s)?(([1-9]\d{0,2}(\.\d{3})*)|0)?(,\d{1,2})?$/,
	},
	en: {
		prefix: '$ ',
		thousandSeparator: ',',
		decimalSeparator: '.',
		pattern: /(?=.*\d)^(\$\s)?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/,
	},
};

/**
 * This component implements a new type of input which looks like the default InputProps but is made to deal with currency masking only.
 * You SHOULD provide name and form to the component itself.
 *
 * @returns {React.Component} A CurrencyInputField instance wrapped by a RHF Controller.
 */
const CurrencyInputField = ({
	name,
	label,
	defaultValue,
	form,
	validation,
	help,
	variant,
	...inputProps
}) => {
	const { t, lang } = useTranslation(['error']);
	const { control, formState: { errors } = {} } = form;
	const errorObject = get(errors, name);
	const hasError = typeof errorObject !== 'undefined';

	const fullValidation = {
		...validation,
		pattern: {
			value: currencySettings[lang].pattern,
			message: t('error:invalidPattern'),
		},
	};

	return (
		<InputFieldWrapper hasError={hasError}>
			<InputLabel htmlFor={name}>
				{label} {validation.required && <RequiredIndicator />}
			</InputLabel>

			<Row>
				<Controller
					name={name}
					render={({ field }) => (
						<StyledNumberFormat
							id={name}
							prefix={currencySettings[lang].prefix}
							thousandSeparator={currencySettings[lang].thousandSeparator}
							decimalSeparator={currencySettings[lang].decimalSeparator}
							decimalScale={2}
							fixedDecimalScale
							aria-label={label}
							aria-required={validation.required}
							variant={variant}
							{...field}
							{...inputProps}
						/>
					)}
					rules={fullValidation}
					control={control}
					defaultValue={defaultValue || ''}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{hasError && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</InputFieldWrapper>
	);
};

CurrencyInputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultValue: PropTypes.string,
	form: PropTypes.shape({
		control: PropTypes.shape({}),
		register: PropTypes.func,
		formState: PropTypes.shape({ errors: PropTypes.shape({}) }),
	}),
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	help: PropTypes.node,
	variant: PropTypes.oneOf(['default', 'gray']),
};

CurrencyInputField.defaultProps = {
	defaultValue: '',
	label: '',
	form: {},
	validation: {},
	help: null,
	variant: 'default',
};

export default CurrencyInputField;
