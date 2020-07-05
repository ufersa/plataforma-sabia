import styled, { css } from 'styled-components';

export const SearchBoxContainer = styled.div`
	border: 2rem solid ${({ theme }) => theme.colors.secondary};
`;

export const Container = styled.main`
	display: flex;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.colors.whiteSmoke};
	padding: 3rem 4rem 6rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		padding: 2rem 2rem 3rem;
	}
`;

export const FilterContainer = styled.section`
	${({ theme: { colors, screens }, openMobile }) => css`
		flex: 1;
		margin-right: 3rem;
		min-width: 30rem;

		@media (max-width: ${screens.large}px) {
			display: none;

			${openMobile &&
				css`
					display: block;
					background: ${colors.white};
					border-radius: 1.6rem;
					left: 0;
					max-width: initial;
					padding-bottom: 4rem;
					position: absolute;
					bottom: 0;
					transform: translateY(4rem);
					transition: transform 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
					width: 100%;
					will-change: transform;
					z-index: 1;
				`}
		}
	`}
`;

export const FilterContainerHeader = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		align-items: center;
		min-height: 8rem;
		border-bottom: 0.1rem solid ${colors.border};

		h2 {
			flex: 1;
			font-size: 2.4rem;
			color: ${colors.darkGray};
		}

		@media (max-width: ${screens.large}px) {
			padding: 3rem;
		}
	`}
`;

export const MobileButtonsContainer = styled.div`
	${({ theme: { screens, colors } }) => css`
		display: none;
		border-bottom: 0.1rem solid ${colors.gray98};
		padding-top: 2rem;

		> button {
			width: 100%;
		}

		@media (max-width: ${screens.large}px) {
			display: block;
		}
	`}
`;

export const FilterContainerBody = styled.div`
	${({ theme: { screens } }) => css`
		@media (max-width: ${screens.large}px) {
			padding: 3rem;
		}
	`}
`;

export const ResultsContainer = styled.section`
	width: 100%;

	.ais-Hits {
		padding-top: 4rem;

		.ais-Hits-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
			grid-gap: 5rem 3rem;
		}
	}
`;

export const ResultsContainerHeader = styled.div`
	min-height: 8rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	> div:first-child {
		flex: 1;
	}

	> div:last-child {
		margin-left: 3rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		align-items: flex-end;

		> div {
			margin-bottom: 2rem;
		}
	}
`;

export const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
`;
