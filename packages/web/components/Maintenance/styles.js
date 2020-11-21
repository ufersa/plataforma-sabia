/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { colors, screens } }) => css`
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2rem;

		img {
			height: auto;
			width: 100%;
			max-width: 38rem;
			margin-bottom: 3.2rem;
		}

		h1 {
			color: ${colors.secondary};
			font-size: 2.8rem;
			font-weight: 600;
			line-height: 3.3rem;
			margin-bottom: 0.8rem;
			text-align: center;

			@media screen and (max-width: ${screens.small}px) {
				font-size: 2.2rem;
				text-align: justify;
			}
		}

		p {
			color: ${colors.lightGray2};
			font-size: 1.6rem;
			line-height: 2.4rem;
			width: 100%;
			max-width: 64rem;
			text-align: center;
			margin-bottom: 3.2rem;
			font-weight: 500;

			@media screen and (max-width: ${screens.small}px) {
				text-align: justify;
			}
		}
	`}
`;

export const Button = styled.button`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		outline: none;
		background: ${colors.secondary};
		color: ${colors.white};
		padding: 0.4rem 2rem;

		:hover,
		:focus {
			background: ${colors.darkGreen};
		}
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		@media screen and (max-width: ${screens.small}px) {
			align-self: stretch;
		}
	`}
`;
