import styled, { css } from 'styled-components';

export const SectionTitle = styled.h2`
	${({ theme: { screens, colors }, noPadding, noMargin, align, color, bgColor }) => css`
		font-size: 3.6rem;
		color: ${color && colors[color]};

		${!noPadding &&
			css`
				padding: 0 3rem;
			`};

		${!noMargin &&
			css`
				margin-bottom: 2.4rem;
			`};

		span {
			font-weight: bold;
		}

		background-color: ${bgColor};
		text-align: ${align || 'center'};

		@media (max-width: ${screens.medium}px) {
			font-size: 3rem;
			${!noMargin &&
				css`
					margin-bottom: 6rem;
				`};
		}
	`}
`;

export const Title = styled.h3`
	${({ theme: { colors, screens }, color, align, noMargin }) => css`
		font-size: 2.8rem;
		font-weight: 500;
		text-align: center;
		color: ${color || colors.secondary};

		${!noMargin &&
			css`
				margin-bottom: 1.6rem;
			`};

		text-align: ${align || 'center'};

		@media (max-width: ${screens.medium}px) {
			font-size: 2.4rem;
			${!noMargin &&
				css`
					margin-bottom: 0.8rem;
				`};
		}
	`}
`;
