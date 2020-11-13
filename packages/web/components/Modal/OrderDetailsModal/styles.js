import styled, { css } from 'styled-components';

export const InfosContainer = styled.div`
	${({ theme: { metrics } }) => css`
		display: flex;
		flex-direction: column;

		> img {
			border-radius: ${metrics.baseRadius}rem;
			max-width: 17rem;
			margin-right: 1.6rem;
			margin-bottom: 1.6rem;
		}
	`}
`;

export const Details = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;
		margin-bottom: 1.6rem;

		> h4 {
			font-size: 2.4rem;
			line-height: 3rem;
			font-weight: 500;
			color: ${colors.silver};
			margin-bottom: 0.4rem;
		}

		> p {
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2.4rem;
			color: ${colors.lightGray2};
		}

		> p > span {
			color: ${colors.black};
		}

		> p:not(:last-child) {
			margin-bottom: 0.4rem;
		}
	`}
`;

export const Modal = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		max-width: 77rem;

		input {
			opacity: 1;

			:disabled {
				color: ${colors.silver};
			}
		}

		button {
			margin-top: 3.2rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;

			${InfosContainer} {
				margin-left: 0;
				margin-right: 0;
			}
		}

		@media screen and (min-width: ${screens.small}px) {
			> button {
				max-width: fit-content;
				align-self: center;
				margin-right: 1.6rem;
			}

			${InfosContainer} {
				flex-direction: row;
			}
		}
	`}
`;

export const Title = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		font-size: 2.8rem;
		font-weight: 500;
		margin-bottom: 2rem;
		line-height: 3.3rem;
		text-align: center;
	`}
`;
