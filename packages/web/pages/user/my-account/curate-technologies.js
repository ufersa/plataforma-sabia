import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { resetIdCounter } from 'react-tabs';

import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { Title } from '../../../components/Common';
import { DataGrid } from '../../../components/DataGrid';
import { dateToString } from '../../../utils/helper';
import { useModal } from '../../../hooks';
import { getTechnologiesToCurate } from '../../../services/technology';
import { STATUS as statusEnum } from '../../../utils/enums/technology.enums';

/**
 * Returns review status text based on status key
 *
 * @param {string} value The status key
 * @returns {string} Status text
 */
const getCurationStatusText = (value) =>
	({
		[statusEnum.IN_REVIEW]: 'Aguardando análise',
		[statusEnum.REQUESTED_CHANGES]: 'Aguardando correção',
		[statusEnum.CHANGES_MADE]: 'Correção efetuada',
	}[value]);

const ReviewTechnologies = ({ technologies = [] }) => {
	const { openModal } = useModal();
	const { t } = useTranslation(['account']);

	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:titles.reviewTechnologies')}
					</Title>

					<MainContent>
						{technologies.length ? (
							<DataGrid
								data={technologies.map((technology) => {
									const { id, title, status, updated_at } = technology;
									return {
										id,
										Título: title,
										Instituição: 'instituto',
										Status: (
											<ReviewStatus status={status}>
												{getCurationStatusText(status)}
											</ReviewStatus>
										),
										'Última atualização': dateToString(updated_at),
										Ações: (
											<ReviewButton
												onClick={() =>
													openModal(
														'reviewTechnology',
														{ technology },
														{ customModal: true },
													)
												}
												aria-label="Review technology"
												disabled={status === statusEnum.REQUESTED_CHANGES}
											>
												Visualizar
											</ReviewButton>
										),
									};
								})}
								hideItemsByKey={['id']}
							/>
						) : (
							<NoTechsToReview>
								{t('account:messages.noTechsToReview')}
							</NoTechsToReview>
						)}
					</MainContent>
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

ReviewTechnologies.getInitialProps = async () => {
	resetIdCounter();

	const technologies = (await getTechnologiesToCurate()) || [];

	return {
		namespacesRequired: ['helper', 'account', 'profile', 'datagrid'],
		technologies,
	};
};

ReviewTechnologies.propTypes = {
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

export const NoTechsToReview = styled.span`
	color: ${({ theme }) => theme.colors.darkGray};
	font-size: 2rem;
`;

const ReviewButton = styled.button`
	${({ theme }) => css`
		background: none;
		border: none;

		text-transform: uppercase;
		color: ${theme.colors.secondary};
		font-size: 1.4rem;
		font-weight: 700;
		line-height: 2.4rem;
		padding: 0.5rem;
		text-align: left;

		&:hover,
		&:focus {
			color: ${theme.colors.darkGreen};
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		/* TODO: better accessibility */
		&:focus {
			outline: 2px solid ${theme.colors.darkGreen};
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
};

export const ReviewStatus = styled.span`
	${({ theme: { colors }, status }) => css`
		display: inline-block;
		position: relative;
		line-height: 2.4rem;
		font-weight: 500;
		padding: 0.2rem 0.8rem;
		max-width: 17rem;
		text-align: center;

		&::before {
			content: '""';
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
	`}
`;

export default ReviewTechnologies;
