import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiEdit } from 'react-icons/fi';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { Title } from '../../../components/Common';
import { IconButton } from '../../../components/Button';
import { getTerms, getUserServices, updateServiceActiveStatus } from '../../../services';
import { SwitchField } from '../../../components/Form';
import { SwitchContainer } from '../../../components/Form/SwitchField';
import EmptyScreen from '../../../components/EmptyScreen';
import { getTypeLabel } from '../../../utils/service';
import { ORDERING as orderEnum } from '../../../utils/enums/api.enum';
import { useModal } from '../../../hooks';
import { Spinner } from '../../../components/Loading';
import { formatMoney } from '../../../utils/helper';

const MyServices = ({
	initialServices,
	currentSort,
	currentPage,
	initialTotalPages,
	initialTotalItems,
	itemsPerPage,
	sortOptions,
}) => {
	const { t } = useTranslation(['helper', 'account']);
	const router = useRouter();
	const { openModal } = useModal();

	const {
		data: { services = [], totalPages, totalItems },
		isValidating: isValidatingServices,
		revalidate,
		mutate,
	} = useSWR(
		['getUserServices', router.query],
		() => getUserServices({ ...router.query, perPage: itemsPerPage }),
		{
			initialData: {
				services: initialServices,
				totalPages: initialTotalPages,
				totalItems: initialTotalItems,
			},
			revalidateOnFocus: false,
		},
	);

	const {
		data: keywordsOptions = [],
		isValidating: isValidatingKeywords,
		revalidate: revalidateKeywords,
	} = useSWR('getKeywords', () => getTerms({ taxonomy: 'KEYWORDS', embed: 'false' }), {
		revalidateOnFocus: false,
	});

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

		const shouldOrderAsc = order === orderEnum.DESC && currentSort.orderBy !== orderBy;
		query.order = shouldOrderAsc ? orderEnum.ASC : order;
		query.orderBy = orderBy;
		query.page = 1;

		return router.push({
			pathname,
			query,
		});
	};

	const handleActive = async (id) => {
		const updatedServices = services.map((service) => {
			if (service.id === id) {
				return { ...service, active: !service.active };
			}

			return service;
		});

		mutate({ services: updatedServices, totalPages, totalItems }, false);
		await updateServiceActiveStatus(id);
		revalidate();
	};

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<TitleWrapper>
						<Title align="left" noPadding noMargin>
							{t('account:titles.myServices')}
						</Title>
						{(!!isValidatingServices || !!isValidatingKeywords) && (
							<Spinner noPadding />
						)}
					</TitleWrapper>

					{services.length ? (
						<MainContent>
							<InfoContainer>
								<Link href="/service/new">
									<AddButton>
										<span>{t('account:labels.addServices')}</span>
										<FiPlus />
									</AddButton>
								</Link>
								<Stats>
									{t('account:labels.registeredServices', {
										count: services.length,
									})}
								</Stats>
							</InfoContainer>
							<DataGrid
								data={services.map(
									({
										id,
										name,
										thumbnail,
										keywords,
										description,
										measure_unit,
										price,
										type,
										active,
									}) => ({
										id,
										Título: name,
										Tipo: getTypeLabel(type),
										Ativo: (
											<Actions>
												<SwitchField
													value={!!active}
													checked={!!active}
													name={`active-${id}`}
													onChange={() => handleActive(id)}
												/>
											</Actions>
										),
										Ações: (
											<Actions>
												<IconButton
													variant="info"
													aria-label="Edit Service"
													onClick={() =>
														openModal(
															'editService',
															{
																id,
																name,
																thumbnail,
																keywords: keywords.map(
																	(item) => item.id,
																),
																description,
																measure_unit,
																price: formatMoney(price),
																type,
																revalidateServices: revalidate,
																revalidateKeywords,
																// We need this dirty fix until SelectField has a pagination option
																// So the actual service keywords appears in edit select
																keywordsOptions: [
																	...keywordsOptions,
																	...(!!keywords.length &&
																		keywords.map((item) => ({
																			id: item.id,
																			term: item.term,
																		}))),
																],
															},
															{
																hideCloseModalIcon: true,
																overlayClick: false,
															},
														)
													}
												>
													<FiEdit />
												</IconButton>
											</Actions>
										),
									}),
								)}
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
					) : (
						<EmptyScreen message={t('account:messages.noServicesToShow')} />
					)}
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyServices.propTypes = {
	initialServices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	user: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
	currentSort: PropTypes.shape({
		orderBy: PropTypes.string,
		order: PropTypes.string,
	}),
	sortOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		}),
	).isRequired,
	currentPage: PropTypes.number.isRequired,
	initialTotalPages: PropTypes.number.isRequired,
	initialTotalItems: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
};

MyServices.defaultProps = {
	currentSort: {},
};

MyServices.getInitialProps = async (ctx) => {
	const { user, query } = ctx;
	const itemsPerPage = 5;

	const page = Number(query.page) || 1;
	const sortOptions = [
		{ value: 'name', label: 'Título' },
		{ value: 'type', label: 'Tipo' },
		{ value: 'active', label: 'Ativo' },
	];

	const { services, totalPages, totalItems } = await getUserServices({
		...query,
		perPage: itemsPerPage,
	});

	return {
		initialServices: services,
		initialTotalPages: totalPages,
		initialTotalItems: totalItems,
		itemsPerPage,
		currentPage: page,
		sortOptions,
		currentSort: { orderBy: query.orderBy, order: query.order },
		user,
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

export const AddButton = styled.a`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.white};
	padding: 0.5rem 3rem;
	display: flex;
	align-items: center;
	border-radius: 3rem;
	border: none;
	text-align: center;

	span {
		margin-right: 1rem;
	}

	:hover {
		opacity: 0.8;
	}
`;

export const Stats = styled.span`
	color: ${({ theme }) => theme.colors.secondary};
	font-size: 1.4rem;
`;

export const Actions = styled.div`
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
		${SwitchContainer} {
			display: flex;
		}
	`}
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;

	> :first-child {
		margin-right: 1.4rem;
	}
`;

export default MyServices;
