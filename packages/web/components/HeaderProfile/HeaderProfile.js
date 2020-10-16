import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';

const HeaderProfile = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Cover isCurate={user.role?.role === rolesEnum.REVIEWER} />
      <UserContainer>
        <Avatar src={`https://ui-avatars.com/api/?name=${user.full_name}?format=svg&rounded=true&size=128`} />
        <section>
          <h4>{user.full_name}</h4>
          {user.role?.role === rolesEnum.REVIEWER && <span>Curador</span>}
        </section>
      </UserContainer>
    </Container>
  );
};

const Container = styled.section`
	width: 100%;
  position: relative;

  @media (max-width: ${({ theme }) => theme.screens.large}px) {
    margin-top: 26px;
    margin-bottom: 100%;
	}
`;

const Cover = styled.section`
  background-color: ${({ theme, isCurate }) => isCurate ? theme.colors.secondary : theme.colors.primary};
  width: 100%;
  height: 128px;
  border-radius: 5px;
  position: relative;
  z-index: 0;

  &:before,
  &:after {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    border-radius: 5px;
  }

  &:before {
    background: linear-gradient(90deg, ${({ theme, isCurate }) => isCurate ?
      theme.colors.secondary : theme.colors.primary} 64.41%, rgba(0, 166, 136, 0) 100%);
    z-index: 0;
  }

  &:after {
    background-image: url('/pattern.png');
    background-repeat: no-repeat;
    background-size: 446px;
    background-position: right;
    z-index: -1;
  }
`;

const UserContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-left: 32px;
  position: absolute;
  z-index: 0;
  bottom: -80px;

  h4 {
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 500;
    font-size: 28px;
    margin-top: 52px;
  }

  span {
    color: ${({ theme }) => theme.colors.lightGray2};
    font-weight: 500;
    font-size: 14px;
  }

  @media (max-width: ${({ theme }) => theme.screens.large}px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-left: 0;
    bottom: -160px;

    h4 {
      margin-top: 16px;
    }
	}
`;

const Avatar = styled.img`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  width: 128px;
  height: 128px;
  display: block;
  border: 2px solid ${({ theme }) => theme.colors.whiteSmoke};
  border-radius: 64px;
  margin-right: 8px;

  @media (max-width: ${({ theme }) => theme.screens.large}px) {
    margin-right: 0;
	}
`;

export default HeaderProfile;
