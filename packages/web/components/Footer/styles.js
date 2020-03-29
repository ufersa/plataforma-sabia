import styled from 'styled-components';

export const Footer = styled.footer`
	width: 100%;
	background-color: #151515;
	margin: 0;
	padding: 0;
`;

export const FooterHeader = styled.div`
	padding: 0 30px;
	margin: 0;
	width: 100%;
	font-weight: 700;
	border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const FooterHeaderContainer = styled.div`
	max-width: 1280px;
	width: 100%;
	padding: 0;
	margin: 0 auto;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;

	> a {
		padding: 10px 0;
	}

	ul {
		display: flex;

		li {
			a {
				height: 100%;
				padding: 0 30px;
				border-left: 1px solid rgba(255, 255, 255, 0.07);
				color: #fff;
			}
		}
	}
`;

export const SiteInfo = styled.div`
	padding: 90px 30px;
`;

export const SiteInfoContainer = styled.div`
	max-width: 1280px;
	width: 100%;
	margin: 0 auto;

	display: flex;
	justify-content: space-between;
`;

export const Widget = styled.div`
	h3 {
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 30px;
		letter-spacing: 0.8px;
		line-height: 32px;
		font-size: 1.6rem;
		font-weight: 500;
	}

	div {
		ul {
			li {
				padding: 10px 0;
				width: 100%;
				color: rgba(255, 255, 255, 0.5);
				a {
					color: rgba(255, 255, 255, 0.5);
					letter-spacing: 0.8px;
					:hover {
						color: #fff !important;
					}
				}
			}
		}
	}
`;

export const SiteSocket = styled.div`
	border-top: 1px solid rgba(255, 255, 255, 0.07);
	width: 100%;
	padding: 60px 0;
	color: rgba(255, 255, 255, 0.5);
	font-size: 1.4rem;
	letter-spacing: 0.7px;
`;

export const SiteSocketContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: 1280px;
	width: 100%;
	margin: 0 auto;

	div {
		span {
			font-weight: bold;
		}
	}

	ul {
		display: flex;
		align-items: center;

		li {
			margin-left: 15px;
			a {
				color: rgba(255, 255, 255, 0.5);
				font-weight: bold;
				:hover {
					color: #fff !important;
				}
			}
		}
	}
`;
