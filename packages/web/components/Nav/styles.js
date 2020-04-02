import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
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

	div {
		border-right: 1px solid ${({ theme }) => theme.colors.border};
		padding: 1rem;

		a {
			img {
				height: auto;
				padding-right: 2rem;
			}
		}
	}

	nav {
		ul {
			display: flex;
			justify-content: space-between;
			padding: 0 2rem;

			li {
				font-size: 1.7rem;

				a {
					padding: 0.6rem 3rem;
					text-transform: uppercase;
					color: ${({ theme }) => theme.colors.black};
				}
			}
		}
	}
`;

export const RightContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-left: 1px solid ${({ theme }) => theme.colors.border};
	padding-left: 3.5rem;

	a {
		color: ${({ theme }) => theme.colors.mediumGray};
	}
`;

export const Button = styled.a`
	padding: 3.2rem 3rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.6rem;
	line-height: 18px;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;

	:hover {
		background-color: ${({ theme }) => theme.colors.darkGray};
		color: ${({ theme }) => theme.colors.white} !important;
	}
`;
