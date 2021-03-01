import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	> section:first-child {
		margin-right: 4rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 2rem;

		> section:first-child {
			margin-right: 0;
		}
	}

	@media screen and (max-width: 950px) {
		flex-direction: column;
	}
`;

export const MainContentContainer = styled.section`
	width: 100%;
`;

export const MainContent = styled.div`
	${({ theme: { colors, screens } }) => css`
		min-height: 80vh;
		margin-top: 40px;

		h3 {
			font-size: 24px;
			color: ${colors.lightGray2};
			margin-bottom: 16px;
		}

		button {
			margin: 0;
		}

		@media (max-width: ${screens.medium}px) {
			padding: 0;
		}
	`};
`;

export const FormContainer = styled.div`
	padding: 1rem;
	background-color: ${({ theme }) => theme.colors.gray98};
	border-radius: 5px;

	> div {
		display: flex;

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			flex-direction: column;
		}
	}
`;

export const buttonModifiers = {
	outlined: (colors) => css`
		background: none;
		color: ${colors.secondary};
		border: 2px solid transparent;
		padding: 0.2rem 0.6rem;

		:hover,
		:focus {
			border-color: ${colors.secondary};
		}
	`,
	contained: (colors) => css`
		background: ${colors.secondary};
		color: ${colors.white};
		padding: 0.4rem 0.8rem;

		:hover,
		:focus {
			background: ${colors.darkGreen};
		}
	`,
};

export const Button = styled.button`
	${({ theme: { colors }, variant = 'contained', wrapperCss = '' }) => css`
		display: flex;
		align-items: center;
		align-self: center;
		border: none;
		outline: none;

		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		> svg {
			margin-right: 0.4rem;
		}

		:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		${buttonModifiers[variant](colors)};
		${wrapperCss}
	`}
`;

export const ButtonChangeEmail = styled.button`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.lightGray6};

		display: flex;
		align-items: center;
		align-self: center;
		padding: 0;
		border: none;
		margin: 1.3rem 0 0 !important;
		outline: none;
		height: 4.4rem;
		border-top-right-radius: ${metrics.baseRadius}rem;
		border-bottom-right-radius: ${metrics.baseRadius}rem;

		text-transform: uppercase;
		font-size: 14px;
		font-weight: bold;

		> svg {
			margin-right: 0.4rem;
			font-size: 20px;
		}

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const inputEmailWrapperCss = css`
	flex: 1;
`;

export const buttonInstitutionsWrapperCss = css`
	margin-top: 1.3rem !important;
`;

export const buttonAddAreasWrapperCss = css`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1.2rem;
		width: 100%;

		@media screen and (min-width: ${screens.large}px) {
			max-width: 8rem;
		}
	`}
`;
