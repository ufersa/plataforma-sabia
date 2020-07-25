import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Description = ({ title, children }) => (
	<>
		{Children.count(children) > 1 && (
			<Container>
				<Title>
					<h4>{title}</h4>
				</Title>
				{children}
			</Container>
		)}
	</>
);

export const Container = styled.div`
	margin-left: 1rem;
	padding-bottom: 2rem;
`;

export const Title = styled.div`
	border-bottom: 4px solid ${({ theme: { colors } }) => colors.primary};
	width: calc(100% - 1rem);
	margin: 2rem 0;

	&:first-child {
		margin-top: 0;
	}

	h4 {
		display: inline-block;
		background-color: ${({ theme: { colors } }) => colors.primary};
		color: ${({ theme: { colors } }) => colors.white};
		padding: 2.5rem 3rem;
		font-weight: 600;
		font-size: 1.8rem;
		line-height: 1rem;
		text-transform: uppercase;
		margin-bottom: -4px;
	}
`;

Description.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Description;
