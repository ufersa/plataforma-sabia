import styled from 'styled-components';

export const HeroImage = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero.jpg');
	height: 65%;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
`;

export const Content = styled.div`
	max-width: ${({ theme }) => theme.metrics.containerWidth}px;
	width: 100%;
	padding: 0 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: left;

	h1 {
		color: white;
		margin-bottom: 1.5rem;
	}

	p {
		color: white;
		line-height: 1.6;
		font-size: 2rem;
		margin-bottom: 4rem;
	}
`;

export const SearchBox = styled.div`
	box-shadow: 0px 0px 90px -15px rgba(41, 44, 28, 0.085);
	border: none;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
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
			border: 1px solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}px;
			background-color: ${({ theme }) => theme.colors.gray98};
			font-size: 2rem;
			line-height: 19px;
			color: ${({ theme }) => theme.colors.black};
		}
	}
`;
