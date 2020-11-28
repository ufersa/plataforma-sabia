import styled, { css } from 'styled-components';

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 8rem 2.2rem;

		@media (max-width: ${screens.large}px) {
			padding: 21.7rem 2.2rem;
			width: ${`${screens.medium}px`};

			img {
				display: none;
			}
		}
	`}
`;

export const TextContainer = styled.div`
	${({ theme: { screens } }) => css`
		margin-right: 7rem;

		@media (max-width: ${screens.large}px) {
			margin-right: 0;
		}
	`}
`;

export const Title = styled.h1`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.secondary};
		font-size: 5.6rem;
		line-height: 6.6rem;
		margin-bottom: 3.2rem;

		@media (max-width: ${screens.medium}px) {
			font-size: 3.6rem;
			line-height: 4.3rem;
			margin-bottom: 1.6rem;
			letter-spacing: -0.1rem;
		}
	`}
`;

export const Subtitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 1.6rem;
		line-height: 150%;
		margin-bottom: 3.2rem;
		font-weight: 500;
	`}
`;
