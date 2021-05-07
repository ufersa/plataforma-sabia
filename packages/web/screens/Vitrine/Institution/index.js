import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { algoliaDefaultConfig } from '../../../components/Algolia/provider';
import Head from '../../../components/head';
import { findResultsState, searchStateToURL, urlToSearchState } from '../../../utils/algoliaHelper';
import { getInstitution } from '../../../services';
import SolutionList from './SolutionList';
import * as S from './styles';

const InstitutionShowcasePage = ({ initialSearchState, resultsState, institution }) => {
	const [searchState, setSearchState] = useState(initialSearchState);
	const { t } = useTranslation(['pages']);

	const onSearchStateChange = (newSearchState) => {
		searchStateToURL(newSearchState);
		setSearchState(newSearchState);
	};

	return (
		<>
			<Head
				title={t('pages:showcase.show.title', { initials: institution.initials })}
				description={t('pages:showcase.show.description', {
					name: institution.name,
					initials: institution.initials,
				})}
				keywords={t('pages:showcase.show.keywords')}
				ogImage={institution.logo?.url}
			/>
			<S.Wrapper>
				<S.Background>
					<S.InstitutionInfos>
						<img
							src={institution.logo?.url || '/logo.svg'}
							alt="Institution thumbnail"
						/>

						<div>
							<h1>
								{institution.initials} - {institution.name}
							</h1>
							{!!institution.address && (
								<p>
									{institution.address}
									{institution.city ? `, ${institution.city}` : null}
									{institution.state ? ` - ${institution.state}` : null}
								</p>
							)}
							{!!institution.zipcode && <p>CEP: {institution.zipcode}</p>}
							{!!institution.phone_number && <p>Fone: {institution.phone_number}</p>}
							{!!institution.email && <p>Email: {institution.email}</p>}
							{!!institution.website && (
								<a
									href={institution.website}
									target="_blank"
									rel="noopener noreferrer"
								>
									{institution.website}
								</a>
							)}
						</div>
					</S.InstitutionInfos>
				</S.Background>
				<S.Background gray>
					<S.ListWrapper>
						<SolutionList
							indexName={algoliaDefaultConfig.technology.indexName}
							searchState={searchState}
							resultsState={resultsState}
							onSearchStateChange={onSearchStateChange}
							institutionId={institution.id}
						/>
					</S.ListWrapper>
				</S.Background>
			</S.Wrapper>
		</>
	);
};

InstitutionShowcasePage.propTypes = {
	initialSearchState: PropTypes.shape({}).isRequired,
	resultsState: PropTypes.shape({}).isRequired,
	institution: PropTypes.shape({
		id: PropTypes.number.isRequired,
		logo: PropTypes.oneOfType([
			PropTypes.shape({
				url: PropTypes.string,
			}),
		]),
		name: PropTypes.string.isRequired,
		initials: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		zipcode: PropTypes.string.isRequired,
		phone_number: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		website: PropTypes.string.isRequired,
	}).isRequired,
};

InstitutionShowcasePage.getInitialProps = async ({ query, res, asPath }) => {
	const institution = await getInstitution(query.institution);

	if (!institution) {
		return res.writeHead(302, { Location: '/_error.js' }).end();
	}

	const initialSearchState = urlToSearchState(asPath);
	const resultsState = await findResultsState(SolutionList, initialSearchState, 'technology', {
		institutionId: institution.id,
	});

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		initialSearchState,
		resultsState,
		institution,
	};
};

export default InstitutionShowcasePage;
