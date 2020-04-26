import styled from 'styled-components';

export const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 8rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		height: 6rem;
	}
`;

export const Container = styled.div`
	width: 100%;
	padding-left: 1rem;
	display: flex;
	justify-content: space-between;
`;

export const LeftContent = styled.div`
	display: flex;
	align-items: center;
`;

export const LogoContainer = styled.div`
	border-right: 0.1rem solid ${({ theme }) => theme.colors.border};
	width: 100%;

	img {
		height: auto;
		width: 80%;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		border-right: none;
	}
`;

export const MenuLinksWrapper = styled.nav`
	@media (max-width: ${({ theme }) => theme.screens.huge}px) {
		display: none;
	}
`;

export const MenuLinksList = styled.ul`
	display: flex;
	justify-content: space-between;
	padding-left: 2rem;
`;

export const MenuLinksItem = styled.li`
	font-size: 1.7rem;

	a {
		padding: 0 3rem;
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.black};

		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

export const RightContent = styled.div`
	display: flex;
	align-items: center;
`;

export const LoginBox = styled.div`
	border-left: 0.1rem solid ${({ theme }) => theme.colors.border};
	border-right: 0.1rem solid ${({ theme }) => theme.colors.border};
	padding: 0 2rem;
	height: 100%;
	svg {
		height: ${({ theme }) => theme.sizes.bigIcon}rem;
		width: ${({ theme }) => theme.sizes.bigIcon}rem;
	}

	button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.colors.mediumGray};
		background: none;
		border: 0;
		margin-top: 0.2rem;
		font-size: 1.2rem;
		height: 100%;
		transition: color 0.3s;
		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		border-left: none;

		a {
			font-size: 1rem;
		}

		svg {
			height: ${({ theme }) => theme.sizes.defaultIcon}rem;
			width: ${({ theme }) => theme.sizes.defaultIcon}rem;
		}
	}
`;

export const Button = styled.a`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
	padding: 2rem 3.5rem;
	text-transform: uppercase;
	letter-spacing: 0.2rem;
	font-size: 1.6rem;
	line-height: 1.8rem;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;

	:hover {
		background-color: ${({ theme }) => theme.colors.darkGray};
		color: ${({ theme }) => theme.colors.white};
		cursor: pointer;
	}

	span {
		display: block;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		display: none;
	}
`;
