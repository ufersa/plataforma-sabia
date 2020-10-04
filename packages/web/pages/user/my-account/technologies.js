import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { getUserTechnologies } from '../../../services';
import { Title } from '../../../components/Common';
import { getPeriod } from '../../../utils/helper';

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
								data={technologies.map(
									({ id, title, status, installation_time }) => ({
										id,
										Título: title,
										Status: status,
										'Tempo de implantação': getPeriod(t, installation_time),
									}),
								)}
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

export default MyTechnologies;
