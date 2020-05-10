import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useForm, FormContext } from 'react-hook-form';

const StyledForm = styled.form`
	margin: 1rem auto;
	padding: 2rem 1rem;
	width: 100%;
	button,
	a {
		padding-right: 3rem;
		padding-left: 3rem;
	}

	> label {
		width: 100%;
		display: block;
		font-weight: 700;
		font-size: 1.7rem;
	}
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;

	a[href] {
		align-self: center;
		padding: 0 1rem;
	}

	button {
		margin-top: 0.5rem;
	}
`;

export const Form = ({ onSubmit, children }) => {
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
