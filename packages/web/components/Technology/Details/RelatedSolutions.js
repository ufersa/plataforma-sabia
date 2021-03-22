import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Hits, Configure, connectHits, connectStateResults } from 'react-instantsearch-dom';
import { SectionTitle } from '../../Common';
import { SolutionCard, SolutionsWrapper } from '../../SolutionsSection';
import { AlgoliaSearchProvider } from '../../Algolia';
import { algoliaDefaultConfig } from '../../Algolia/provider';
import { useTheme } from '../../../hooks';

const Results = connectStateResults(({ searchResults, type, current, onChange }) => {
	if (type && typeof searchResults?.nbHits !== 'undefined' && current !== searchResults?.nbHits) {
		onChange((old) => ({ ...old, [type]: searchResults?.nbHits }));
	}
	return null;
});

const RelatedSolutions = ({ technology }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const [searchLength, setSearchLength] = useState({
		technology: 0,
		service: 0,
	});

	const filters = useMemo(() => {
		const keywords = technology.keywords
			.map((keyword) => `keywords:${keyword.term}`)
			.join(' OR ');

		return keywords.length ? `NOT objectID:${technology.objectID} AND (${keywords})` : '';
	}, [technology.keywords, technology.objectID]);

	return (
		<>
			{(!!searchLength.technology || !!searchLength.service) && (
				<SectionTitle bgColor={colors.whiteSmoke} noMargin>
					{t('common:relatedSolutions')}
				</SectionTitle>
			)}

			<AlgoliaSearchProvider indexName={algoliaDefaultConfig.technology.indexName}>
				<Configure filters={filters} synonyms maxFacetHits={4} />
				<Results
					type="technology"
					current={searchLength.technology}
					onChange={setSearchLength}
				/>

				{!!searchLength.technology && (
					<SolutionsWrapper bgColor={colors.whiteSmoke} overwriteAlgoliaStyles>
						<Hits
							hitComponent={connectHits(({ hit }) => (
								<SolutionCard type="technology" data={hit} />
							))}
						/>
					</SolutionsWrapper>
				)}
			</AlgoliaSearchProvider>

			<AlgoliaSearchProvider indexName={algoliaDefaultConfig.service.indexName}>
				<Configure filters={filters} synonyms maxFacetHits={4} />
				<Results type="service" current={searchLength.service} onChange={setSearchLength} />

				{!!searchLength.service && (
					<SolutionsWrapper bgColor={colors.whiteSmoke} overwriteAlgoliaStyles>
						<Hits
							hitComponent={connectHits(({ hit }) => (
								<SolutionCard type="service" data={hit} />
							))}
						/>
					</SolutionsWrapper>
				)}
			</AlgoliaSearchProvider>
		</>
	);
};

RelatedSolutions.propTypes = {
	technology: PropTypes.shape({
		keywords: PropTypes.arrayOf(
			PropTypes.shape({
				term: PropTypes.string,
			}),
		),
		objectID: PropTypes.number,
	}).isRequired,
};

export default RelatedSolutions;
