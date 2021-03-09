import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Panel as AlgoliaPanel } from 'react-instantsearch-dom';

const Panel = ({ children, header }) => <StyledPanel header={header}>{children}</StyledPanel>;

Panel.propTypes = {
	children: PropTypes.node.isRequired,
	header: PropTypes.string.isRequired,
};

const StyledPanel = styled(AlgoliaPanel)`
	${({ theme: { colors, screens } }) => css`
		padding: 3.2rem 0;
		border-bottom: 0.1rem solid ${colors.mediumGray};

		.ais-Panel-header {
			color: ${colors.lightGray2};
			font-size: 1.4rem;
			line-height: 2.4rem;
			font-weight: 700;
			text-transform: uppercase;
			margin-bottom: 0.4rem;
		}

		@media (max-width: ${screens.large}px) {
			padding: 2rem 0;
		}
	`}
`;

export default Panel;
