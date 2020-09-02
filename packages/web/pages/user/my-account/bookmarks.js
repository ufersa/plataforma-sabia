import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import { getUserBookmarks } from '../../../services';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';

const getTableHeaderValue = (key) =>
	({
		id: 'id',
		Título: 'title',
		Status: 'status',
	}[key]);

const MyBookmarks = ({
	bookmarks,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentSortBy,
	currentOrder,
}) => {
	const { t } = useTranslation(['helper', 'account']);
	const router = useRouter();

	const handlePagination = (page) => {
		const { pathname, query } = router;
		query.page = page;

		router.push({
			pathname,
			query,
		});
	};

	const handleOrder = (tableHeader) => {
		const { pathname, query } = router;
		const sortBy = getTableHeaderValue(tableHeader);
		query.sortBy = sortBy;

		if (currentSortBy && sortBy && currentSortBy === sortBy)
			if (currentOrder === 'DESC') query.order = 'ASC';
			else query.order = 'DESC';
		else query.order = 'ASC';

		router.push({
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
						{bookmarks.length > 0 ? (
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
								currentOrder={currentOrder}
								handlePagination={handlePagination}
								handleOrder={handleOrder}
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
	currentSortBy: PropTypes.string,
	currentOrder: PropTypes.string,
};

MyBookmarks.defaultProps = {
	currentSortBy: '',
	currentOrder: '',
};

MyBookmarks.getInitialProps = async (ctx) => {
	const { user, query } = ctx;
	const page = Number(query.page) || 1;
	const itemsPerPage = 5;

	const { data: bookmarks = [], totalPages = 1, totalItems = 1 } = await getUserBookmarks(
		user.id,
		{
			perPage: itemsPerPage,
			...query,
			page,
		},
	);

	return {
		bookmarks,
		currentPage: page,
		totalPages,
		totalItems,
		itemsPerPage,
		currentSortBy: query.sortBy,
		currentOrder: query.order,
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

		button {
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
