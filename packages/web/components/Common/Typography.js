import styled, { css } from 'styled-components';

export const SectionTitle = styled.h2`
	${({ theme: { screens, colors }, noPadding, noMargin, align, color }) => css`
		font-size: 3.6rem;
		color: ${color && colors[color]};

		${!noPadding &&
			css`
				padding: 0 3rem;
			`};

		${!noMargin &&
			css`
				margin-bottom: 9rem;
			`};

		span {
			font-weight: bold;
		}

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
	font-size: 2.8rem;
	font-weight: 500;
	text-align: center;
	color: ${({ theme }) => theme.colors.secondary};

	${({ noMargin }) =>
		!noMargin &&
		css`
			margin-bottom: 1.6rem;
		`};

	text-align: ${({ align }) => align || 'center'};

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		font-size: 2.4rem;
		${({ noMargin }) =>
			!noMargin &&
			css`
				margin-bottom: 0.8rem;
			`};
	}
`;
