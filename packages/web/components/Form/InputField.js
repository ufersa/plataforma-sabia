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
	font-size: 1.4rem;
	margin: 0.5rem 0;
	padding: 1.2rem;
	background: white;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.2rem;
	color: ${({ theme }) => theme.colors.lightGray};
`;

const InputField = ({ name, form, type, label, help, validation, ...inputProps }) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
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

			<InputError>{validationErrorMessage(errors[name], t)}</InputError>
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
