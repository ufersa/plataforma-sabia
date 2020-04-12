import styled from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.darkGray};
`;

export const FooterHeader = styled.div`
	padding: 0 3rem;
	width: 100%;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.darkWhite};
`;

export const FooterHeaderContainer = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	height: 10rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;

	> a {
		padding: 1rem 0;

		@media (max-width: ${({ theme }) => theme.screens.medium}px) {
			display: none;
		}
	}
`;

export const FooterIconsList = styled.ul`
	display: flex;
	justify-content: space-between;
	width: 40%;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
		justify-content: space-between;
	}
`;

export const FooterIconsListItem = styled.li`
	font-size: 2.4rem;

	a {
		color: ${({ theme }) => theme.colors.white};
		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	svg {
		height: ${({ theme }) => theme.sizes.defaultIcon}rem;
		width: ${({ theme }) => theme.sizes.defaultIcon}rem;
	}
`;

export const SiteInfo = styled.div`
	padding: 9rem 3rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		text-align: center;
		padding: 3rem;
	}
`;

export const SiteInfoContainer = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	margin: 0 auto;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
	grid-gap: 2rem 0rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		grid-gap: 3.5rem 0rem;
	}
`;

export const SiteInfoListTitle = styled.h4`
	text-transform: uppercase;
	margin-bottom: 3rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin-bottom: 1rem;
	}
`;

export const SiteInfoListItem = styled.li`
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
`;

export const SiteSocket = styled.div`
	border-top: 0.1rem solid ${({ theme }) => theme.colors.darkWhite};
	color: ${({ theme }) => theme.colors.mediumWhite};
	width: 100%;
	padding: 6rem 3rem;
	font-size: 1.4rem;
	letter-spacing: 0.07rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 3rem;
	}
`;

export const SiteSocketContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	margin: 0 auto;

	span {
		font-weight: bold;
	}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		flex-direction: column;

		div {
			text-align: center;
			margin-bottom: 3rem;
		}
	}
`;

export const SiteSocketList = styled.ul`
	display: flex;
	align-items: center;

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		width: 100%;
		justify-content: space-around;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const SiteSocketListItem = styled.li`
	margin-left: 1.5rem;

	a {
		color: ${({ theme }) => theme.colors.mediumWhite};
		:hover {
			color: ${({ theme }) => theme.colors.white};
		}
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin: 2rem 0;
	}
`;
