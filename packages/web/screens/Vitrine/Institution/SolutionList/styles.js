import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
	`}
`;

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 3.2rem 2.2rem;
		max-width: 1440px;
		margin: 0 auto;

		.ais-HitsPerPage {
			display: none;
		}

		.ais-SortBy {
			padding: 0.8rem;
			background-color: ${colors.white};
			border-radius: 0.4rem;

			.ais-SortBy-select {
				color: ${colors.silver};
			}
		}
	`}
`;

export const Top = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-bottom: 1.8rem;
		border-bottom: 2px solid ${colors.lightGray2};

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
			align-items: flex-start;

			div {
				width: 100%;
			}
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors, screens } }) => css`
		font-size: 3.6rem;
		color: ${colors.silver};
		margin-right: 3rem;

		@media screen and (max-width: ${screens.medium}px) {
			font-size: 3rem;
		}
	`}
`;

export const SortWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		color: ${colors.silver};
		margin-left: 1.8rem;

		> span {
			text-transform: uppercase;
			font-weight: bold;
			font-size: 1.4rem;
			line-height: 2.4rem;
			margin-right: 0.8rem;
		}

		> svg {
			margin-right: 1rem;
		}
	`}
`;

export const Content = styled.div``;

export const algoliaListCss = css`
	${({ theme: { screens } }) => css`
		@media screen and (min-width: ${screens.medium}px) {
			.ais-Hits .ais-Hits-list {
				justify-content: center;
			}
		}
	`}
`;
