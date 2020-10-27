import styled, { css } from 'styled-components';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';

export const Header = styled.div`
	${({ theme: { colors, metrics, screens } }) => css`
		display: flex;
		flex-wrap: wrap;

		> img {
			max-width: 25.6rem;
			border-radius: ${metrics.baseRadius}rem;
			margin: 0 auto 1.2rem;
		}

		> div {
			> h3 {
				color: ${colors.secondary};
				font-size: 2.8rem;
				font-weight: 500;
				line-height: 3.3rem;
			}
		}

		@media screen and (min-width: ${screens.medium}px) {
			> div {
				margin-left: 1.6rem;
			}
		}
	`}
`;

export const Content = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		flex-direction: column;
		margin-top: 0.4rem;

		> span {
			line-height: 2.4rem;
			margin-bottom: 0.8rem;
		}

		> label {
			display: flex;
			flex-direction: column;
			margin-top: 1.6rem;
			line-height: 2.4rem;
		}

		> label > input {
			padding: 1rem;
			border: none;
			border-radius: ${metrics.baseRadius}rem;
			background: ${colors.lightGray4};
			margin-top: 0.8rem;

			:focus {
				box-shadow: 0 0 0 1.5pt ${colors.primary};
			}
		}
	`}
`;

export const Actions = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: flex-end;
		margin-top: 2.2rem;

		@media screen and (max-width: ${screens.small}px) {
			flex-direction: column;
			button:first-child {
				order: 2;
			}
		}
	`}
`;

export const QuantityField = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		> span:first-child {
			margin-top: 0.8rem;
		}

		> div {
			display: flex;
			align-items: center;
			padding: 0.8rem;
			margin-top: 0.8rem;
			max-width: 12.8rem;
			width: 100%;

			border-radius: ${metrics.baseRadius}rem;
			background-color: ${colors.lightGray4};

			> span {
				width: 100%;
				text-align: center;
			}

			> button {
				outline: none;
				border: none;
				background: none;

				:disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}
			}

			> button > svg {
				color: ${colors.secondary};
				width: 2.4rem;
				height: 2.4rem;
			}
		}
	`}
`;

export const TechnologyUseField = styled.div`
	display: flex;
	flex-direction: column;

	margin-top: 1.6rem;

	> div {
		display: flex;
		flex-wrap: wrap;
	}
`;

export const RadioWrapper = styled.div`
	${({ theme: { colors, metrics, screens } }) => css`
		display: flex;
		justify-content: center;
		margin-top: 0.8rem;

		> input {
			appearance: none;
		}

		> input:checked + label {
			color: ${colors.secondary};
			background-color: ${colors.white};
			box-shadow: 0 0 0 1.5pt ${colors.secondary};
		}

		> label {
			background-color: ${colors.lightGray4};
			border-radius: ${metrics.baseRadius}rem;
			color: ${colors.lightGray};
			text-align: center;
			flex-grow: 1;
			padding: 0.8rem;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: 500;
			line-height: 2.4rem;
		}

		:not(:last-child) {
			margin-right: 0.8rem;
		}

		:focus-within > label {
			box-shadow: 0 0 0 1.5pt ${colors.secondary};
		}

		@media screen and (min-width: ${screens.medium}px) {
			flex-grow: 1;
		}
	`}
`;

export const CancelButton = styled(Button).attrs(() => ({ type: 'button' }))``;
