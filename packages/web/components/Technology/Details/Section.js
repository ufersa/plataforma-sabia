import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Section = ({ title, children }) => {
	if (Children.count(children) <= 1) {
		return null;
	}

	return (
		<Container>
			<Title>
				<h4>{title}</h4>
			</Title>
			{children}
		</Container>
	);
};

export const Container = styled.div`
	margin-left: 1rem;
	padding: 2rem 0;
`;

export const Title = styled.div`
	${({ theme: { colors } }) => css`
		border-bottom: 4px solid ${colors.primary};
		width: calc(100% - 1rem);
		margin: 2rem 0;

		&:first-child {
			margin-top: 0;
		}

		h4 {
			display: inline-block;
			background-color: ${colors.primary};
			color: ${colors.white};
			padding: 2.5rem 3rem;
			font-weight: 600;
			font-size: 1.8rem;
			line-height: 2rem;
			text-transform: uppercase;
			margin-bottom: -4px;
		}
	`}
`;

Section.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Section;
