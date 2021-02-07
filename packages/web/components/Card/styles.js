import styled, { css } from 'styled-components';

export const CardContainer = styled.div`
	${({ theme: { colors, metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;

		display: flex;
		flex-direction: column;
		background-color: ${colors.white};
		transition: all 0.3s ease 0s;
		padding: 0.8rem;

		:hover {
			transform: translateY(-0.7rem);
		}
	`}
`;

export const ImageContainer = styled.div`
	${({ theme: { metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;
		width: 100%;

		overflow: hidden;
		position: relative;
	`}
`;

export const Badge = styled.div`
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
`;

export const MainTitle = styled.h3`
	font-family: 'Montserrat';
	font-weight: 500;
	font-size: 1.6rem;
	margin-bottom: 3rem;
	line-height: 2.4rem;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.2rem;
	padding-top: 0.8rem;
	border-top: 0.1rem solid ${({ theme }) => theme.colors.border};
`;

export const InstitutionText = styled.span`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: ${colors.lightGray2};
		text-transform: uppercase;

		> svg {
			path {
				stroke: ${colors.lightGray2};
				stroke-width: 1.5;
			}
			margin-right: 0.8rem;
		}
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
