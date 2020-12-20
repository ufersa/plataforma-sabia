import styled, { css } from 'styled-components';

export const Content = styled.div`
	${({ enable, theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		> h3 {
			color: ${enable ? colors.red : colors.secondary};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 0.8rem;
			line-height: 3.3rem;
			text-align: center;
		}

		> span {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
		}

		> div {
			display: flex;
			justify-content: center;
			align-items: center;

			@media (max-width: ${screens.medium}px) {
				flex-direction: column;
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

			${Content} {
				margin-left: 0;
				margin-right: 0;
			}
		}
	`}
`;

export const Image = styled.div`
	> img {
		width: 26rem;
		height: auto;
	}
`;
