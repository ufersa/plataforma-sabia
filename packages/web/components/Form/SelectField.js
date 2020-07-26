/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled, { css } from 'styled-components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';

const styles = css`
	width: 100%;
	margin: 1rem 0;
	font-size: 1.4rem;
`;

const StyledSelect = styled(Select)`
	${styles}
`;
const StyledCreatable = styled(CreatableSelect)`
	${styles}
`;

const SelectField = ({
	name,
	form,
	label,
	help,
	options,
	validation,
	creatable,
	isMulti,
	...selectProps
}) => {
	const { t } = useTranslation(['error']);
	const [needsUpdate, setNeedsUpdate] = useState(true);

	const { errors, control, watch, setValue } = form;
	let selectedValue = watch(name);
	selectedValue = Array.isArray(selectedValue)
		? selectedValue.map((value) => `${value}`)
		: `${selectedValue}`;
	selectedValue = Array.isArray(selectedValue) && !isMulti ? selectedValue[0] : selectedValue;

	/**
	 * React-select expects value to be in { value: '', label: '' } shape so we run a useEffect
	 * to ensure it's in the right format. This allows this component to be intialized just with the value.
	 */
	useEffect(() => {
		if (!selectedValue || !needsUpdate || options.length === 0) {
			return;
		}

		if (isMulti) {
			setValue(
				name,
				selectedValue.map((value) => options.find((option) => option.value === value)),
			);
		} else {
			setValue(
				name,
				options.find((option) => option.value === selectedValue),
			);
		}

		setNeedsUpdate(false);
	}, [selectedValue, options, name, setValue, isMulti, needsUpdate]);

	const Component = creatable ? StyledCreatable : StyledSelect;

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'}>
			{label && <InputLabel htmlFor={name}>{label}</InputLabel>}
			<Row>
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
					isMulti={isMulti}
					{...selectProps}
				/>
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
	label: PropTypes.string,
	creatable: PropTypes.bool,
	isMulti: PropTypes.bool,
	form: PropTypes.shape({
		errors: PropTypes.shape({}),
		control: PropTypes.shape({}),
		watch: PropTypes.func,
		setValue: PropTypes.func,
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
};

SelectField.defaultProps = {
	label: '',
	form: {},
	creatable: false,
	isMulti: false,
	validation: {},
	options: [],
	help: null,
};

export default SelectField;
