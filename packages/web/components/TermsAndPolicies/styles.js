import styled, { css } from 'styled-components';

export const PageTitle = styled.h1`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.secondary};

		@media (max-width: ${screens.medium}px) {
			font-size: 3rem;
		}
	`}
`;

export const Box = styled.article`
	${({ theme: { colors, screens } }) => css`
		padding: 6rem 5%;
		margin: 1rem 0;
		border-radius: 0.25rem;
		background-color: ${colors.white};
		color: ${colors.black};

		p {
			margin-bottom: 1rem;
		}

		h2 {
			text-transform: uppercase;
			color: ${colors.black};
			font-size: 2.4rem;
		}

		h3 {
			font-size: 1.6rem;
			font-weight: 500;
		}

		ul {
			padding-left: 3rem;

			li {
				list-style: disc;
				margin-bottom: 1rem;
			}
		}

		@media (max-width: ${screens.medium}px) {
			padding: 3rem 5%;
		}
	`}
`;
