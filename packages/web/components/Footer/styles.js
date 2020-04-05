import styled from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.darkGray};
`;

export const FooterHeader = styled.div`
	padding: 0 3rem;
	margin: 0;
	width: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.colors.darkWhite};
`;

export const FooterHeaderContainer = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;

	> a {
		padding: 1rem 0;
	}

	ul {
		display: flex;

		li {
			border-left: 1px solid ${({ theme }) => theme.colors.darkWhite};
			padding: 0 3rem;
			a {
				color: ${({ theme }) => theme.colors.white};
			}
		}
	}
`;

export const SiteInfo = styled.div`
	padding: 9rem 3rem;
`;

export const SiteInfoContainer = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}px;
	width: 100%;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-gap: 2rem 0rem;
`;

export const Widget = styled.div`
	h4 {
		text-transform: uppercase;
		margin-bottom: 3rem;
	}

	div ul li {
		padding: 1rem 0;
		width: 100%;
		color: ${({ theme }) => theme.colors.mediumWhite};
		a {
			font-weight: 400;
			color: ${({ theme }) => theme.colors.mediumWhite};
			letter-spacing: 0.8px;
			:hover {
				color: ${({ theme }) => theme.colors.white} !important;
			}
		}
	}
`;

export const SiteSocket = styled.div`
	border-top: 1px solid ${({ theme }) => theme.colors.darkWhite};
	color: ${({ theme }) => theme.colors.mediumWhite};
	width: 100%;
	padding: 6rem 0;
	font-size: 1.4rem;
	letter-spacing: 0.7px;
`;

export const SiteSocketContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: ${({ theme }) => theme.metrics.containerWidth}px;
	width: 100%;
	margin: 0 auto;

	div > span {
		font-weight: bold;
	}

	ul {
		display: flex;
		align-items: center;

		li {
			margin-left: 1.5rem;
			a {
				color: ${({ theme }) => theme.colors.mediumWhite};
				:hover {
					color: ${({ theme }) => theme.colors.white} !important;
				}
			}
		}
	}
`;
