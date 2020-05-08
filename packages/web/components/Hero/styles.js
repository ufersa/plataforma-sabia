import styled from 'styled-components';

export const HeroImage = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero.jpg');
	height: 70vh;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	padding: 0 1rem;
	height: 46vh;
	h1 {
		margin-bottom: 1.5rem;
	}

	p {
		color: ${({ theme }) => theme.colors.white};
		line-height: 1.6;
		font-size: 2rem;
		margin-bottom: 4rem;
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
