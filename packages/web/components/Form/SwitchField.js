import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputLabel } from './styles';

const SWITCH_WIDTH = '80px';
const SWITCH_HEIGHT = '40px';

const SwitchContainer = styled.div`
	margin: 0.5rem 0 1rem 0;
`;

const SwitchInput = styled.input`
	height: 0;
	width: 0;
	visibility: hidden;

	&:checked + label > span {
		left: calc(100% - 2px);
		transform: translateX(-100%);
	}
`;

const SwitchLabel = styled.label`
	width: ${SWITCH_WIDTH};
	height: ${SWITCH_HEIGHT};
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: ${({ checked }) => (checked ? 'flex-start' : 'flex-end')};
	cursor: pointer;
	background: white;
	border-radius: ${SWITCH_WIDTH};
	border: 2px solid ${({ checked, theme }) => (checked ? theme.colors.green : theme.colors.blue)};
	position: relative;
	transition: color background-color 0.5s;

	> p {
		color: ${({ checked, theme }) => (checked ? theme.colors.green : theme.colors.blue)};
		padding: 0.5em;
		font-size: 0.8em;
		font-weight: 700;
		text-transform: uppercase;
	}

	> span {
		content: '';
		position: absolute;
		top: 1px;
		left: 2px;
		width: calc(${SWITCH_HEIGHT} - 6px);
		height: calc(${SWITCH_HEIGHT} - 6px);
		border-radius: calc(${SWITCH_HEIGHT} - 5px);
		transition: 0.2s;
		background: ${({ checked, theme }) => (checked ? theme.colors.green : theme.colors.blue)};
		box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
	}

	&:active span {
		width: calc(${SWITCH_HEIGHT} + 10px);
	}
`;

const SwitchField = ({ label, form, name, validation }) => {
	const { register, getValues } = form;

	const [checked, setChecked] = useState(false);

	return (
		<SwitchContainer>
			<InputLabel>{label}</InputLabel>
			<SwitchInput
				type="checkbox"
				id={name}
				name={name}
				onClick={() => {
					setChecked(getValues(name));
				}}
				ref={register(validation)}
			/>
			<SwitchLabel htmlFor={name} checked={checked}>
				<p>{checked ? 'Sim' : 'Não'}</p>
				<span />
			</SwitchLabel>
		</SwitchContainer>
	);
};

SwitchField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	form: PropTypes.shape({
		getValues: PropTypes.func,
		register: PropTypes.func,
	}).isRequired,
	/**
	 * @see https://react-hook-form.com/api#register
	 */
	validation: PropTypes.shape({}),
};

SwitchField.defaultProps = {
	label: '',
	validation: {},
};

export default SwitchField;
