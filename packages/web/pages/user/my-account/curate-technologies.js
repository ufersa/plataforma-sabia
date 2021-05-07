import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { resetIdCounter } from 'react-tabs';
import { useRouter } from 'next/router';

import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';
import { dateToString } from '../../../utils/helper';
import { getTechnologiesToCurate } from '../../../services/technology';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';
import { ORDERING as orderEnum, ROLES as rolesEnum } from '../../../utils/enums/api.enum';
import { getCurationStatusText, statusReadyToCurate } from '../../../utils/technology';
import EmptyScreen from '../../../components/EmptyScreen';

const CurateTechnologies = ({
	technologies = [],
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentSort,
	sortOptions,
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
								{t('account:titles.curateTechnologies')}
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
											Ações: (
												<ReviewButton
													onClick={() =>
														router.push(
															`/user/my-account/curate-technology/${id}`,
														)
													}
													aria-label="Review technology"
												>
													Visualizar
												</ReviewButton>
											),
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
						<EmptyScreen message={t('account:messages.noTechsToReview')} />
					)}
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

CurateTechnologies.getInitialProps = async (ctx) => {
	resetIdCounter();
	const { query } = ctx;

	const page = Number(query.page) || 1;
	const itemsPerPage = 5;
	const sortOptions = [
		{ value: 'title', label: 'Título' },
		{ value: 'status', label: 'Status' },
		{ value: 'updated_at', label: 'Última atualização' },
	];

	const { technologies = [], totalPages = 1, totalItems = 1 } =
		(await getTechnologiesToCurate({
			...query,
			perPage: itemsPerPage,
			page,
			status: statusReadyToCurate.map((item) => item).join(),
		})) || {};

	return {
		technologies,
		currentPage: page,
		totalPages,
		totalItems,
		itemsPerPage,
		currentSort: { by: query.orderBy, order: query.order },
		sortOptions,
	};
};

CurateTechnologies.propTypes = {
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	currentSort: PropTypes.shape({
		by: PropTypes.string,
		order: PropTypes.string,
	}),
	sortOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		}),
	).isRequired,
};

CurateTechnologies.defaultProps = {
	currentSort: {},
};

export const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media screen and (max-width: 950px) {
		flex-direction: column;

		> section:first-child {
			margin-bottom: 1rem;
		}
	}
`;

export const MainContentContainer = styled.section`
	width: 100%;
`;

export const MainContent = styled.div`
	min-height: 80vh;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 2rem;
`;

export const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;

	@media screen and (max-width: 950px) {
		flex-direction: column;

		button {
			margin-bottom: 1rem;
		}
	}
`;

export const ReviewButton = styled.button`
	${({ theme: { colors } }) => css`
		background: none;
		border: none;
		max-width: fit-content;

		text-transform: uppercase;
		color: ${colors.secondary};
		font-size: 1.4rem;
		font-weight: 700;
		line-height: 2.4rem;
		padding: 0.5rem;
		text-align: left;

		&:hover,
		&:focus {
			outline: 2px solid ${colors.secondary};
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	`}
`;

const reviewStatusModifiers = {
	inReview: (colors) => css`
		color: ${colors.lightGray2};
		&::before {
			background: ${colors.lightGray2};
		}
	`,
	requestedChanges: (colors) => css`
		color: ${colors.primary};
		&::before {
			background: ${colors.primary};
		}
	`,
	changesMade: (colors) => css`
		color: ${colors.secondary};
		&::before {
			background: ${colors.secondary};
		}
	`,
	rejected: (colors) => css`
		color: ${colors.red};
		&::before {
			background: ${colors.red};
		}
	`,
	approved: (colors) => css`
		color: ${colors.secondary};
		&::before {
			background: ${colors.secondary};
		}
	`,
	published: (colors) => css`
		color: ${colors.darkGreen};
		&::before {
			background: ${colors.darkGreen};
		}
	`,
};

export const ReviewStatus = styled.span`
	${({ theme: { colors }, status }) => css`
		display: inline-block;
		position: relative;
		line-height: 2.4rem;
		font-weight: 500;
		padding: 0.2rem 0.8rem;
		max-width: fit-content;
		text-align: center;

		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 1.45rem;
			opacity: 0.1;
		}

		${status === statusEnum.IN_REVIEW && reviewStatusModifiers.inReview(colors)}
		${status === statusEnum.REQUESTED_CHANGES && reviewStatusModifiers.requestedChanges(colors)}
		${status === statusEnum.CHANGES_MADE && reviewStatusModifiers.changesMade(colors)}
		${status === statusEnum.REJECTED && reviewStatusModifiers.rejected(colors)}
		${status === statusEnum.APPROVED && reviewStatusModifiers.approved(colors)}
		${status === statusEnum.PUBLISHED && reviewStatusModifiers.published(colors)}
	`}
`;

export default CurateTechnologies;
