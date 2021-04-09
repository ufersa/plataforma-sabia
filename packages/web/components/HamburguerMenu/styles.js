import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: none;
	margin: 0 1.5rem;
	position: relative;
	width: 4rem;
	height: 4rem;

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		display: initial;
	}
`;

export const Menu = styled.div`
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 2;

	${({ open }) =>
		open &&
		css`
			div:first-child {
				-webkit-transform: rotate(-45deg) translate(-0.8rem, 0.6rem);
				transform: rotate(-45deg) translate(-0.8rem, 0.6rem);
			}

			div:nth-child(2) {
				opacity: 0;
			}

			div:last-child {
				-webkit-transform: rotate(45deg) translate(-0.9rem, -0.8rem);
				transform: rotate(45deg) translate(-0.9rem, -0.8rem);
			}
		`}
`;

export const Bar = styled.div`
	width: 3.5rem;
	height: 0.5rem;
	background-color: ${({ theme, secondary }) =>
		secondary ? theme.colors.secondary : theme.colors.primary};
	margin: 0.6rem 0;
	transition: 0.4s;
`;

export const Nav = styled.nav`
	background-color: ${({ theme }) => theme.colors.white};
	z-index: 1;
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	text-align: center;
	opacity: 0;
	transition: all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
	transform: scale(0);

	${({ open }) =>
		open &&
		css`
			opacity: 1;
			transform: scale(1);
		`}
`;

export const NavList = styled.ul`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const NavListItem = styled.li`
	padding: 2.5rem 0;
	display: flex;
	flex-direction: column;

	a {
		color: ${({ selected, theme }) => (selected ? theme.colors.secondary : theme.colors.black)};
		font-size: 2rem;
		text-transform: uppercase;

		&.active {
			color: ${({ theme }) => theme.colors.secondary};
		}

		&:hover {
			color: ${({ theme }) => theme.colors.darkGreen};
		}
	}

	.sublink {
		font-size: 1.8rem;
		margin: 1rem 0;
		color: ${({ theme }) => theme.colors.lightGray2};
	}
`;

export const ButtonLink = styled.button`
	background: none;
	border: none;
	outline: none;

	text-transform: uppercase;
	font-size: 2rem;
`;
