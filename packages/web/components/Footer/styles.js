import styled, { css } from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
`;

export const FooterHeader = styled.div`
	${({ theme: { colors, screens } }) => css`
		padding: 0 3rem;
		background-color: ${colors.primary};
		display: flex;

		@media (max-width: ${screens.large}px) {
			padding: 0;
		}
	`}
`;

export const FooterHeaderContainer = styled.div`
	${({ theme: { metrics, screens } }) => css`
		max-width: ${metrics.containerWidth}rem;
		width: 100%;
		height: 8rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;

		> a {
			padding: 1rem 0;
			img {
				width: 100%;
			}
		}
	`}
`;

export const FooterText = styled.p`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.white};
		font-weight: 500;
		font-size: 3rem;
		line-height: 100%;

		@media (max-width: ${screens.large}px) {
			display: none;
		}
	`}
`;

export const FooterIconsList = styled.ul`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-around;
		height: 100%;

		@media (max-width: ${screens.large}px) {
			width: 100%;
		}
	`}
`;

export const FooterIconsListItem = styled.li`
	${({ theme: { colors, sizes, screens } }) => css`
		font-size: 2.4rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25%;
		padding: 0 5rem;
		border-left: 1px solid ${colors.white};

		&:last-of-type {
			border-right: 1px solid ${colors.white};
		}

		a {
			color: ${colors.white};
		}

		svg {
			height: ${sizes.defaultIcon}rem;
			width: ${sizes.defaultIcon}rem;
		}

		@media (max-width: ${screens.large}px) {
			padding: 0;
			border-left: 0;

			& + li {
				border-left: 1px solid ${colors.white};
			}

			&:last-of-type {
				border-right: 0;
			}
		}
	`}
`;

export const SiteInfo = styled.div`
	${({ theme: { colors } }) => css`
		padding: 3.2rem 2.2rem;
		background-color: ${colors.secondary};
	`}
`;

export const SiteInfoContainer = styled.div`
	${({ theme: { screens } }) => css`
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
		row-gap: 1rem;
		grid-gap: 2rem 0rem;
		column-gap: 1rem;
		row-gap: 1rem;

		@media (max-width: ${screens.huge}px) {
			> div:first-child {
				grid-column: 1 / -1;
			}
		}

		@media (max-width: ${screens.large}px) {
			grid-template-columns: repeat(auto-fit, minmax(13.7rem, 1fr));
			grid-gap: 2.4rem 0;
		}

		img {
			max-width: 100%;
		}
	`}
`;

export const SiteInfoListTitle = styled.h4`
	${({ theme: { colors, screens } }) => css`
		font-weight: 500;
		margin-bottom: 0.8rem;
		font-size: 2.4rem;
		color: ${colors.white};

		@media (max-width: ${screens.large}px) {
			font-size: 1.6rem;
		}
	`}
`;

export const SiteInfoListItem = styled.li`
	${({ theme: { colors, screens } }) => css`
		width: 100%;
		color: ${colors.secondary};
		padding-bottom: 0.8rem;

		& + li {
			padding-top: 0.8rem;
		}

		a {
			font-weight: 500;
			font-size: 1.6rem;
			color: ${colors.white};

			:hover {
				color: ${colors.primary};
			}

			@media (max-width: ${screens.large}px) {
				font-size: 1.4rem;
			}
		}
	`}
`;

export const SiteSocket = styled.div`
	color: ${({ theme }) => theme.colors.secondary};
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	padding: 6rem 3rem;
	font-size: 1.4rem;
	letter-spacing: 0.07rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 3rem;
	}
`;

export const SiteSocketContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;

		max-width: ${`${screens.large}px`};
		margin: 0 auto;

		> div {
			width: 50%;
		}

		span {
			font-weight: bold;
		}

		@media (max-width: ${({ theme }) => theme.screens.large}px) {
			flex-direction: column;

			div {
				text-align: center;
				margin-bottom: 3rem;
				width: 100%;
			}
		}
	`}
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
		font-weight: 500;
		color: ${({ theme }) => theme.colors.secondary};
		:hover {
			color: ${({ theme }) => theme.colors.darkGreen};
		}
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin: 2rem 0;
	}
`;

export const LogosContainer = styled.div`
	img {
		display: block;
	}

	display: flex;
	flex-direction: row;
	gap: 16px;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;
