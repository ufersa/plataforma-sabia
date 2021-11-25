import styled, { css } from 'styled-components';

export const CardContainer = styled.div`
	${({ theme: { colors, metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;

		display: flex;
		flex-direction: column;
		background-color: ${colors.white};
		transition: all 0.3s ease 0s;
		padding: 0.8rem;
		height: 100%;

		:hover {
			transform: translateY(-0.7rem);
		}
	`}
`;

export const ImageContainer = styled.div`
	${({ theme: { metrics }, short }) => css`
		width: 100%;
		height: ${short ? '18.5rem' : '25.4rem'};

		position: relative;

		img {
			width: 100%;
			height: ${short ? '18.5rem' : '100%'};
			object-fit: cover;
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const Badge = styled.div`
	box-shadow: 6px 3px 6px rgb(0 0 0 / 50%);
	position: absolute;
	left: 0;
	padding: 0.4rem 0.8rem;
	font-size: 1.4rem;
	line-height: 2.4rem;
	border-top-right-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	border-bottom-right-radius: ${({ theme }) => theme.metrics.baseRadius}rem;

	${(props) =>
		props.bottom &&
		css`
			bottom: 2rem;
			background-color: ${({ theme }) => theme.colors.white};
			color: ${({ theme }) => theme.colors.silver};
		`}

	${(props) =>
		props.top &&
		css`
			top: 2rem;
			background-color: ${({ theme }) => theme.colors.white};
			color: ${({ theme }) => theme.colors.black};
		`}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1.6rem;
	font-weight: 400;
	height: 100%;
`;

export const MainTitle = styled.h3`
	font-family: 'Montserrat';
	font-weight: 500;
	font-size: 1.6rem;
	line-height: 2.4rem;
`;

export const ShortTitle = styled.h3`
	font-family: 'Montserrat';
	font-weight: 500;
	font-size: 1.6rem;
	line-height: 2.4rem;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.2rem;
	padding-top: 0.8rem;
	border-top: 0.1rem solid ${({ theme }) => theme.colors.border};
	margin-top: auto;
`;

export const InstitutionText = styled.span`
	${({ theme: { colors } }) => css`
		display: flex;
		font-weight: 700;
		font-size: 1rem;
		color: ${colors.lightGray2};
		text-transform: uppercase;
		margin-top: 0.4rem;
		margin-bottom: 1.6rem;
	`}
`;

export const PublishedDate = styled.span`
	${({ theme: { colors } }) => css`
		display: flex;
		font-weight: 700;
		font-size: 1rem;
		color: ${colors.lightGray2};
		text-transform: uppercase;
		margin-top: 1.4rem;
	`}
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

export const LikesWrapper = styled.div`
	margin-bottom: 1rem;
	> div {
		padding: 0;
	}
`;

export const Price = styled.h2`
	${({ theme: { colors } }) => css`
		font-size: 2.8rem;
		line-height: 3.3rem;
		color: ${colors.secondary};
		margin-bottom: 1.2rem;
	`}
`;

export const TextPill = styled.span`
	${({ theme: { colors, metrics } }) => css`
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1.2rem;
		color: ${colors.lightGray2};

		padding: 0.2rem 0.4rem;
		border: 1px solid ${colors.lightGray2};
		border-radius: ${metrics.doubleRadius}rem;
	`}
`;

export const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		margin-right: 0.4rem;
	}
`;
