import React from 'react';
import styled from 'styled-components';
import RequiredIndicator from './Indicator';

const Container = styled.span`
	display: inline-block;
	border-radius: 0.2rem;
	background-color: ${({ theme }) => theme.colors.lightGray5};
	margin: 1rem 0;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

const ContainerText = styled.span`
	display: inline-block;
	color: ${({ theme }) => theme.colors.lightGray};
	margin-left: 0.5rem;
`;

const Info = () => {
	return (
		<Container>
			<RequiredIndicator />
			<ContainerText>Indica campo obrigatório.</ContainerText>
		</Container>
	);
};

export default Info;
