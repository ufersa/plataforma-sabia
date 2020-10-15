import styled, { css } from 'styled-components';

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
	padding-top: 65%;
	border-top-left-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border-top-right-radius: ${({ theme }) => theme.metrics.baseRadius}rem;

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

export const Badge = styled.div`
	position: absolute;
	left: 2rem;
	padding: 0.7rem 2.2rem;
	text-transform: uppercase;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	box-shadow: 0rem 0rem 1rem ${({ theme }) => theme.colors.lightGray};

	${(props) =>
		props.bottom &&
		css`
			font-size: 1.4rem;
			bottom: 2rem;
			background-color: ${({ theme }) => theme.colors.cyan};
			color: ${({ theme }) => theme.colors.white};
		`}

	${(props) =>
		props.top &&
		css`
			font-size: 1.3rem;
			top: 2rem;
			background-color: ${({ theme }) => theme.colors.white};
			color: ${({ theme }) => theme.colors.black};
		`}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2rem;
	font-weight: 400;
`;

export const UpContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

export const PrivateContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		text-transform: uppercase;
		color: ${({ theme }) => theme.colors.lightGray};
		font-size: 1.3rem;
		margin-left: 0.5rem;
	}

	svg {
		width: ${({ theme }) => theme.sizes.smallIcon}rem;
		height: ${({ theme }) => theme.sizes.smallIcon}rem;
	}
`;

export const MainTitle = styled.h3`
	margin-bottom: 3rem;
	min-height: 7.6rem;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.4rem;
	padding: 2rem 0;
	border-top: 0.1rem solid ${({ theme }) => theme.colors.border};
`;

export const PatentText = styled.span`
	font-weight: 400;
	color: ${({ theme }) => theme.colors.darkGray};
	text-transform: uppercase;
`;

export const CalendarText = styled.div`
	display: flex;
	align-items: center;

	span {
		color: ${({ theme }) => theme.colors.secondary};
		margin-left: 0.5rem;
		display: block;
	}

	svg {
		width: ${({ theme }) => theme.sizes.smallIcon}rem;
		height: ${({ theme }) => theme.sizes.smallIcon}rem;
	}
`;
