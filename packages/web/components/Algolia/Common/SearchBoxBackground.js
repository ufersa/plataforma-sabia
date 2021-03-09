import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const SearchBoxBackground = ({ children, secondary }) => (
	<SearchBoxWrapper secondary={secondary}>
		<Container secondary={secondary}>{children}</Container>
	</SearchBoxWrapper>
);

SearchBoxBackground.propTypes = {
	children: PropTypes.node.isRequired,
	secondary: PropTypes.bool,
};

SearchBoxBackground.defaultProps = {
	secondary: false,
};

const SearchBoxWrapper = styled.div`
	${({ theme: { colors }, secondary }) => css`
		background-color: transparent;
		flex: 1;
		position: relative;

		${!secondary &&
			css`
				background-color: ${colors.secondary};
				background-image: url(/pattern.png);
				background-size: auto 8.8rem;
				background-repeat: no-repeat;
				background-position: right center;
			`}

		&:before {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: linear-gradient(
				90deg,
				${colors.secondary} 80.8%,
				${colors.lightGreen} 100%
			);
		}
	`}
`;

const Container = styled.div`
	${({ theme: { screens }, secondary }) => css`
		display: flex;
		align-items: center;
		margin: 0 auto;

		${!secondary &&
			css`
				height: 8.8rem;
				padding: 1.6rem;
				padding-left: 2rem;
				max-width: 1440px;

				@media screen and (min-width: ${screens.medium}px) {
					padding-left: 4rem;
				}
			`}
	`}
`;

export default SearchBoxBackground;
