import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TextValue = ({ title, value }) => {
	return value ? (
		<Container>
			{!!title && <strong>{title}: </strong>}
			<span>{value}</span>
		</Container>
	) : null;
};

TextValue.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
};

TextValue.defaultProps = {
	title: null,
	value: null,
};

export const Container = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.6rem;
		line-height: 2.4rem;

		strong {
			color: ${colors.darkGray};
		}

		span {
			color: ${colors.black};
		}
	`}
`;

export default TextValue;
