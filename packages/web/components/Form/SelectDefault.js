/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';

const StyledSelect = styled.select`
	width: 100%;
	height: 4.4rem;
	font-size: 1.4rem;
	padding: 1.2rem;
	margin: 0.5rem 0;
	background: white;
	border: 1px solid ${({ theme }) => theme.colors.mediumGray};
	border-radius: 0.2rem;
	color: ${({ theme }) => theme.colors.lightGray};
`;

const SelectField = ({
	name,
	form,
	label,
	help,
	options,
	validation,
	placeholder,
	...selectProps
}) => {
	const { t } = useTranslation(['error']);
	const { errors, register } = form;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<Row>
				<StyledSelect
					id={name}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					{...selectProps}
				>
					(<option value="">{placeholder || 'Selecione uma opção'}</option>)
					{options.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
				</StyledSelect>
				{help && <Help id={name} HelpComponent={help} />}
			</Row>
			{errors && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</InputFieldWrapper>
	);
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	form: PropTypes.shape({
		errors: PropTypes.shape({}),
		control: PropTypes.shape({}),
		register: PropTypes.func,
	}),
	help: PropTypes.node,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		}),
	),
	placeholder: PropTypes.string,
};

SelectField.defaultProps = {
	form: {},
	validation: {},
	options: [],
	help: null,
	placeholder: '',
};

export default SelectField;
