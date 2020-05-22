import styled from 'styled-components';

export const StyledEmailConfirmationModal = styled.div`
	width: 50rem;
	padding: 0rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;

export const ActionsRegister = styled.div`
	width: 100%;
	margin-top: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font: sans-serif;
	button {
		background-color: ${({ theme }) => theme.colors.primary};
		padding: 1rem;
		font: 1em;
		width: 100%;
		font-weight: 200;
	}
`;
