import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: none;
	margin: 0 1.5rem;

	@media (max-width: ${({ theme }) => theme.screens.huge}px) {
		display: inline-block;
	}
`;

export const Menu = styled.div`
	cursor: pointer;

	${(props) =>
		props.open &&
		css`
			div:first-child {
				-webkit-transform: rotate(-45deg) translate(-0.9rem, 0.6rem);
				transform: rotate(-45deg) translate(-0.9rem, 0.6rem);
			}

			div:nth-child(2) {
				opacity: 0;
			}

			div:last-child {
				-webkit-transform: rotate(45deg) translate(-0.8rem, -0.8rem);
				transform: rotate(45deg) translate(-0.8rem, -0.8rem);
			}
		`}
`;

export const Bar = styled.div`
	width: 3.5rem;
	height: 0.5rem;
	background-color: ${({ theme }) => theme.colors.primary};
	margin: 0.6rem 0;
	transition: 0.4s;
`;

export const Nav = styled.nav`
	opacity: 0;
	background-color: ${({ theme }) => theme.colors.orange};
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	height: 100%;
	width: 100%;
	display: table;
	text-align: center;

	${(props) =>
		props.open &&
		css`
			opacity: 1;
		`}
`;
