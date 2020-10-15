import React from 'react';
import styled, { css } from 'styled-components';
import { Protected } from '../../../components/Authorization';
import { ROLES as rolesEnum } from '../../../utils/enums/api.enum';

const CurateProfile = () => {
  return (
    <Container>
      <Protected userRole={rolesEnum.REVIEWER}></Protected>
    </Container>
  );
};

CurateProfile.propTypes = {};

CurateProfile.getInitialProps = async ctx => {
  return {};
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

export default CurateProfile;
