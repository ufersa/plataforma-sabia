/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ActionsRegister = styled.div`
	width: 100%;
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font: sans-serif;
	button {
		background-color: ${({ theme }) => theme.colors.secondary};
		padding: 1rem;
		font: 1em;
		width: 50%;
		font-weight: 200;
	}
`;
