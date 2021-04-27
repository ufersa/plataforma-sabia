/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { InputLabel, InputError, Row } from './styles';
import Help from './Help';
import RequiredIndicator from './Required/Indicator';
import { validationErrorMessage } from '../../utils/helper';

const RadioContainer = styled.div`
	${InputLabel} {
		display: flex;
		align-items: center;
	}
`;

const RadioWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		margin-right: 4.2rem;
		margin-bottom: 1.2rem;
		position: relative;

		input:checked + label .marker {
			border: 1px solid ${colors.secondary};
			background-color: ${colors.secondary};
			> div {
				background: ${colors.whiteSmoke};
			}
		}

		:focus-within {
			> label .marker {
				box-shadow: 0px 0px 4px 2px ${colors.primary};
			}
		}
	`}
`;

const RadioInput = styled.input`
	margin-right: 1.2rem;
	appearance: none;
	position: absolute;
`;

const RadioLabel = styled.label`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		color: ${colors.lightGray};
		font-size: 1.4rem;
		font-weight: 700;
		line-height: 2.1rem;

		.marker {
			display: flex;
			margin-right: 1.2rem;
			width: 2.2rem;
			height: 2.2rem;
			border-radius: 50%;
			border: 1px solid ${colors.lightGray3};
			background: ${colors.whiteSmoke};

			> div {
				margin: auto;
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
			}
		}
	`}
`;

const RadioField = ({
	label,
	form,
	name,
	help,
	validation,
	options,
	flexDirection,
	alignItems,
	...radioProps
}) => {
	const { t } = useTranslation(['error']);
	const { register, errors } = form;

	return (
		<RadioContainer>
			<InputLabel>
				{label}
				{validation.required && <RequiredIndicator />}
				{help && <Help id={name} label={label} HelpComponent={help} />}
			</InputLabel>
			<Row flexDirection={flexDirection} alignItems={alignItems}>
				{options.map((option) => (
					<RadioWrapper key={option.label}>
						<RadioInput
							type="radio"
							id={`${name}_${option.label}`}
							name={name}
							ref={register(validation)}
							value={option.value}
							{...radioProps}
						/>
						<RadioLabel htmlFor={`${name}_${option.label}`}>
							<div className="marker">
								<div />
							</div>
							{option.label}
						</RadioLabel>
					</RadioWrapper>
				))}
			</Row>
			{errors && Object.keys(errors).length ? (
				<InputError>{validationErrorMessage(errors, name, t)}</InputError>
			) : null}
		</RadioContainer>
	);
};

RadioField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	help: PropTypes.node,
	form: PropTypes.shape({
		getValues: PropTypes.func,
		register: PropTypes.func,
		watch: PropTypes.func,
		errors: PropTypes.shape({}),
	}),
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({
		required: PropTypes.bool,
	}),
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	flexDirection: PropTypes.string,
	alignItems: PropTypes.string,
};

RadioField.defaultProps = {
	form: {},
	label: '',
	help: null,
	validation: {},
	flexDirection: 'row',
	alignItems: 'flex-end',
};

export default RadioField;
