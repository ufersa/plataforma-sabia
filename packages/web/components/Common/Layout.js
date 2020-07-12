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
	flex: 1;
	padding: 0 1rem;
`;

export const Row = styled.div`
	${({ align, justify, mt, mb }) => css`
		display: flex;
		align-items: ${align || 'stretch'};
		justify-content: ${justify || 'flex-start'};
		margin-top: ${mt || 0}rem;
		margin-bottom: ${mb || 1}rem;
	`}

	@media (max-width: ${({ theme }) => theme.screens.large}px) {
		flex-direction: column;
	}
`;

export const Cell = styled.div`
	${({ theme: { screens }, col, align, maxWidth }) => css`
		flex: ${col || 1};
		margin: 0 1rem;
		text-align: ${align || 'left'};
		max-width: ${maxWidth && maxWidth}rem;

		@media (max-width: ${screens.large}px) {
			max-width: initial;
		}

		@media (max-width: ${screens.medium}px) {
			margin: 0;
		}
	`}
`;
