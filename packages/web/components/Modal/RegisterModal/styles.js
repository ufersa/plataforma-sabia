import styled from 'styled-components';

export const StyledRegisterModal = styled.div`
	width: 50rem;
	padding: 0rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;

export const StyledLabel = styled.div`
	padding: 4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
	width: 58rem;
	margin-left: -4rem;
	margin-top: -4rem;
	margin-bottom: 4rem;
	font-size: 3rem;
	height: 20rem;
	background-color: ${({ theme }) => theme.colors.red};
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 75rem;
		margin-left: -2rem;
		margin-top: -2rem;
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
		background-color: ${({ theme }) => theme.colors.lightGreen};
		padding: 1rem;
		font: 1em;
		width: 50%;
		font-weight: 200;
	}
`;
export const LabelGrups = styled.div`
	width: 50%;
	font-size: 1.5rem;
	font-weight: 100;
	padding-left: 2rem;
	display: flex;
	flex-direction: row;
`;
export const StyledSpan = styled.div`
	color: ${({ theme }) => theme.colors.gray};
	margin: 0rem;
	padding-right: 0.5rem;
`;
export const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.red};
	margin: 0rem !important;
	padding: 0rem !important;
`;
