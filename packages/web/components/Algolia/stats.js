import React from 'react';
import styled from 'styled-components';

import { Stats as AlgoliaStats } from 'react-instantsearch-dom';
import { useTranslation } from 'react-i18next';

const Stats = () => {
	const { t } = useTranslation(['search', 'common']);

	return (
		<StyledStats
			translations={{
				stats(nbHits) {
					return t('resultsFound', { nbHits });
				},
			}}
		/>
	);
};

const StyledStats = styled(AlgoliaStats)`
	flex: 1;

	span {
		font-size: 1.4rem;
		color: ${({ theme }) => theme.colors.darkGray};
	}
`;

export default Stats;
