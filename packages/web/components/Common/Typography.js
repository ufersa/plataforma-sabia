import styled, { css } from 'styled-components';

export const SectionTitle = styled.h2`
	${({ theme: { colors, screens }, noPadding, noMargin, align }) => css`
		font-size: 3.6rem;
		line-height: 4.2rem;
		color: ${colors.black};
		text-align: ${align || 'left'};

		${!noPadding &&
			css`
				padding: 0 3rem;
			`};

		${!noMargin &&
			css`
				margin-bottom: 2.4rem;
			`};

		@media (max-width: ${screens.medium}px) {
			font-size: 3rem;
			padding-left: 2rem;
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
