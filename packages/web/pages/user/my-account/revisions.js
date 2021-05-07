import React from 'react';
import PropTypes from 'prop-types';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Container, MainContentContainer, MainContent, ReviewStatus } from './curate-technologies';
import { Protected } from '../../../components/Authorization';
import { ORDERING as orderEnum, ROLES as rolesEnum } from '../../../utils/enums/api.enum';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';
import { UserProfile } from '../../../components/UserProfile';
import { Title } from '../../../components/Common';
import { getTechnologiesToCurate } from '../../../services/technology';
import { DataGrid } from '../../../components/DataGrid';
import { dateToString } from '../../../utils/helper';
import EmptyScreen from '../../../components/EmptyScreen';
import { getCurationStatusText } from '../../../utils/technology';

const sortOptions = [
	{ value: 'title', label: 'Título' },
	{ value: 'status', label: 'Status' },
	{ value: 'updated_at', label: 'Última atualização' },
];

const statusToShow = [
	statusEnum.APPROVED,
	statusEnum.REJECTED,
	statusEnum.PUBLISHED,
	statusEnum.REQUESTED_CHANGES,
];

const Revisions = ({
	technologies,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentSort,
}) => {
	const { t } = useTranslation(['account']);
	const router = useRouter();

	/**
	 * Pushes new page number to next/router
	 *
	 * @param {string} page Page number.
	 */
	const handlePagination = (page) => {
		const { pathname, query } = router;
		query.page = page;

		router.push({
			pathname,
			query,
		});
	};

	/**
	 * Pushes new sort options to next/router
	 *
	 * @param {string} orderBy Grid column to sort items.
	 * @param {('ASC'|'DESC')} order Sort order.
	 * @returns {Promise<boolean>} Next router push
	 */
	const handleSortBy = (orderBy, order = currentSort.order || orderEnum.ASC) => {
		const { pathname, query } = router;

		delete query.page;

		const shouldOrderAsc = order === orderEnum.DESC && currentSort.by !== orderBy;
		query.order = shouldOrderAsc ? orderEnum.ASC : order;
		query.orderBy = orderBy;

		return router.push({
			pathname,
			query,
		});
	};

	return (
		<Container>
			<Protected userRole={rolesEnum.REVIEWER}>
				<UserProfile />
				<MainContentContainer>
					{technologies.length ? (
						<>
							<Title align="left" noPadding noMargin>
								{t('profile:revisionsHistory')}
							</Title>
							<MainContent>
								<DataGrid
									data={technologies.map((technology) => {
										const { id, title, status, updated_at } = technology;
										return {
											id,
											Título: title,
											Status: (
												<ReviewStatus status={status}>
													{getCurationStatusText(status)}
												</ReviewStatus>
											),
											'Última atualização': dateToString(updated_at),
										};
									})}
									hideItemsByKey={['id']}
									handlePagination={handlePagination}
									handleSortBy={handleSortBy}
									currentPage={currentPage}
									currentOrder={currentSort.order}
									totalPages={totalPages}
									totalItems={totalItems}
									itemsPerPage={itemsPerPage}
									sortOptions={sortOptions}
								/>
							</MainContent>
						</>
					) : (
						<EmptyScreen message={t('account:messages.noRevisionsToShow')} />
					)}
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

Revisions.getInitialProps = async (ctx) => {
	const itemsPerPage = 5;
	const { query } = ctx;
	const page = Number(query.page) || 1;

	const { technologies = [], totalPages = 1, totalItems = 1 } =
		(await getTechnologiesToCurate({
			...query,
			perPage: itemsPerPage,
			page,
			status: statusToShow.join(),
		})) || {};

	return {
		technologies,
		currentPage: page,
		totalPages,
		totalItems,
		itemsPerPage,
		currentSort: { by: query.orderBy, order: query.order },
	};
};

Revisions.propTypes = {
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	currentSort: PropTypes.shape({
		by: PropTypes.string,
		order: PropTypes.string,
	}),
};

Revisions.defaultProps = {
	currentSort: {},
};

export default Revisions;
