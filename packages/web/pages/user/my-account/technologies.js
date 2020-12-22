import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { Title } from '../../../components/Common';
import { IconButton } from '../../../components/Button';
import { getUserTechnologies, updateTechnologyActiveStatus } from '../../../services';
import { getPeriod } from '../../../utils/helper';
import { SwitchField } from '../../../components/Form';

const MyTechnologies = ({ initialTechnologies, user }) => {
	const { t } = useTranslation(['helper', 'account']);
	const router = useRouter();

	const { data: technologies = [], revalidate, mutate } = useSWR(
		['getUserTechnologies', user.id],
		(_, id) => getUserTechnologies(id),
		{
			initialData: initialTechnologies,
			revalidateOnMount: true,
		},
	);

	const handleActive = async (id) => {
		const updatedTechnology = technologies.find((tech) => tech.id === id);
		updatedTechnology.status = !updatedTechnology.status;
		const updatedTechnologiesData = technologies.map((tech) => {
			return tech.id === id ? updatedTechnology : tech;
		});
		mutate(updatedTechnologiesData);
		await updateTechnologyActiveStatus(id);
		revalidate();
	};

	const handleEditClick = useCallback((id) => router.push(`/technology/${id}/edit`), [router]);

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
								data={technologies.map((technology) => ({
									id: technology.id,
									Título: technology.title,
									Status: technology.status,
									'Tempo de implantação': getPeriod(
										t,
										technology.installation_time,
									),
									Ativa: (
										<Actions>
											<SwitchField
												value={!!technology.active}
												checked={!!technology.active}
												name={`active-${technology.id}`}
												onClick={() => handleActive(technology.id)}
											/>
										</Actions>
									),
									Ações: (
										<Actions>
											<IconButton
												variant="info"
												aria-label="Edit Technology"
												onClick={() => handleEditClick(technology.id)}
											>
												<FiEdit />
											</IconButton>
										</Actions>
									),
								}))}
							/>
						</MainContent>
					) : (
						<NoTechnologies>{t('account:messages.noTechnologyToShow')}</NoTechnologies>
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
	`}
`;

export default MyTechnologies;
