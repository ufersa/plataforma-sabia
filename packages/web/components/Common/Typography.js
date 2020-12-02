import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Title = styled.h2`
	font-size: 3.6rem;
	text-align: center;

	${({ noPadding }) =>
		!noPadding &&
		css`
			padding: 0 3rem;
		`};

	${({ noMargin }) =>
		!noMargin &&
		css`
			margin-bottom: 9rem;
		`};

	span {
		font-weight: bold;
	}

	text-align: ${({ align }) => align || 'center'};

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		font-size: 3rem;
		${({ noMargin }) =>
			!noMargin &&
			css`
				margin-bottom: 6rem;
			`};
	}
`;
