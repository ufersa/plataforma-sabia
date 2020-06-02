import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SortBy as AlgoliaSortBy } from 'react-instantsearch-dom';

const SortBy = ({ defaultRefinement, items }) => (
	<StyledSortBy defaultRefinement={defaultRefinement} items={items} />
);

SortBy.propTypes = {
	defaultRefinement: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
		.isRequired,
};

const StyledSortBy = styled(AlgoliaSortBy)`
	select {
		font-size: 1.6rem;
		background: none;
		border: none;
		text-align-last: right;
	}
`;

export default SortBy;
