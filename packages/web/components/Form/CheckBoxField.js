import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCheckBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 1rem;
	font: 1.2rem;
`;

const StyledCheckBoxInput = styled.input`
	width: 2.5rem;
	height: 2.5rem;
	margin: 0rem;
	margin: 0 0.5rem 0 0;
`;
const StyledCheckBoxLabel = styled.div`
	width: 100%;
	color: ${({ theme }) => theme.colors.lightGray};
`;

const CheckBoxField = ({ name, value, label, required, onChange }) => {
	const handleOnChange = () => onChange((oldValue) => !oldValue);
	return (
		<StyledCheckBox>
			<StyledCheckBoxInput
				id={name}
				name={name}
				type="checkbox"
				aria-label={label}
				aria-required={required}
				required={required}
				checked={value}
				onChange={handleOnChange}
			/>
			<StyledCheckBoxLabel>{label}</StyledCheckBoxLabel>
		</StyledCheckBox>
	);
};
CheckBoxField.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.bool,
	label: PropTypes.string,
	required: PropTypes.bool,
	onChange: PropTypes.func,
};

CheckBoxField.defaultProps = {
	value: false,
	label: '',
	required: false,
	onChange: () => {},
};

export default CheckBoxField;
