import styled from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.darkGray};
`;

export const FooterHeader = styled.div`
	padding: 0 3rem;
	margin: 0;
	width: 100%;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.darkWhite};
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
`;

export const FooterIconsList = styled.ul`
	display: flex;
`;

export const FooterIconsListItem = styled.li`
	border-left: 0.1rem solid ${({ theme }) => theme.colors.darkWhite};
	padding: 0 3rem;

	a {
		color: ${({ theme }) => theme.colors.white};
		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

export const SiteInfoContainer = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}px;
	width: 100%;
	margin: 0 auto;
	padding: 9rem 0;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
	grid-gap: 2rem 0rem;
`;

export const Widget = styled.div`
	h4 {
		text-transform: uppercase;
		margin-bottom: 3rem;
	}

	ul li {
		padding: 1rem 0;
		width: 100%;
		color: ${({ theme }) => theme.colors.mediumWhite};
		letter-spacing: 0.1rem;

		a {
			font-weight: 400;
			color: ${({ theme }) => theme.colors.mediumWhite};
			:hover {
				color: ${({ theme }) => theme.colors.white};
			}
		}
	}
`;

export const SiteSocket = styled.div`
	border-top: 0.1rem solid ${({ theme }) => theme.colors.darkWhite};
	color: ${({ theme }) => theme.colors.mediumWhite};
	width: 100%;
	padding: 6rem 0;
	font-size: 1.4rem;
	letter-spacing: 0.07rem;
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
`;

export const SiteSocketList = styled.ul`
	display: flex;
	align-items: center;
`;

export const SiteSocketListItem = styled.li`
	margin-left: 1.5rem;

	a {
		color: ${({ theme }) => theme.colors.mediumWhite};
		:hover {
			color: ${({ theme }) => theme.colors.white};
		}
	}
`;
