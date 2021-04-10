import styled, { css } from 'styled-components';

export const Wrapper = styled.main``;

export const Background = styled.section`
	${({ theme: { colors }, gray }) => css`
		display: flex;
		background-color: ${gray ? colors.lightGray4 : colors.white};
	`}
`;
export const InstitutionInfos = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		max-width: 144rem;
		flex-grow: 1;
		margin: 0 auto;
		padding: 5.2rem 2.2rem;

		div {
			max-width: 62.5rem;
			margin: 1.2rem 0;

			h1 {
				color: ${colors.secondary};
				font-size: 2.8rem;
				line-height: 3.3rem;
				margin-bottom: 1.6rem;
			}

			p,
			a {
				font-size: 1.4rem;
				color: ${colors.silver};
				line-height: 2.4rem;
			}
		}

		img {
			margin: auto 0;
			width: 17rem;
			height: 17rem;
		}

		@media screen and (min-width: ${screens.medium}px) {
			flex-direction: row;

			div {
				border-left: 2px solid ${colors.lightGray4};
				padding-left: 1.6rem;
				margin-left: 1.6rem;
			}
		}
	`}
`;

export const ListWrapper = styled.div`
	max-width: 144rem;
	flex-grow: 1;
	margin: 0 auto;
`;
