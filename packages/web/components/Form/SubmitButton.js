import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

const SubmitButton = ({ label }) => {
	return <StyledButton type="submit">{label} </StyledButton>;
};

SubmitButton.propTypes = {
	label: PropTypes.string.isRequired,
};

export default SubmitButton;
