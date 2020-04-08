import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 9rem;
`;

export const Container = styled.div`
	width: 100%;
	padding: 0 3.5rem;
	display: flex;
	justify-content: space-between;
`;

export const LeftContent = styled.div`
	display: flex;
	align-items: center;
`;

export const LogoContainer = styled.div`
	border-right: 0.1rem solid ${({ theme }) => theme.colors.border};
	padding: 0 1rem;
	padding-right: 2rem;
`;

export const MenuLinksWrapper = styled.nav``;

export const MenuLinksList = styled.ul`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem;
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
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-left: 0.1rem solid ${({ theme }) => theme.colors.border};
	padding-left: 3.5rem;

	a {
		color: ${({ theme }) => theme.colors.mediumGray};

		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

export const Button = styled.a`
	padding: 3.2rem 3rem;
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
	}
`;
