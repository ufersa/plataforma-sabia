import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineReload } from 'react-icons/ai';

import { ClearRefinements as AlgoliaClearRefinements } from 'react-instantsearch-dom';

const ClearRefinements = ({ placeholder }) => (
	<StyledClearRefinements
		translations={{
			reset: (
				<>
					<AiOutlineReload />
					{placeholder}
				</>
			),
		}}
	/>
);

ClearRefinements.propTypes = {
	placeholder: PropTypes.string,
};

ClearRefinements.defaultProps = {
	placeholder: '',
};

const StyledClearRefinements = styled(AlgoliaClearRefinements)`
	font-size: 1.2rem;

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		background: none;
		border: 0;
	}

	svg {
		margin-right: 0.8rem;
	}

	.ais-ClearRefinements-button--disabled {
		cursor: not-allowed;
	}
`;

export default ClearRefinements;
