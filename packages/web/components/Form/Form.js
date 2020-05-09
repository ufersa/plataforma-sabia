import React from 'react';
import PropTypes from 'prop-types';

import { useForm, FormContext } from 'react-hook-form';
import { StyledForm } from './styles';

const Form = ({ onSubmit, children }) => {
	const methods = useForm();

	return (
		<StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<FormContext {...methods}>{children}</FormContext>
		</StyledForm>
	);
};

Form.propTypes = {
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
};

Form.defaultProps = {
	onSubmit: () => {},
};

export default Form;
