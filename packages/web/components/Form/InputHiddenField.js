/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HiddenInput = styled.input``;

const InputHiddenField = ({ name, form, ...inputProps }) => {
	const { register } = form;
	return <HiddenInput id={name} type="hidden" name={name} {...inputProps} {...register(name)} />;
};

InputHiddenField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.shape({
		register: PropTypes.func,
	}),
};

InputHiddenField.defaultProps = {
	form: {},
};

export default InputHiddenField;
