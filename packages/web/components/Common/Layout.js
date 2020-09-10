import styled, { css } from 'styled-components';

export const ContentContainer = styled.div`
	background-color: ${(props) => props.bgColor};
	padding: 9rem 5%;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 6rem 1%;
	}
`;

export const ColumnContainer = styled.div`
	display: flex;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
	}
`;

export const Column = styled.div`
	${({ autoX }) => (autoX ? 'margin: 0 auto;' : 'flex:1; ')}
	${({ noPadding }) => (noPadding ? '' : 'padding: 0 1rem;')}
	${({ flex }) => (flex ? 'display: flex;' : '')}
	${({ align }) => (align ? `align-items: ${align};` : '')}

`;

export const Row = styled.div`
	${({ align, justify, mt, mb, color }) => css`
		display: flex;
		align-items: ${align || 'stretch'};
		justify-content: ${justify || 'flex-start'};
		margin-top: ${mt || 0}rem;
		margin-bottom: ${mb ?? 1}rem;
		background-color: ${color || 'transparent'};
	`}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

export const Cell = styled.div`
	${({ theme: { screens }, col, align, maxWidth }) => css`
		flex: ${col || 1};
		margin: 0 1rem 0 0;
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
