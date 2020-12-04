import styled, { css } from 'styled-components';

export const Container = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.white};
		border-radius: 5px;
		width: 100%;
		max-width: 51.2rem;
		padding: 0.5rem 1.8rem;

		label {
			font-size: 1.6rem;
		}

		button {
			margin-top: 2rem;
		}

		h3 {
			font-size: 28px;
			font-style: normal;
			font-weight: 500;
			line-height: 33px;
			text-align: center;
			color: ${colors.secondary};
			margin-top: 2.8rem;
		}
	`}
`;

const buttonModifiers = {
	outlined: (colors) => css`
		background: none;
		color: ${colors.red};
		border: 2px solid ${colors.red};
		padding: 0.2rem 0.6rem;

		:hover,
		:focus {
			color: ${colors.white};
			background-color: ${colors.red};
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
	${({ theme: { colors }, variant = 'contained' }) => css`
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
	`}
`;
