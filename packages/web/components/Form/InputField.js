/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';

const StyledInput = styled.input`
	width: 100%;
	height: 4.4rem;
	font-size: 1.2rem;
	margin: 0.5rem 0;
	padding: 1.2rem;
	background: white;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.2rem;
	color: ${({ theme }) => theme.colors.lightGray};

	&::placeholder {
		color: ${({ theme }) => theme.colors.lightGray2};
		font-weight: 300;
		font-style: italic;
	}
`;

const InputField = ({ name, form, type, label, help, validation, ...inputProps }) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;

	const fieldNameSplitted = name.split(/\[(.*?)\]\./);
	const isFieldAnArray = fieldNameSplitted.length > 1;

	const getHasError = () => {
		if (!isFieldAnArray) {
			return typeof errors[name] !== 'undefined';
		}
		const hasError =
			typeof errors[fieldNameSplitted[0]] !== 'undefined' &&
			typeof errors[fieldNameSplitted[0]] &&
			errors[fieldNameSplitted[0]][fieldNameSplitted[1]] &&
			errors[fieldNameSplitted[0]][fieldNameSplitted[1]][fieldNameSplitted[2]] !==
				'undefined';
		return hasError;
	};

	const getError = () => {
		if (!isFieldAnArray) {
			return errors[name];
		}
		const error =
			typeof errors[fieldNameSplitted[0]] !== 'undefined' &&
			typeof errors[fieldNameSplitted[0]] &&
			errors[fieldNameSplitted[0]][fieldNameSplitted[1]] &&
			errors[fieldNameSplitted[0]][fieldNameSplitted[1]][fieldNameSplitted[2]] !==
				'undefined';
		return error
			? errors[fieldNameSplitted[0]][fieldNameSplitted[1]][fieldNameSplitted[2]]
			: {};
	};

	return (
		<InputFieldWrapper hasError={getHasError()}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<Row>
				<StyledInput
					id={name}
					type={type}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					{...inputProps}
				/>
				{help && <Help id={name} HelpComponent={help} />}
			</Row>

			<InputError>{validationErrorMessage(getError(), t)}</InputError>
		</InputFieldWrapper>
	);
};

InputField.propTypes = {
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
};

InputField.defaultProps = {
	form: {},
	type: 'text',
	help: null,
	validation: {},
	label: '',
	placeholder: '',
	icon: () => false,
};

export default InputField;
