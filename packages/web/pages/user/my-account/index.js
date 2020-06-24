import React from 'react';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { DataGrid } from '../../../components/DataGrid';
import { getUserTechnologies } from '../../../services';
import { Title } from '../../../components/Common';
import { Link } from '../../../components/Link';
import { getPeriod } from '../../../utils/helper';

const MyAccount = ({ technologies }) => {
	const { t } = useTranslation(['helper']);
	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContent>
					<Title align="left" noPadding noMargin>
						Minhas Tecnologias
					</Title>
					{technologies.length > 0 ? (
						<MainContentContainer>
							<InfoContainer>
								<AddButton href="/technology/new" as="button">
									<span>Adicionar</span>
									<FiPlus />
								</AddButton>
								<Stats>{technologies.length} tecnologia(s) cadastrada(s)</Stats>
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
							/>
						</MainContentContainer>
					) : (
						<div>Você não possui tecnologias para exibir no momento</div>
					)}
				</MainContent>
			</Protected>
		</Container>
	);
};

MyAccount.propTypes = {
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

MyAccount.getInitialProps = async (ctx) => {
	const { token } = cookies(ctx);

	const technologies = token ? await getUserTechnologies(token) : [];

	return {
		technologies,
		namespacesRequired: ['helper'],
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

export const MainContent = styled.section`
	width: 100%;
`;

export const MainContentContainer = styled.div`
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

export const AddButton = styled(Link)`
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

export default MyAccount;
