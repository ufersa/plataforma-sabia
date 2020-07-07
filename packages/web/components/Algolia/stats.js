import React from 'react';
import styled from 'styled-components';

import { Stats as AlgoliaStats } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';

const Stats = () => {
	const { t } = useTranslation(['search']);

	return (
		<StyledStats
			translations={{
				stats(nbHits) {
					return t('search:resultsFound', { count: nbHits });
				},
			}}
		/>
	);
};

const StyledStats = styled(AlgoliaStats)`
	span {
		font-size: 1.6rem;
		color: ${({ theme }) => theme.colors.darkGray};
	}
`;

export default Stats;
