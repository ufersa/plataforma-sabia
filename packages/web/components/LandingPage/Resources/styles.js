import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.primary};
	`}
`;

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 3.2rem 2.2rem;

		.slick-slide {
			padding: 1rem;
		}

		@media (max-width: ${screens.large}px) {
			width: 100%;
			padding: 0 0 0 2.2rem;

			.slick-list {
				padding: 3.2rem;
			}
		}

		@media (max-width: ${screens.medium}px) {
			.slick-list {
				padding: 2.2rem;
			}
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.white};
		font-size: 3.6rem;
		line-height: 100%;
	`}
`;
