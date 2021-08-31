/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useForm } from 'react-hook-form';

const StyledForm = styled.form`
	${({ noMargin, noPadding }) => css`
		margin: ${!noMargin && '1rem auto'};
		padding: ${!noPadding && '2rem 1rem'};
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
	`}
`;

export const Actions = styled.div`
	display: flex;
	justify-content: ${({ center }) => (center ? 'center' : 'flex-end')};
	flex-direction: ${({ column }) => (column ? 'column' : 'row')};

	> a[href] {
		align-self: center;
		padding: 0 1rem;
	}

	> button {
		margin-top: 0.5rem;
		margin-left: ${({ column }) => (column ? 0 : 1.5)}rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		justify-content: center;

		> button {
			margin-left: 0;
		}
	}
`;

/**
 * A smart form component. Using this strategy instead of FormContext to not loose the
 * perfomance benefits of uncontrolled forms.
 *
 * @see https://react-hook-form.com/advanced-usage/#SmartFormComponent
 *
 * @returns {React.Element}
 */
export const Form = ({ onSubmit, children, defaultValues, noMargin, noPadding, ...rest }) => {
	const methods = useForm({ defaultValues, shouldUnregister: true });

	return (
		<StyledForm
			onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
			noMargin={noMargin}
			noPadding={noPadding}
			{...rest}
		>
			{React.Children.map(children, (child) => {
				return typeof child?.type === 'function'
					? React.cloneElement(child, {
							form: methods || {},
							key: child.props.name,
					  })
					: child;
			})}
		</StyledForm>
	);
};

Form.propTypes = {
	children: PropTypes.node.isRequired,
	onSubmit: PropTypes.func,
	defaultValues: PropTypes.shape({}),
	testId: PropTypes.string,
	noMargin: PropTypes.bool,
	noPadding: PropTypes.bool,
};

Form.defaultProps = {
	onSubmit: () => {},
	defaultValues: {},
	testId: '',
	noMargin: false,
	noPadding: false,
};

export default Form;
