/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';

export const StyledTextArea = styled.textarea`
	width: 100%;
	height: 12rem;
	font-size: 1.4rem;
	margin: 0.5rem 0;
	padding: 1rem;
	background: white;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.colors.lightGray};
`;

const TextField = ({ name, label, form, help, validation, ...inputProps }) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<Row>
				<StyledTextArea
					id={name}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					{...inputProps}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			<InputError>{validationErrorMessage(errors, name, t)}</InputError>
		</InputFieldWrapper>
	);
};

TextField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
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

TextField.defaultProps = {
	form: {},
	validation: {},
	help: null,
};

export default TextField;
