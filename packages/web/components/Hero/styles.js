import styled, { css } from 'styled-components';

export const HeroImage = styled.div`
	${({ image }) => css`
		background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image});
		height: 70vh;

		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		justify-content: center;
		align-items: center;
	`};
`;

export const Content = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	padding: 0 1rem;

	h1 {
		font-size: 5.6rem;
		margin-bottom: 1.6rem;
	}

	p {
		font-family: 'Rubik';
		color: ${({ theme }) => theme.colors.white};
		line-height: 1.2;
		font-size: 2.8rem;
		margin-bottom: 0.8rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		h1 {
			line-height: 1.3;
			font-size: 3.5rem;
			margin-bottom: 1rem;
		}

		p {
			margin-bottom: 3rem;
			line-height: 1.3;
		}
	}
`;
