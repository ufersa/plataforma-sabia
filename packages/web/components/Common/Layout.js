import styled, { css } from 'styled-components';

export const ContentContainer = styled.div`
	${({ theme: { screens }, bgColor, padding }) => css`
		background-color: ${bgColor};
		padding: ${padding || '9rem 5%'};

		@media (max-width: ${screens.medium}px) {
			padding: 6rem 1%;
		}
	`}
`;

export const ColumnContainer = styled.div`
	display: flex;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const Column = styled.div`
	${({ theme: { screens }, autoX, noPadding, flex, align, mr, ml, noMarginMobile }) => css`
		${autoX ? 'margin: 0 auto;' : 'flex:1;'};
		${noPadding ? '' : 'padding: 0 1rem;'};
		${flex ? 'display: flex;' : ''};
		${align ? `align-items: ${align};` : ''};

		margin-right: ${mr ?? 0}rem;
		margin-left: ${ml ?? 0}rem;

		@media screen and (max-width: ${screens.medium}px) {
			${noMarginMobile &&
				css`
					margin-top: 0;
					margin-right: 0;
					margin-bottom: 0;
					margin-left: 0;
				`}
		}
	`}
`;

export const Row = styled.div`
	${({ align, justify, mt, mr, mb, ml, color, direction, grid, gridTemplateColumns, gridGap }) => css`
		${!grid &&
			css`
				display: flex;
				align-items: ${align || 'stretch'};
				justify-content: ${justify || 'flex-start'};
				flex-direction: ${direction || 'row'};
			`};

		${!!grid &&
			css`
				display: grid;
				grid-template-columns: ${gridTemplateColumns};
				grid-gap: ${gridGap};
			`};

		margin-top: ${mt ?? 0}rem;
		margin-right: ${mr ?? 0}rem;
		margin-bottom: ${mb ?? 1}rem;
		margin-left: ${ml ?? 0}rem;
		background-color: ${color || 'transparent'};
	`}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

export const Cell = styled.div`
	${({ theme: { screens }, col, align, maxWidth, margin }) => css`
		flex: ${col || 1};
		margin: ${margin || '0 1rem 0 0'};
		text-align: ${align || 'left'};

		${maxWidth &&
			css`
				max-width: ${maxWidth}rem;
			`};

		@media (max-width: ${screens.large}px) {
			max-width: initial;
			margin: 0 0 1rem 0;
		}

		@media (max-width: ${screens.medium}px) {
			margin: 0;
		}
	`}
`;
