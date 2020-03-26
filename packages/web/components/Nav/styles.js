import styled from 'styled-components';

export const Header = styled.header`
	height: 64px;
	display: flex;
	justify-content: space-between;
`;

export const Container = styled.div`
	width: 100%;
	padding: 35px 20px;
	display: flex;
	justify-content: space-between;
`;

export const LeftContent = styled.div`
	display: flex;
	align-items: center;

	img {
		height: auto;
		margin-right: 20px;
		padding-right: 20px;
		border-right: 2px solid #eee;
	}

	nav {
		ul {
			display: flex;
			justify-content: space-between;
			padding: 4px 20px;
			align-items: center;
			font-size: 1.4rem;
			text-transform: uppercase;

			li {
				display: flex;
				padding: 6px 30px;

				a {
					font-weight: bold;
					color: #4b4d4f;

					:hover {
						opacity: 0.7;
					}
				}
			}
		}
	}
`;

export const RightContent = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 2px solid #eee;
		padding-left: 20px;

		a {
			color: #999;
			font-size: 1.2rem;

			:hover {
				opacity: 0.7;
			}
		}
	}
`;

export const Button = styled.button`
	background-color: #ef4136;
	border: 1px solid #ef4136;
	padding: 16px 32px;
	text-align: center;
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 1.3rem;
	transition-duration: 0.2s;

	:hover {
		background-color: #fff;
		color: #ef4136;
	}
`;
