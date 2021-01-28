import styled, { css } from 'styled-components';

export const InfosContainer = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		> h3 {
			color: ${colors.red};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 0.8rem;
			line-height: 3.3rem;
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

		button:first-child {
			margin-right: 2.2rem;
		}

		@media screen and (max-width: ${screens.small}px) {
			flex-direction: column;
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
