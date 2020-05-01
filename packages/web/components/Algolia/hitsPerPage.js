import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { HitsPerPage as AlgoliaHitsPerPage } from 'react-instantsearch-dom';

const HitsPerPage = ({ defaultRefinement, items }) => (
	<StyledHitsPerPage defaultRefinement={defaultRefinement} items={items} />
);

HitsPerPage.propTypes = {
	defaultRefinement: PropTypes.number.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }))
		.isRequired,
};

const StyledHitsPerPage = styled(AlgoliaHitsPerPage)`
	select {
		font-size: 1.6rem;
		background: none;
		border: none;
	}
`;

export default HitsPerPage;
