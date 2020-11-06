/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
	${({ theme: { metrics, screens }, bgColor, color, uppercase, disabled }) => css`
		background-color: ${bgColor};
		color: ${color};
		border-radius: ${metrics.baseRadius}rem;
		border: none;
		font-size: 2.2rem;
		text-transform: ${uppercase ? 'uppercase' : 'none'};
		padding: 1.8rem 6rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;

		:hover {
			opacity: 0.8;
		}

		${disabled &&
			css`
				opacity: 0.8;
				cursor: not-allowed;
			`}

		@media (max-width: ${screens.medium}px) {
			font-size: 1.6rem;
			padding: 1.4rem 6rem;
		}
	`}
`;

export const CircularButton = styled.button`
	align-items: center;
	justify-content: center;
	background-color: ${({ bgColor }) => bgColor};
	color: ${({ color }) => color};
	border-radius: 100%;
	height: ${({ height }) => (height ? `${height}rem` : '100%')};
	${({ width }) => (width ? `width: ${width}rem` : '')};
	border: none;
	font-size: ${({ size }) =>
		size === 'small' ? '1.2rem' : size === 'medium' ? '1.6rem' : '2rem'};
	text-transform: uppercase;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	padding: ${({ size }) => (size === 'small' ? '0.2rem !important' : '1rem !important')};

	float: ${({ float }) => float || 'right'};

	:hover {
		opacity: 0.8;
	}

	display: flex;
	position: relative;
`;

export default StyledButton;
