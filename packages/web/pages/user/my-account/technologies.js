import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiEdit } from 'react-icons/fi';
import useSWR from 'swr';
import Link from 'next/link';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { Title } from '../../../components/Common';
import { IconButton } from '../../../components/Button';
import { getPeriod } from '../../../utils/helper';
import { STATUS as technologyStatusEnum } from '../../../utils/enums/technology.enums';
import { getUserTechnologies, updateTechnologyActiveStatus } from '../../../services';
import { SwitchField } from '../../../components/Form';
import { SwitchContainer } from '../../../components/Form/SwitchField';
import EmptyScreen from '../../../components/EmptyScreen';
import { getTechnologyStatus } from '../../../utils/technology';

const MyTechnologies = ({ initialTechnologies, user }) => {
	const { t } = useTranslation(['helper', 'account']);

	const { data: technologies = [], revalidate, mutate } = useSWR(
		['getUserTechnologies', user.id],
		(_, id) => getUserTechnologies(id),
		{
			initialData: initialTechnologies,
		},
	);

	const handleActive = async (id) => {
		const updatedTechnologies = technologies.map((technology) => {
			if (technology.id === id) {
				return { ...technology, active: !technology.active };
			}

			return technology;
		});

		mutate(updatedTechnologies, false);
		await updateTechnologyActiveStatus(id);
		revalidate();
	};

	const handleEditClick = useCallback(
		(id) => window.open(`/technology/${id}/edit`, '_ blank'),
		[],
	);

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:titles.myTechnologies')}
					</Title>

					{technologies.length > 0 ? (
						<MainContent>
							<InfoContainer>
								<Link href="/technology/new">
									<AddButton>
										<span>{t('account:labels.addTechnologies')}</span>
										<FiPlus />
									</AddButton>
								</Link>
								<Stats>
									{t('account:labels.registeredTechnologies', {
										count: technologies.length,
									})}
								</Stats>
							</InfoContainer>
							<DataGrid
								data={technologies.map(
									({ id, title, status, installation_time, active }) => ({
										id,
										Título: title,
										Status: (
											<TechnologyStatus status={status}>
												{getTechnologyStatus(status)}
											</TechnologyStatus>
										),
										'Tempo de implantação': getPeriod(t, installation_time),
										Ativa: (
											<Actions>
												<SwitchField
													value={!!active}
													checked={!!active}
													name={`active-${id}`}
													onClick={() => handleActive(id)}
												/>
											</Actions>
										),
										Ações: (
											<Actions>
												<IconButton
													variant="info"
													aria-label="Edit Technology"
													onClick={() => handleEditClick(id)}
												>
													<FiEdit />
												</IconButton>
											</Actions>
										),
									}),
								)}
							/>
						</MainContent>
					) : (
						<EmptyScreen message={t('account:messages.noTechnologyToShow')} />
					)}
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyTechnologies.propTypes = {
	initialTechnologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	user: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
};

MyTechnologies.getInitialProps = async (ctx) => {
	const { user } = ctx;

	const initialTechnologies = (await getUserTechnologies(user.id)) || [];

	return {
		initialTechnologies,
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

export const NoTechnologies = styled.span`
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

export default MyTechnologies;
