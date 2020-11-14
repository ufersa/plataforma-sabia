import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { getUserTechnologies } from '../../../services';
import { Title } from '../../../components/Common';
import { STATUS as technologyStatusEnum } from '../../../utils/enums/technology.enums';

/**
 * Returns technology status text based on status key
 *
 * @param {string} value The status key
 * @returns {string} Status text
 */
export const getTechnologyStatusText = (value) =>
	({
		[technologyStatusEnum.DRAFT]: 'Rascunho',
		[technologyStatusEnum.PENDING]: 'Pendente',
		[technologyStatusEnum.IN_REVIEW]: 'Em Análise',
		[technologyStatusEnum.REQUESTED_CHANGES]: 'Correção Solicitada',
		[technologyStatusEnum.CHANGES_MADE]: 'Correção Feita',
		[technologyStatusEnum.APPROVED]: 'Aprovada',
		[technologyStatusEnum.REJECTED]: 'Rejeitada',
		[technologyStatusEnum.PUBLISHED]: 'Publicada',
	}[value]);

const MyTechnologies = ({ technologies }) => {
	const { t } = useTranslation(['helper', 'account']);
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
								data={technologies.map(({ id, title, status, likes }) => ({
									id,
									Título: title,
									Status: (
										<DealStatus status={status}>
											{getTechnologyStatusText(status)}
										</DealStatus>
									),
									Favoritos: likes,
								}))}
								rowLink="/technology/:id/edit"
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
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

MyTechnologies.getInitialProps = async (ctx) => {
	const { user } = ctx;

	const technologies = (await getUserTechnologies(user.id)) || [];

	return {
		technologies,
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
	[technologyStatusEnum.DRAFT]: (colors) => css`
		color: ${colors.lightGray2};
		&::before {
			background: ${colors.lightGray2};
		}
	`,
	[technologyStatusEnum.PENDING]: (colors) => css`
		color: ${colors.primary};
		&::before {
			background: ${colors.primary};
		}
	`,
	[technologyStatusEnum.IN_REVIEW]: (colors) => css`
		color: ${colors.lightBlue};
		&::before {
			background: ${colors.lightBlue};
		}
	`,
	[technologyStatusEnum.REQUESTED_CHANGES]: (colors) => css`
		color: ${colors.darkOrange};
		&::before {
			background: ${colors.darkOrange};
		}
	`,
	[technologyStatusEnum.CHANGES_MADE]: (colors) => css`
		color: ${colors.blue};
		&::before {
			background: ${colors.blue};
		}
	`,
	[technologyStatusEnum.APPROVED]: (colors) => css`
		color: ${colors.secondary};
		&::before {
			background: ${colors.secondary};
		}
	`,
	[technologyStatusEnum.REJECTED]: (colors) => css`
		color: ${colors.red};
		&::before {
			background: ${colors.red};
		}
	`,
	[technologyStatusEnum.PUBLISHED]: (colors) => css`
		color: ${colors.darkGreen};
		&::before {
			background: ${colors.darkGreen};
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

		${!!status && statusModifiers[status](colors)};
	`}
`;

export default MyTechnologies;
