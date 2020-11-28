import styled, { css } from 'styled-components';

export const StyledFooter = styled.footer`
	width: 100%;
`;

export const FooterHeader = styled.div`
	${({ theme: { colors, screens } }) => css`
		padding: 0 3rem;
		width: 100%;
		background-color: ${colors.primary};
		display: none;

		@media (max-width: ${screens.medium}px) {
			padding: 0;
			display: flex;
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

		> a {
			padding: 1rem 0;
			img {
				width: 100%;
			}

			@media (max-width: ${screens.medium}px) {
				display: none;
			}
		}
	`}
`;

export const FooterIconsList = styled.ul`
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 100%;
`;

export const FooterIconsListItem = styled.li`
	${({ theme: { colors, sizes } }) => css`
		font-size: 2.4rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25%;

		& + li {
			border-left: 1px solid white;
		}

		a {
			color: ${colors.white};
		}

		svg {
			height: ${sizes.defaultIcon}rem;
			width: ${sizes.defaultIcon}rem;
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
	${({ theme: { metrics, screens } }) => css`
		max-width: ${metrics.containerWidth}rem;
		width: 100%;
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

		@media (max-width: ${screens.medium}px) {
			grid-template-columns: repeat(auto-fit, minmax(13.7rem, 1fr));
			grid-gap: 2.4rem 0;
		}
	`}
`;

export const SiteInfoListTitle = styled.h4`
	${({ theme: { colors, screens } }) => css`
		font-weight: 500;
		margin-bottom: 0.8rem;
		font-size: 2.4rem;
		color: ${colors.white};

		@media (max-width: ${screens.medium}px) {
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

			@media (max-width: ${screens.medium}px) {
				font-size: 1.4rem;
			}
		}
	`}
`;
