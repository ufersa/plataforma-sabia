import styled, { css } from 'styled-components';
import { Actions as RootActions } from '../styles';

export const FinishWrapper = styled.div`
	${({ theme: { screens } }) => css`
		height: 100%;

		@media screen and (min-width: ${screens.medium + 1}px) {
			background-image: url(/celebration-rafiki.svg);
			background-repeat: no-repeat;
			background-position: center right;
		}
	`}
`;

export const FinishContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		height: 100%;
		max-width: 47rem;

		@media screen and (max-width: ${screens.medium - 1}px) {
			align-items: center;
			justify-content: space-evenly;
			text-align: center;
			margin: 0 auto;

			a {
				display: none;
			}
		}
	`}
`;

export const LogoWrapper = styled.div`
	${({ theme: { screens } }) => css`
		width: 100%;
		margin: 0 auto;
		max-width: 18.5rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin: 0;
			margin-bottom: 8.6rem;
			max-width: 16.5rem;
		}
	`}
`;

export const FinishTitle = styled.h3`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.secondary};
		max-width: 27.5rem;
		line-height: 3rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			max-width: unset;
			font-size: 3.6rem;
			margin-bottom: 3.2rem;
		}
	`}
`;

export const FinishSubtitle = styled.p`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.silver};
		font-size: 1.6rem;
		line-height: 2.4rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin-bottom: 3.2rem;
		}
	`}
`;

export const Actions = styled(RootActions)`
	${({ theme: { screens } }) => css`
		@media screen and (min-width: ${screens.medium + 1}px) {
			display: none !important;
		}
	`}
`;
