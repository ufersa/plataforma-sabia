import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Protected } from '../../../../components/Authorization';
import { UserProfile } from '../../../../components/UserProfile';
import { getTechnologiesToCurate } from '../../../../services';
import { ROLES as rolesEnum } from '../../../../utils/enums/api.enum';
import CurateTechnology from '../../../../components/CurateTechnology';
import EmptyScreen from '../../../../components/EmptyScreen';

const CurateTechnologyPage = ({ technology }) => {
	return (
		<Container>
			<Protected userRole={rolesEnum.REVIEWER}>
				<UserProfile />
				<MainContentContainer>
					{technology ? (
						<CurateTechnology technology={technology} />
					) : (
						<EmptyScreen message="Não existem dados a serem exibidos para essa tecnologia" />
					)}
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

CurateTechnologyPage.getInitialProps = async (ctx) => {
	const { query } = ctx;

	const { technologies = [] } = await getTechnologiesToCurate({
		ids: query.id,
	});

	return {
		technology: technologies[0],
	};
};

CurateTechnologyPage.propTypes = {
	technology: PropTypes.shape({}),
};

CurateTechnologyPage.defaultProps = {
	technology: null,
};

export default CurateTechnologyPage;

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
