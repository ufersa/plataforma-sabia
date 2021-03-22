import styled, { css } from 'styled-components';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1500;
	background: rgba(1, 1, 1, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: auto;
`;

export const Modal = styled.div`
	${({ theme: { screens, colors } }) => css`
		position: fixed;
		min-width: 40rem;
		max-height: 100vh;
		z-index: 2000;
		padding: 3.2rem;
		background: ${colors.white};
		border-radius: 0.5rem;
		box-shadow: 0px 0px 20px -5px rgba(38, 38, 38, 1);
		overflow-y: auto;

		@media (max-width: ${screens.medium}px) {
			min-width: 90%;
			padding: 2rem;
			margin: 1rem;
			overflow-x: hidden;
			overflow-y: scroll;
		}
	`}
`;

export const ModalCloseIcon = styled.button`
	background: 0;
	border: 0;
	position: absolute;
	top: 1rem;
	right: 1rem;

	svg {
		height: ${({ theme }) => theme.sizes.defaultIcon}rem;
		width: ${({ theme }) => theme.sizes.defaultIcon}rem;
		transition: color 0.3s;

		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;
