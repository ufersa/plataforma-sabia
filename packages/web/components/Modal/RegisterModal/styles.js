import styled, { css } from 'styled-components';
import { Modal } from '../styles';

export const StyledRegisterModal = styled(Modal)`
	padding: 0rem;
	max-width: 67rem;
	max-height: 95%;
	width: 100%;
	overflow-y: auto;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 90%;
		padding: 0;
	}
`;

export const StyledLabel = styled.div`
	padding: 4rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
	font-size: 2.5rem;
	background-color: ${({ theme }) => theme.colors.primary};

	> span:last-child {
		word-break: break-word;
	}
`;

export const StyledCloseButton = styled.button`
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

export const StyledModalContent = styled.div`
	${({ theme: { screens } }) => css`
		padding-left: 5.8rem;
		padding-right: 5.8rem;

		@media (max-width: ${screens.medium}px) {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	`}
`;

export const LabelGroups = styled.div`
	width: 50%;
	font-size: 1.5rem;
	font-weight: 100;
	padding-left: 2rem;
	display: flex;
	flex-direction: row;
`;

export const Label = styled.p`
	font-size: 1rem;
`;

export const ActionsRegister = styled.div`
	${({ theme: { colors, screens } }) => css`
		width: 100%;
		margin-top: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		font: sans-serif;
		button {
			background-color: ${colors.secondary};
			padding: 1rem;
			font: 1em;
			width: 50%;
			font-weight: 200;
		}

		@media screen and (max-width: ${screens.small}px) {
			flex-wrap: wrap;

			button {
				flex-basis: 100%;
				margin-bottom: 1.2rem;
			}

			${LabelGroups} {
				width: 100%;
				padding-left: 0;
			}
		}
	`}
`;
export const StyledSpan = styled.div`
	color: ${({ theme }) => theme.colors.lightGray};
	font-weight: 500;
	margin: 0rem;
	padding-right: 0.5rem;
`;
export const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 500;
	margin: 0rem !important;
	padding: 0rem !important;
`;

export const ErrorMessage = styled.p`
	color: ${({ theme }) => theme.colors.error};
`;

export const SuccessMessage = styled.p`
	color: ${({ theme }) => theme.colors.success};
`;
