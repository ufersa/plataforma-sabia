import React from 'react';
import PropTypes from 'prop-types';

import { StyledForm } from './styles';

const Form = ({ onSubmit, children }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit();
	};
	return <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>;
};

Form.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
	onSubmit: PropTypes.func,
};

Form.defaultProps = {
	onSubmit: () => {},
};

export default Form;
