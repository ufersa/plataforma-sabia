import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.white};
	transition: all 0.3s ease 0s;

	:hover {
		transform: translateY(-0.7rem);
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	padding-top: 60%;
	border-top-left-radius: ${({ theme }) => theme.metrics.baseRadius}px;
	border-top-right-radius: ${({ theme }) => theme.metrics.baseRadius}px;

	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2rem;
`;

export const UpContent = styled.div`
	margin-bottom: 3rem;

	> div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}
`;

export const LocationContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.lightGray};
		font-size: 1.3rem;
		margin-left: 0.5rem;
	}
`;

export const LikesContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		font-size: 1.3rem;
		color: ${({ theme }) => theme.colors.lightGray};
		display: inline-block;
		margin-left: 0.5rem;
	}
`;

export const MainTitle = styled.h3`
	margin-bottom: 2rem;

	a {
		color: ${({ theme }) => theme.colors.darkGray};

		:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.4rem;
	padding-bottom: 2rem;
	border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};

	div {
		display: flex;
		align-items: center;

		span {
			color: ${({ theme }) => theme.colors.mediumGray};
			font-weight: 500;
			margin-left: 0.5rem;
			display: block;
		}
	}
`;

export const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 2rem;

	.left {
		display: flex;
		align-items: center;

		span {
			color: ${({ theme }) => theme.colors.mediumGray};
			font-size: 1.4rem;
			margin-left: 0.5rem;
		}
	}

	.right {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
