import styled from 'styled-components';

export const HeroImage = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero.jpg');
	height: 70vh;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
`;

export const Content = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}rem;
	width: 100%;
	padding: 0 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	h1 {
		margin-bottom: 1.5rem;
	}

	p {
		color: white;
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

export const SearchBox = styled.div`
	box-shadow: 0 0 9rem -1.5rem ${({ theme }) => theme.colors.darkWhite};
	border: none;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;

	form {
		padding: 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		input {
			flex-grow: 1;
			padding: 1.8rem 2rem;
			margin-right: 3rem;
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			font-size: 2rem;
			line-height: 1.9rem;
			color: ${({ theme }) => theme.colors.black};
		}
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		form {
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
			padding: 2rem;

			input {
				margin-right: 0;
				margin-bottom: 1rem;
			}
		}
	}
`;
