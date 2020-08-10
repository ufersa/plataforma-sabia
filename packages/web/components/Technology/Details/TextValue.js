import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import List from './List';

const TextValue = ({ title, value }) => {
	if (!value) {
		return null;
	}

	return (
		<Container>
			{!!title && <strong>{title}: </strong>}
			{Array.isArray(value) ? <List itens={value} /> : <span>{value}</span>}
		</Container>
	);
};

TextValue.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
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
