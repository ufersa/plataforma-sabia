import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { screens }, mobileBreakpoint }) => css`
		position: absolute;
		right: -55%;
		top: 1.6rem;

		@media screen and (max-width: ${mobileBreakpoint || screens.xmedium}px) {
			position: static;
		}
	`}
`;

export const Container = styled.div`
	${({ theme: { colors, metrics, screens } }) => css`
		padding: 1.6rem;
		border: 1.5px solid ${colors.red};
		border-radius: ${metrics.baseRadius}rem;
		font-size: 1.2rem;
		line-height: 1.6rem;
		background-color: ${colors.lightGray6};
		position: relative;

		&:before {
			content: '';
			position: absolute;
			left: -1rem;
			border: solid ${colors.red};
			border-width: 0 1.5px 1.5px 0;
			padding: 0.8rem;
			transform: rotate(135deg);
			background-color: ${colors.lightGray6};
		}

		@media screen and (max-width: ${screens.xmedium}px) {
			&:before {
				display: none;
			}
		}
	`}
`;

export const Title = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		margin-bottom: 0.6rem;
	`}
`;

export const StrengthList = styled.ul``;

export const StrengthItem = styled.li`
	${({ theme: { colors }, success }) => css`
		position: relative;
		padding-left: 1.4rem;
		color: ${success ? colors.secondary : colors.red};

		&:before {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 50%;
			content: '';
			width: 0.8rem;
			height: 0.8rem;
			background-color: ${success ? colors.secondary : colors.red};
		}

		&:not(:last-child) {
			margin-bottom: 0.4rem;
		}
	`}
`;
