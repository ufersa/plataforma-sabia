import React from 'react';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { useAuth } from '../../hooks';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';

const HeaderProfile = () => {
	const { user } = useAuth();
	const { t } = useTranslation(['profile']);

	return (
		<Container>
			<Cover isCurate={user.role?.role === rolesEnum.REVIEWER} />
			<UserContainer>
				<Avatar
					src={`https://ui-avatars.com/api/?name=${user.full_name}?format=svg&rounded=true&size=128`}
				/>
				<section>
					<h4>{user.full_name}</h4>
					{user.role?.role === rolesEnum.REVIEWER && <span>{t('profile:curate')}</span>}
				</section>
			</UserContainer>
		</Container>
	);
};

const Container = styled.section`
	width: 100%;
	height: 208px;
	position: relative;

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		margin-top: 26px;
	}
`;

const Cover = styled.section`
	background-color: ${({ theme, isCurate }) =>
		isCurate ? theme.colors.secondary : theme.colors.primary};
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
		content: '';
		border-radius: 5px;
	}

	&:before {
		background: linear-gradient(
			90deg,
			${({ theme: { colors }, isCurate }) => (isCurate ? colors.secondary : colors.primary)}
				64.41%,
			rgba(0, 166, 136, 0) 100%
		);
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
	bottom: 0;

	h4 {
		color: ${({ theme: { colors } }) => colors.darkGray};
		font-weight: 500;
		font-size: 28px;
		margin-top: 52px;
	}

	span {
		color: ${({ theme: { colors } }) => colors.lightGray2};
		font-weight: 500;
		font-size: 14px;
	}

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		padding-left: 0;
		margin-bottom: -40px;

		h4 {
			margin-top: 16px;
		}
	}
`;

const Avatar = styled.img`
	background-color: ${({ theme: { colors } }) => colors.whiteSmoke};
	width: 128px;
	height: 128px;
	display: block;
	border: 2px solid ${({ theme: { colors } }) => colors.whiteSmoke};
	border-radius: 64px;
	margin-right: 8px;

	@media (max-width: ${({ theme: { screens } }) => screens.medium}px) {
		margin-right: 0;
	}
`;

export default HeaderProfile;
