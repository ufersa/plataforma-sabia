import React from 'react';
import styled from 'styled-components';
import { UserProfile } from '../../../components/UserProfile';
import { Protected } from '../../../components/Authorization';
import Maintanance from '../../../components/Maintenance';

const Messages = () => {
	return (
		<Container>
			<Protected>
				<UserProfile />
				<MainContentContainer>
					<Maintanance />
				</MainContentContainer>
			</Protected>
		</Container>
	);
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

export default Messages;
