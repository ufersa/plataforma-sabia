import styled, { css } from 'styled-components';

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 4.8rem 2.2rem;
		overflow-x: hidden;

		.feature-slider {
			margin-bottom: 8rem;

			&:last-of-type {
				margin-bottom: 0;
			}
		}

		@media (max-width: ${screens.large}px) {
			width: ${`${screens.medium}px`};

			.feature-slider {
				margin-bottom: 5.2rem;
			}
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		font-size: 3.6rem;
		line-height: 100%;
		margin-bottom: 4.8rem;
		text-align: center;
	`}
`;
