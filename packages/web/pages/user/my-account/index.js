import React from 'react';
// import PropTypes from 'prop-types';
// import cookies from 'next-cookies';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
// import { FiPlus } from 'react-icons/fi';
import { Protected } from '../../../components/Authorization';
import { UserProfile } from '../../../components/UserProfile';
import { Title } from '../../../components/Common';
// import { SabiaApp } from '../../_app';

const MyTechnologies = () => {
	const { t } = useTranslation(['account']);
	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Title align="left" noPadding noMargin>
						{t('account:myProfile')}
					</Title>
					<MainContent />
				</MainContentContainer>
			</Protected>
		</Container>
	);
};

MyTechnologies.propTypes = {};

MyTechnologies.getInitialProps = async () => {
	return {
		namespacesRequired: ['account', 'profile'],
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

export default MyTechnologies;
