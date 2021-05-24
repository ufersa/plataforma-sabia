import styled, { css } from 'styled-components';

export const Wrapper = styled.main``;

export const Title = styled.h1`
	${({ theme: { colors, screens } }) => css`
		font-size: 5.6rem;
		line-height: 6.6rem;
		color: ${colors.secondary};
		margin-bottom: 1.4rem;

		@media (max-width: ${screens.medium}px) {
			font-size: 3.6rem;
			line-height: 4.3rem;
		}
	`}
`;

export const Background = styled.section`
	${({ theme: { colors }, gray }) => css`
		display: flex;
		background-color: ${gray ? colors.lightGray4 : colors.white};
	`}
`;

export const ShowcaseHeader = styled.div`
	${({ theme: { screens, colors } }) => css`
		max-width: ${screens.large}px;
		flex-grow: 1;
		margin: 0 auto;
		padding: 8.2rem 5%;

		p {
			color: ${colors.silver};
			max-width: 47rem;
		}
	`}
`;

export const ListWrapper = styled.div`
	${({ theme: { screens } }) => css`
		max-width: ${screens.large}px;
		flex-grow: 1;
		margin: 0 auto;
		padding: 3.2rem 5%;
	`}
`;
