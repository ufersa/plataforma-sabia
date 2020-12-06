import styled, { css } from 'styled-components';

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 4.8rem 2.2rem;

		@media (max-width: ${screens.large}px) {
			width: ${`${screens.medium}px`};
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		font-size: 3.6rem;
		line-height: 100%;
		margin-bottom: 4.8rem;
	`}
`;
