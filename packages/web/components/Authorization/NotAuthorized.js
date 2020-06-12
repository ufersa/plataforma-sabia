import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function NotAuthorized() {
	const { t } = useTranslation(['error']);

	return (
		<Container data-testid="notAuthorized">
			<h1>{t('error:notAuthorized')}</h1>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: 100%;
	padding: 5rem 0;

	h1 {
		color: ${({ theme }) => theme.colors.darkGray};
		font-size: 3.6rem;
		margin: 1.5rem auto;
	}
`;

export default NotAuthorized;
