import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const Container = styled.div`
	width: 100%;
	padding: 0 35px;
	display: flex;
	justify-content: space-between;
`;

export const LeftContent = styled.div`
	display: flex;
	align-items: center;

	div {
		border-right: 1px solid #efefef;
		padding: 10px;

		a {
			img {
				height: auto;
				margin-right: 20px;
				padding-right: 20px;
			}
		}
	}

	nav {
		ul {
			display: flex;
			justify-content: space-between;
			padding: 4px 20px;

			li {
				font-size: 1.7rem;
				line-height: 27px;
				font-weight: 500;

				a {
					padding: 6px 30px;
					text-transform: uppercase;
					color: #232628;
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
	border-left: 1px solid #efefef;
	padding-left: 35px;

	a {
		color: #999;
	}
`;

export const Button = styled.a`
	font-weight: 500;
	padding: 32px 30px;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.6rem;
	line-height: 18px;
	background-color: #ff5e14;
	color: #fff;
	text-align: center;

	:hover {
		background-color: #111;
		color: #fff !important;
		cursor: pointer;
	}
`;
