import styled, { css } from 'styled-components';
import { Modal } from '../styles';

export const ForgotPasswordModal = styled(Modal)`
	padding: 0;
	max-width: 58rem;
	width: 100%;
	overflow: hidden;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 90%;
		padding: 0;
	}
`;

export const Header = styled.div`
	padding: 4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
	font-size: 2.5rem;
	background-color: ${({ theme }) => theme.colors.primary};

	> span:last-child {
		word-break: break-word;
	}
`;

export const CloseButton = styled.button`
	${({ theme: { colors, sizes } }) => css`
		background: 0;
		border: 0;
		position: absolute;
		top: 1rem;
		right: 1rem;

		svg {
			height: ${sizes.defaultIcon}rem;
			width: ${sizes.defaultIcon}rem;
			transition: color 0.3s;
			color: ${colors.lightWhite};

			:hover,
			:focus {
				color: ${colors.black};
			}
		}
	`}
`;

export const ModalContent = styled.div`
	${({ theme: { screens } }) => css`
		padding-left: 5.8rem;
		padding-right: 5.8rem;

		@media (max-width: ${screens.medium}px) {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	`}
`;

export const ActionsRegister = styled.div`
	width: 100%;
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	font: sans-serif;
	button {
		background-color: ${({ theme }) => theme.colors.secondary};
		padding: 1rem;
		font: 1em;
		font-weight: 200;
	}
`;
export const LabelGroups = styled.div`
	font-size: 1.5rem;
	font-weight: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2rem;

	> a {
		margin: 0rem;
		padding: 0rem;
	}
`;
export const Span = styled.div`
	color: ${({ theme }) => theme.colors.lightGray};
	font-weight: 500;
	margin: 0rem;
	padding-right: 0.5rem;
`;
export const Link = styled.a`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 500;
`;
