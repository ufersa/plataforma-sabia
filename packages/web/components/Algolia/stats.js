import React from 'react';
import styled from 'styled-components';

import { Stats as AlgoliaStats } from 'react-instantsearch-dom';

const Stats = () => (
	<StyledStats
		translations={{
			stats(nbHits) {
				return `${nbHits} soluções encontradas`;
			},
		}}
	/>
);

const StyledStats = styled(AlgoliaStats)`
	flex: 1;

	span {
		font-size: 1.4rem;
		color: ${({ theme }) => theme.colors.darkGray};
	}
`;

export default Stats;
