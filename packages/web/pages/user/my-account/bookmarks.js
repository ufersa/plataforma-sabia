import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { FiEye, FiX } from 'react-icons/fi';
import { UserProfile } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import { getUserBookmarks } from '../../../services';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';
import { IconButton } from '../../../components/Button';
import { ORDERING as orderEnum } from '../../../utils/enums/api.enum';
import { STATUS as technologyStatusEnum } from '../../../utils/enums/technology.enums';
import EmptyScreen from '../../../components/EmptyScreen';

export const getTechnologyStatus = (value) =>
	({
		[technologyStatusEnum.DRAFT]: 'Rascunho',
		[technologyStatusEnum.PENDING]: 'Pendente',
		[technologyStatusEnum.IN_REVIEW]: 'Em revisão',
		[technologyStatusEnum.REQUESTED_CHANGES]: 'Mudanças solicitadas',
		[technologyStatusEnum.CHANGES_MADE]: 'Mudaças realizadas',
		[technologyStatusEnum.APPROVED]: 'Aprovada',
		[technologyStatusEnum.REJECTED]: 'Rejeitada',
		[technologyStatusEnum.PUBLISHED]: 'Publicada',
	}[value]);

const MyBookmarks = ({
	bookmarks,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentSort,
	sortOptions,
}) => {
	const { t } = useTranslation(['helper', 'account']);
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
	 * @param {string} sortBy Grid column to sort items.
	 * @param {('ASC'|'DESC')} order Sort order.
	 * @returns {Promise<boolean>} Next router push
	 */
	const handleSortBy = (sortBy, order = currentSort.order || orderEnum.ASC) => {
		const { pathname, query } = router;

		delete query.page;

		const shouldOrderAsc = order === orderEnum.DESC && currentSort.by !== sortBy;
		query.order = shouldOrderAsc ? orderEnum.ASC : order;
		query.sortBy = sortBy;

		return router.push({
			pathname,
			query,
		});
	};

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:titles.myBookmarks')}
					</Title>
					<MainContent>
						{bookmarks.length ? (
							<DataGrid
								data={bookmarks.map(({ id, title, status, slug }) => ({
									id,
									Título: title,
									Status: (
										<TechnologyStatus status={status}>
											{getTechnologyStatus(status)}
										</TechnologyStatus>
									),
									slug,
									Ações: (
										<TechnologyActions>
											<IconButton
												variant="gray"
												aria-label="Technology Details"
												// onClick={() => openModal()}
											>
												<FiEye />
											</IconButton>
											<IconButton
												variant="remove"
												aria-label="Unlike technology"
												disabled={status === technologyStatusEnum.REJECTED}
												// onClick={() => openModal()}
											>
												<FiX />
											</IconButton>
										</TechnologyActions>
									),
								}))}
								hideItemsByKey={['slug']}
								currentPage={currentPage}
								totalPages={totalPages}
								totalItems={totalItems}
								itemsPerPage={itemsPerPage}
								currentOrder={currentSort.order}
								sortOptions={sortOptions}
								handlePagination={handlePagination}
								handleSortBy={handleSortBy}
								rowLink="/t/:slug"
								enablePagination
							/>
						) : (
							<EmptyScreen message={t('account:messages.noBookmarksToShow')} />
						)}
					</MainContent>
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyBookmarks.propTypes = {
	bookmarks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

MyBookmarks.defaultProps = {
	currentSort: {},
};

MyBookmarks.getInitialProps = async (ctx) => {
	const { user, query } = ctx;

	const page = Number(query.page) || 1;
	const itemsPerPage = 5;
	const sortOptions = [
		{ value: 'id', label: 'Id' },
		{ value: 'title', label: 'Título' },
		{ value: 'status', label: 'Status' },
	];

	const { data: bookmarks = [], totalPages = 1, totalItems = 1 } = await getUserBookmarks(
		user.id,
		{
			...query,
			perPage: itemsPerPage,
			page,
		},
	);

	return {
		bookmarks,
		currentPage: page,
		totalPages,
		totalItems,
		itemsPerPage,
		currentSort: { by: query.sortBy, order: query.order },
		sortOptions,
	};
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

export const NoBookmarks = styled.span`
	color: ${({ theme }) => theme.colors.darkGray};
	font-size: 2rem;
`;

const statusModifiers = {
	[technologyStatusEnum.PUBLISHED]: (colors) => css`
		color: ${colors.secondary};
		&::before {
			background: ${colors.secondary};
		}
	`,
	[technologyStatusEnum.CHANGES_MADE]: (colors) => css`
		color: ${colors.lightGray2};
		&::before {
			background: ${colors.lightGray2};
		}
	`,
	[technologyStatusEnum.REJECTED]: (colors) => css`
		color: ${colors.red};
		&::before {
			background: ${colors.red};
		}
	`,
};

export const TechnologyStatus = styled.div`
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

		${!!status && statusModifiers[status]?.(colors)};
	`}
`;

export const TechnologyActions = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: center;
		> button:not(:last-child) {
			margin-right: 2.4rem;
		}
		svg {
			font-size: 1.4rem;
			stroke-width: 3;
		}
		@media screen and (max-width: ${screens.large}px) {
			justify-content: flex-start;
		}
	`}
`;

export default MyBookmarks;
