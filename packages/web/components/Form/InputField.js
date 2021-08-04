/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import get from 'lodash.get';
import { InputFieldWrapper, InputLabel, InputError, Row, StyledInput } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';

const InputField = ({
	id,
	name,
	form,
	type,
	label,
	help,
	validation,
	placeholder,
	labelPlacement,
	wrapperCss,
	variant,
	...inputProps
}) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;
	const errorObject = get(errors, name);

	return (
		<InputFieldWrapper
			hasError={typeof errorObject !== 'undefined'}
			labelPlacement={labelPlacement}
			customCss={wrapperCss}
		>
			{label && (
				<InputLabel htmlFor={id || name}>
					{label} {validation.required && <RequiredIndicator />}
				</InputLabel>
			)}

			<Row>
				<StyledInput
					id={id || name}
					type={type}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					placeholder={!label && validation.required ? `${placeholder} *` : placeholder}
					variant={variant}
					{...inputProps}
					{...register(name, validation)}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{errors && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</InputFieldWrapper>
	);
};

InputField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.func,
	type: PropTypes.string,
	form: PropTypes.shape({
		register: PropTypes.func,
		errors: PropTypes.shape({}),
	}),
	help: PropTypes.node,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	labelPlacement: PropTypes.string,
	wrapperCss: PropTypes.arrayOf(PropTypes.string),
	variant: PropTypes.oneOf(['default', 'gray', 'rounded']),
};

InputField.defaultProps = {
	id: '',
	form: {},
	type: 'text',
	help: null,
	validation: {},
	label: '',
	placeholder: '',
	icon: () => false,
	labelPlacement: 'top',
	wrapperCss: [],
	variant: 'default',
};

export default InputField;
