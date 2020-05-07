import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ToggleRefinement as AlgoliaToggleRefinement } from 'react-instantsearch-dom';

const ToggleRefinement = ({ attribute, label, value }) => (
	<StyledToggleRefinement attribute={attribute} label={label} value={value} />
);

ToggleRefinement.propTypes = {
	attribute: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
};

const StyledToggleRefinement = styled(AlgoliaToggleRefinement)`
	.ais-ToggleRefinement {
		&-label {
			display: flex;
			align-items: center;
		}

		&-checkbox {
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			height: 2rem;
			width: 2rem;
			margin-right: 2rem;
		}

		&-labelText {
			font-size: 1.8rem;
			margin-right: 1.5rem;
			color: ${({ theme }) => theme.colors.darkGray};
		}
	}
`;

export default ToggleRefinement;
