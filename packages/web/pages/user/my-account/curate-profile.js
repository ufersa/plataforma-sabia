import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { CurateSpecialties } from '../../../components/CurateSpecialties';
import { HeaderProfile } from '../../../components/HeaderProfile';
import { getTechnologiesToCurate } from '../../../services/technology';
import { ROLES as rolesEnum } from '../../../utils/enums/api.enum';

const CurateProfile = ({
  technologies = [],
}) => {
  return (
    <Container>
      <Protected userRole={rolesEnum.REVIEWER}>
        <UserProfile />
        <MainContentContainer>
          <HeaderProfile />
          <CurateSpecialties />
        </MainContentContainer>
      </Protected>
    </Container>
  );
};

CurateProfile.getInitialProps = async (ctx) => {
  const { query } = ctx;

  const { technologies = [] } =
		(await getTechnologiesToCurate({
      ...query,
      perPage: 5,
			page: 1,
		})) || {};

	return {
		technologies,
	};
};

CurateProfile.propTypes = {
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

export default CurateProfile;
