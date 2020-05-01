import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Panel as AlgoliaPanel } from 'react-instantsearch-dom';

const Panel = ({ children, header }) => <StyledPanel header={header}>{children}</StyledPanel>;

Panel.propTypes = {
	children: PropTypes.node.isRequired,
	header: PropTypes.string.isRequired,
};

const StyledPanel = styled(AlgoliaPanel)`
	padding: 4rem 0;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray98};

	.ais-Panel-header {
		line-height: 1.6;
		font-weight: 500;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}
`;

export default Panel;
