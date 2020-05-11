/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled, { css } from 'styled-components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError } from './styles';
import { validationErrorMessage } from '../../utils/helper';

const styles = css`
	margin: 1rem 0;
`;

const StyledSelect = styled(Select)`
	${styles}
`;
const StyledCreatable = styled(CreatableSelect)`
	${styles}
`;

const SelectField = ({ name, form, label, options, validation, creatable, ...selectProps }) => {
	const { t } = useTranslation(['error']);
	const { errors, control } = form;

	const Component = creatable ? StyledCreatable : StyledSelect;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<Controller
				as={Component}
				className="react-select-container"
				classNamePrefix="react-select"
				control={control}
				rules={validation}
				onChange={([selectedOption]) => selectedOption}
				id={name}
				name={name}
				aria-label={label}
				aria-required={validation.required}
				options={options}
				{...selectProps}
			/>
			<InputError>{validationErrorMessage(errors[name], t)}</InputError>
		</InputFieldWrapper>
	);
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	creatable: PropTypes.bool,
	form: PropTypes.shape({
		errors: PropTypes.shape({}),
		control: PropTypes.shape({}),
	}).isRequired,
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
};

SelectField.defaultProps = {
	creatable: false,
	validation: {},
	options: [],
};

export default SelectField;
