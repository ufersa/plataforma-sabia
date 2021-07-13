/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import styled, { css } from 'styled-components';
import { Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';
import { theme } from '../../styles';

const reactSelectStyles = {
	default: {
		container: (base) => ({
			...base,
			width: '100%',
		}),
		control: (base) => ({
			...base,
			minHeight: '4.4rem',
			borderRadius: '0.2rem',
		}),

		singleValue: (base) => ({
			...base,
			color: theme.colors.lightGray,
		}),
	},

	rounded: {
		container: (base) => ({
			...base,
			width: '100%',
		}),
		control: (base) => ({
			...base,
			minHeight: '4.4rem',
			borderRadius: `${theme.metrics.baseRadius}rem`,
		}),
		singleValue: (base) => ({
			...base,
			color: theme.colors.lightGray,
		}),
		indicatorSeparator: () => ({
			display: 'none',
		}),
		dropdownIndicator: (base) => ({
			...base,
			color: theme.colors.secondary,
		}),
	},

	gray: {
		container: (base) => ({
			...base,
			width: '100%',
		}),
		control: (base) => ({
			...base,
			backgroundColor: theme.colors.lightGray4,
			borderColor: theme.colors.lightGray4,
			minHeight: '4.4rem',
			borderRadius: `${theme.metrics.baseRadius}rem`,
		}),
		singleValue: (base) => ({
			...base,
			color: theme.colors.lightGray,
		}),
		indicatorSeparator: () => ({
			display: 'none',
		}),
		dropdownIndicator: (base) => ({
			...base,
			color: theme.colors.secondary,
		}),
	},
};

const styles = css`
	width: 100%;
	margin: 0.5rem 0;
	font-size: 1.4rem;
`;

const StyledSelect = styled(Select)`
	${styles}
`;
const StyledCreatable = styled(CreatableSelect)`
	${styles}
`;
const StyledAsync = styled(AsyncSelect)`
	${styles}
`;

const Hint = styled.span`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		margin-bottom: 1rem;
		display: inline-block;
	`}
`;

const SelectField = ({
	name,
	form,
	label,
	help,
	options,
	validation,
	creatable,
	onCreate,
	isMulti,
	callback,
	wrapperCss,
	variant,
	isHidden,
	isLoading,
	instanceId,
	isAsync,
	...selectProps
}) => {
	const { t } = useTranslation(['error']);
	const [needsUpdate, setNeedsUpdate] = useState(true);
	const [internalIsLoading, setInternalIsLoading] = useState(false);
	const [selectOptions, setSelectOptions] = useState(options);

	const { errors, control, watch, setValue, getValues } = form;

	let selectedValue = watch(name);
	if (selectedValue) {
		selectedValue = Array.isArray(selectedValue)
			? selectedValue.map((value) => `${value}`)
			: selectedValue;
		selectedValue = Array.isArray(selectedValue) && !isMulti ? selectedValue[0] : selectedValue;
		selectedValue =
			!Array.isArray(selectedValue) && typeof selectedValue !== 'object'
				? `${selectedValue}`
				: selectedValue;
	}

	/**
	 * Compares each option's label with each other in order to sort them later.
	 *
	 * @param {object} firstOption The first option
	 * @param {object} secondOption The second option
	 * @returns {number}
	 */
	function compareOptions(firstOption, secondOption) {
		const { label: firstLabel } = firstOption;
		const { label: secondLabel } = secondOption;

		return firstLabel.localeCompare(secondLabel);
	}

	// update the select options whenever options prop changes
	useEffect(() => {
		setSelectOptions(options.sort(compareOptions));
	}, [options]);

	/**
	 * React-select expects value to be in { value: '', label: '' } shape so we run a useEffect
	 * to ensure it's in the right format. This allows this component to be intialized just with the value.
	 */
	useEffect(() => {
		if (!needsUpdate) {
			return;
		}

		if (!options || options.length === 0) {
			return;
		}

		if (!selectedValue) {
			setNeedsUpdate(false);
			return;
		}

		if (isMulti) {
			setValue(
				name,
				selectedValue.map((value) => options.find((option) => option.value === value)),
			);
		} else if (typeof selectedValue === 'object') {
			setValue(
				name,
				options.find((option) => option.value === selectedValue.value),
			);
		} else {
			setValue(
				name,
				options.find((option) => option.value === selectedValue),
			);
		}

		setNeedsUpdate(false);
	}, [selectedValue, options, name, setValue, isMulti, needsUpdate]);

	/**
	 * Handles creating a new element in the select field.
	 *
	 * Only called if `creatable` is true.
	 *
	 * @param {string} inputValue The inserted input value.
	 *
	 */
	const onCreateOption = async (inputValue) => {
		setInternalIsLoading(true);
		const newOption = await onCreate(inputValue);
		setInternalIsLoading(false);
		setSelectOptions([...options, newOption]);

		const currentValue = getValues(name) || [];

		if (isMulti) {
			setValue(name, [...currentValue, newOption]);
		} else {
			setValue(name, newOption);
		}

		return newOption;
	};

	// eslint-disable-next-line no-nested-ternary
	const Component = creatable ? StyledCreatable : isAsync ? StyledAsync : StyledSelect;

	return (
		<InputFieldWrapper
			hasError={typeof errors[name] !== 'undefined'}
			customCss={wrapperCss}
			isHidden={isHidden}
		>
			{label && (
				<InputLabel htmlFor={name}>
					{label}
					{validation.required && <RequiredIndicator />}
				</InputLabel>
			)}
			<Row>
				<Controller
					as={Component}
					className="react-select-container"
					classNamePrefix="react-select"
					control={control}
					rules={validation}
					onChange={([selectedOption]) => {
						if (typeof callback === 'function') callback(selectedOption);
						return selectedOption;
					}}
					id={name}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					options={selectOptions}
					isMulti={isMulti}
					onCreateOption={creatable ? onCreateOption : null}
					isDisabled={internalIsLoading || isLoading || isHidden}
					isLoading={internalIsLoading || isLoading}
					styles={reactSelectStyles[variant]}
					instanceId={instanceId}
					{...selectProps}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{creatable && (
				<Hint>
					É possível adicionar novas opções neste campo. Basta digitar a opção e
					pressionar a tecla Enter.
				</Hint>
			)}
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
	onCreate: PropTypes.func,
	isMulti: PropTypes.bool,
	form: PropTypes.shape({
		errors: PropTypes.shape({}),
		control: PropTypes.shape({}),
		watch: PropTypes.func,
		setValue: PropTypes.func,
		getValues: PropTypes.func,
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
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	),
	callback: PropTypes.func,
	wrapperCss: PropTypes.arrayOf(PropTypes.string),
	variant: PropTypes.oneOf(['default', 'rounded', 'gray']),
	isHidden: PropTypes.bool,
	isLoading: PropTypes.bool,
	instanceId: PropTypes.string,
	isAsync: PropTypes.bool,
};

SelectField.defaultProps = {
	label: '',
	form: {},
	creatable: false,
	onCreate: () => {},
	isMulti: false,
	validation: {},
	options: [],
	help: null,
	callback: null,
	wrapperCss: [],
	variant: 'default',
	isHidden: false,
	isLoading: false,
	instanceId: '',
	isAsync: false,
};

export default SelectField;
