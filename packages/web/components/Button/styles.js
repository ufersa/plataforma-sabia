/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${(props) => props.bgColor};
	color: ${(props) => props.color};
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border: none;
	font-size: 2.2rem;
	text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
	padding: 1.8rem 6rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;

	:hover {
		opacity: 0.8;
	}

	${(props) => props.disabled && `opacity: 0.8;`}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		font-size: 1.6rem;
		padding: 1.4rem 6rem;
	}
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
