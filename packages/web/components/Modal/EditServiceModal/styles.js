import styled, { css } from 'styled-components';
import { Row as LayoutRow, Column as LayoutColumn } from '../../Common';

export const InfosContainer = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		> h3 {
		}

		> span {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
		}
	`}
`;

export const Actions = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: flex-end;
		margin-top: 3.6rem;
		button:first-child {
			margin-right: 2.2rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
			button {
				width: 100%;
			}
			button:first-child {
				margin-top: 2.2rem;
				order: 2;
			}
		}
	`}
`;

export const Modal = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		max-width: 77rem;

		> div:first-child {
			max-width: 26rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;

			> div:first-child {
				display: none;
			}

			${InfosContainer} {
				margin-left: 0;
				margin-right: 0;
			}
		}
	`}
`;

export const customTextFieldCss = css`
	${({ theme: { colors } }) => css`
		> label {
			display: flex;
			font-size: 1.6rem;
			line-height: 2.4rem;
			color: ${colors.silver};
			margin-top: 0.8rem;
			margin-bottom: 1.6rem;
		}
	`}
`;

export const Row = styled(LayoutRow)`
	${({ theme: { screens } }) => css`
		@media screen and (min-width: ${screens.medium}px) {
			> div:first-child {
				flex-basis: 60%;
				margin-right: 0.8rem;
			}

			> div:last-child {
				flex-basis: 40%;
				margin-left: 0.8rem;
			}
		}
	`}
`;

export const Column = styled(LayoutColumn)`
	> div {
		margin-bottom: 1.6rem;
	}
`;

export const ImageContainer = styled.div`
	${({ theme: { metrics, colors } }) => css`
		border-radius: ${metrics.baseRadius}rem;
		overflow: hidden;

		width: 10.7rem;
		height: 7.2rem;

		background-image: linear-gradient(
			to right,
			${colors.lightGray5} 0%,
			${colors.gray98} 20%,
			${colors.lightGray5} 40%,
			${colors.lightGray5} 100%
		);

		animation: placeholderShimmer 5s linear infinite forwards;

		@keyframes placeholderShimmer {
			0% {
				background-position: -40rem 0;
			}
			100% {
				background-position: 40rem 0;
			}
		}

		position: relative;
	`}
`;

export const ImageActions = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;

export const UploadBox = styled.div`
	margin-bottom: 0.8rem;
`;

export const UploadError = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.red};
		margin-bottom: 1.2rem;
	`}
`;
