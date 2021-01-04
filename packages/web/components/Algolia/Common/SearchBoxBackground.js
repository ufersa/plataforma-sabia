import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const SearchBoxBackground = ({ children }) => (
	<SearchBoxWrapper>
		<Container>{children}</Container>
	</SearchBoxWrapper>
);

SearchBoxBackground.propTypes = {
	children: PropTypes.node.isRequired,
};

const SearchBoxWrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.secondary};
		background-image: url(/pattern.png);
		background-size: auto 8.8rem;
		background-repeat: no-repeat;
		background-position: right center;
	`}
`;

const Container = styled.div`
	${({ theme: { screens } }) => css`
		height: 8.8rem;
		display: flex;
		align-items: center;
		padding: 1.6rem;
		padding-left: 2rem;
		max-width: 1440px;
		margin: 0 auto;

		@media screen and (min-width: ${screens.medium}px) {
			padding-left: 4rem;
		}
	`}
`;

export default SearchBoxBackground;
