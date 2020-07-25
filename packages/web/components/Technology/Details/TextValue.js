import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextValue = ({ title = '', value }) => {
	return value ? (
		<Container>
			{!!title && <strong>{title}: </strong>}
			<span>{value}</span>
		</Container>
	) : null;
};

TextValue.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextValue.defaultProps = {
	title: '',
	value: '',
};

export const Container = styled.p`
	font-size: 1.6rem;
	line-height: 2.4rem;

	strong {
		color: ${({ theme: { colors } }) => colors.darkGray};
	}

	span {
		color: ${({ theme: { colors } }) => colors.black};
	}
`;

export default TextValue;
