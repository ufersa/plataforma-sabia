import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';

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

/**
 * A smart form component. Using this strategy instead of FormContext to not loose the
 * perfomance benefits of uncontrolled forms.
 *
 * @see https://react-hook-form.com/advanced-usage/#SmartFormComponent
 *
 * @returns {React.Element}
 */
export const Form = ({ onSubmit, children }) => {
	const methods = useForm();

	return (
		<StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
			{React.Children.map(children, (child) => {
				return child.props.name
					? React.cloneElement(child, {
							form: methods,
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
};

Form.defaultProps = {
	onSubmit: () => {},
};

export default Form;
