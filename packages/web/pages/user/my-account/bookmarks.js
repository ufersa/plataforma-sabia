import React from 'react';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import { getUserBookmarks } from '../../../services';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';
import bookmarksEnum from '../../../utils/enums/bookmarks.enum';

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
	const handleSortBy = (sortBy, order = currentSort.order || bookmarksEnum.ASC_ORDER) => {
		const { pathname, query } = router;

		delete query.page;

		const shouldOrderAsc = order === bookmarksEnum.DESC_ORDER && currentSort.by !== sortBy;
		query.order = shouldOrderAsc ? bookmarksEnum.ASC_ORDER : order;
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
								data={bookmarks.map(({ id, title, status }) => ({
									id,
									Título: title,
									Status: status,
								}))}
								currentPage={currentPage}
								totalPages={totalPages}
								totalItems={totalItems}
								itemsPerPage={itemsPerPage}
								currentOrder={currentSort.order}
								sortOptions={sortOptions}
								handlePagination={handlePagination}
								handleSortBy={handleSortBy}
								rowLink="/t/:id"
								enablePagination
							/>
						) : (
							<NoBookmarks>{t('account:messages.noBookmarksToShow')}</NoBookmarks>
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
	const { token } = cookies(ctx);
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
		token,
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
		namespacesRequired: ['helper', 'account', 'profile', 'datagrid'],
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

export default MyBookmarks;
