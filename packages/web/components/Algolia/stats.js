import React from 'react';
import styled, { css } from 'styled-components';

import { Stats as AlgoliaStats } from 'react-instantsearch-dom';
import { useTranslation } from 'next-i18next';

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
	${({ theme: { colors } }) => css`
		span {
			font-size: 1.2rem;
			line-height: 1.6rem;
			color: ${colors.silver};
		}
	`}
`;

export default Stats;
