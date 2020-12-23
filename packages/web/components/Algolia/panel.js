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
		border-bottom: 0.1rem solid ${colors.gray98};

		.ais-Panel-header {
			color: ${colors.darkGreen};
			line-height: 1.6;
			font-weight: 500;
			text-transform: uppercase;
			margin-bottom: 1rem;
		}

		@media (max-width: ${screens.large}px) {
			padding: 2rem 0;
		}
	`}
`;

export default Panel;
