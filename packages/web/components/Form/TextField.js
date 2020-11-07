/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputFieldWrapper, InputLabel, InputError, Row } from './styles';
import { validationErrorMessage } from '../../utils/helper';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';

const textareaModifiers = {
	default: ({ colors, metrics }) => css`
		background: white;
		border: 1px solid ${colors.mediumGray};
		border-radius: ${metrics.baseRadius}rem;
		color: ${colors.lightGray};
	`,
	gray: ({ colors, metrics }) => css`
		background: ${colors.lightGray4};
		border: 1px solid ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
	`,
};

export const StyledTextArea = styled.textarea`
	${({ theme: { colors, metrics }, variant }) => css`
		width: 100%;
		height: 12rem;
		font-size: 1.4rem;
		margin: 0.5rem 0;
		padding: 1rem;

		${!!variant && textareaModifiers[variant]({ colors, metrics })}
	`}
`;

export const CharCounter = styled.span`
	${({ theme: { colors }, counterColor }) => css`
		display: block;
		text-align: right;
		font-weight: 500;
		color: ${colors[counterColor]};
		margin: 0 0 1rem 0;
		font-size: 1.2rem;
	`}
`;

const TextField = ({
	name,
	label,
	form,
	help,
	validation,
	wrapperCss,
	variant,
	maxLength,
	percentChar,
	...inputProps
}) => {
	const { t } = useTranslation(['error']);
	const { register, errors, getValues } = form;
	const values = getValues();
	const [content, setContent] = useState(values[name]);
	const [counterColor, setCounterColor] = useState('lightGray2');

	const formatContent = useCallback(
		(text) => {
			if (text?.length > maxLength) {
				setContent(text.slice(0, maxLength));
			} else {
				setContent(text);
			}

			if (maxLength - text?.length === 0) {
				setCounterColor('red');
			} else if (maxLength - text?.length <= (maxLength * percentChar) / 100) {
				setCounterColor('darkOrange');
			} else {
				setCounterColor('lightGray2');
			}
		},
		[maxLength, percentChar],
	);

	useEffect(() => {
		formatContent(content);
	}, [content, formatContent]);

	return (
		<InputFieldWrapper hasError={typeof errors[name] !== 'undefined'} customCss={wrapperCss}>
			<InputLabel htmlFor={name}>
				{label}
				{validation.required && <RequiredIndicator />}
			</InputLabel>

			<Row>
				<StyledTextArea
					id={name}
					name={name}
					aria-label={label}
					aria-required={validation.required}
					ref={register(validation)}
					variant={variant}
					maxLength={maxLength}
					onChange={(e) => formatContent(e.target.value)}
					value={content}
					{...inputProps}
				/>
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</Row>
			{content && (
				<CharCounter
					counterColor={counterColor}
				>{`${content.length}/${maxLength}`}</CharCounter>
			)}
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
		getValues: PropTypes.func,
	}),
	help: PropTypes.node,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	}),
	wrapperCss: PropTypes.arrayOf(PropTypes.string),
	variant: PropTypes.oneOf(['default', 'gray']),
	maxLength: PropTypes.number,
	percentChar: PropTypes.number,
};

TextField.defaultProps = {
	form: {},
	validation: {},
	help: null,
	wrapperCss: [],
	variant: 'default',
	maxLength: 1000,
	percentChar: 5,
};

export default TextField;
