import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FiMessageSquare, FiEye, FiX } from 'react-icons/fi';
import { UserProfile } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';
import { IconButton } from '../../../components/Button';
import { ORDERING as orderEnum } from '../../../utils/enums/api.enum';
import { dateToString } from '../../../utils/helper';
import { getDealStatusText } from '../../../utils/technologyOrders';
import { STATUS as dealStatusEnum } from '../../../utils/enums/orders.enum';
import { useModal } from '../../../hooks';
import OrderMessages from '../../../components/OrderMessages';
import EmptyScreen from '../../../components/EmptyScreen';
import { getOrders } from '../../../services';

const sortOptions = [
	{ value: 'title', label: 'Título' },
	{ value: 'responsible', label: 'Responsável' },
	{ value: 'status', label: 'Status' },
	{ value: 'order_date', label: 'Data do pedido' },
];
const itemsPerPage = 5;

const getTechnologyDataGrid = (order, openModal, setCurrentOrder) => {
	const {
		id,
		status,
		created_at,
		technology: { title, users },
	} = order;

	const owner = users?.find((user) => user?.pivot?.role === 'OWNER');
	const orderType = 'technology';

	return {
		id,
		title,
		institution: owner.institution.initials,
		responsible: owner?.full_name,
		status: {
			status,
			content: getDealStatusText(status),
		},
		orderDate: dateToString(created_at),
		type: 'T',
		actions: [
			{
				variant: 'gray',
				ariaLabel: 'Order details',
				icon: FiEye,
				onClick: () => openModal('technologyOrderDetails', { id }),
			},
			{
				variant: 'info',
				ariaLabel: 'Send message to technology owner',
				icon: FiMessageSquare,
				onClick: () => setCurrentOrder({ ...order, owner }),
			},
			{
				variant: 'remove',
				ariaLabel: 'Cancel order',
				icon: FiX,
				onClick: () => openModal('cancelOrder', { id, orderType }),
				disabled:
					status === dealStatusEnum.DEAL_CANCELLED ||
					status === dealStatusEnum.DEAL_STRUCK,
			},
		],
	};
};

const getServiceDataGrid = (order, openModal, setCurrentOrder) => {
	const {
		id,
		status,
		created_at,
		service: { name, user },
	} = order;

	const orderType = 'service';

	return {
		id,
		title: name,
		institution: user.institution.initials,
		responsible: user.full_name,
		status: { status, content: getDealStatusText(status) },
		orderDate: dateToString(created_at),
		type: 'S',
		actions: [
			{
				variant: 'gray',
				ariaLabel: 'Order details',
				icon: FiEye,
				onClick: () => openModal('serviceOrderDetails', { id }),
			},
			{
				variant: 'info',
				ariaLabel: 'Send message to service owner',
				icon: FiMessageSquare,
				onClick: () => setCurrentOrder({ ...order, owner: user }),
			},
			{
				variant: 'remove',
				ariaLabel: 'Cancel order',
				icon: FiX,
				onClick: () => openModal('cancelOrder', { id, orderType }),
				disabled:
					status === dealStatusEnum.DEAL_CANCELLED ||
					status === dealStatusEnum.DEAL_STRUCK,
			},
		],
	};
};

const solutionMapper = {
	technology: getTechnologyDataGrid,
	service: getServiceDataGrid,
};

const MyOrders = ({ currentPage, totalPages, totalItems, currentSort, orders }) => {
	const { t } = useTranslation(['helper', 'account']);
	const router = useRouter();
	const { openModal } = useModal();
	const [currentOrder, setCurrentOrder] = useState(null);

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
			<Protected>
				<UserProfile />
				{currentOrder ? (
					<OrderMessages
						isBuyer
						currentOrder={currentOrder}
						backToList={() => setCurrentOrder(null)}
					/>
				) : (
					<MainContentContainer>
						{orders.length ? (
							<>
								<Title align="left" noPadding noMargin>
									{t('account:titles.myOrders')}
								</Title>
								<MainContent>
									<DataGrid
										data={orders.map((order) => {
											const solutionData = solutionMapper[order.type](
												order,
												openModal,
												setCurrentOrder,
											);

											return {
												id: solutionData.id,
												Título: solutionData.title,
												Organização: solutionData.institution,
												Responsável: solutionData.responsible,
												Status: (
													<DealStatus status={solutionData.status.status}>
														{solutionData.status.content}
													</DealStatus>
												),
												'Data do pedido': solutionData.orderDate,
												Tipo: (
													<SolutionType type={order.type}>
														{solutionData.type}
													</SolutionType>
												),
												Ações: (
													<DealActions>
														{solutionData.actions.map((action) => (
															<IconButton
																key={action.ariaLabel}
																variant={action.variant}
																aria-label={action.ariaLabel}
																onClick={action.onClick}
																disabled={action.disabled}
															>
																<action.icon />
															</IconButton>
														))}
													</DealActions>
												),
											};
										})}
										hideItemsByKey={['id']}
										currentPage={currentPage}
										totalPages={totalPages}
										totalItems={totalItems}
										itemsPerPage={itemsPerPage}
										currentOrder={currentSort.order}
										sortOptions={sortOptions}
										handlePagination={handlePagination}
										handleSortBy={handleSortBy}
										enablePagination
									/>
								</MainContent>
							</>
						) : (
							<EmptyScreen message={t('account:messages.noOrdersToShow')} />
						)}
					</MainContentContainer>
				)}
			</Protected>
		</Container>
	);
};

MyOrders.propTypes = {
	orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	currentSort: PropTypes.shape({
		by: PropTypes.string,
		order: PropTypes.string,
	}),
};

MyOrders.defaultProps = {
	currentSort: {},
};

MyOrders.getInitialProps = async (ctx) => {
	const { query } = ctx;

	const page = Number(query.page) || 1;

	const { orders, totalPages, totalItems } = (await getOrders({ fromCurrentUser: true })) || [];

	return {
		orders,
		currentPage: page,
		totalPages,
		totalItems,
		currentSort: { by: query.orderBy, order: query.order },
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

const statusModifiers = {
	[dealStatusEnum.DEAL_STRUCK]: (colors) => css`
		color: ${colors.secondary};
		&::before {
			background: ${colors.secondary};
		}
	`,
	[dealStatusEnum.DEAL_ONGOING]: (colors) => css`
		color: ${colors.lightGray2};
		&::before {
			background: ${colors.lightGray2};
		}
	`,
	[dealStatusEnum.DEAL_CANCELLED]: (colors) => css`
		color: ${colors.red};
		&::before {
			background: ${colors.red};
		}
	`,
	[dealStatusEnum.DEAL_REQUESTED]: (colors) => css`
		color: ${colors.lightGray2};
		&::before {
			background: ${colors.lightGray2};
		}
	`,
};

export const DealStatus = styled.div`
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

export const DealActions = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;

		> button {
			margin: 0 1.2rem 0 0;
		}

		svg {
			font-size: 1.4rem;
			stroke-width: 3;
		}

		@media screen and (min-width: ${screens.large}px) {
			justify-content: center;

			> button {
				margin: 0.8rem;
			}
		}
	`}
`;

const solutionTypeModifier = {
	technology: (colors) => css`
		color: ${colors.darkOrange};
		&::before {
			background: ${colors.darkOrange};
		}
	`,
	service: (colors) => css`
		color: ${colors.darkGreen};
		&::before {
			background: ${colors.darkGreen};
		}
	`,
};

const SolutionType = styled.div`
	${({ theme: { colors }, type }) => css`
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

		${!!type && solutionTypeModifier[type](colors)};
	`}
`;

export default MyOrders;
