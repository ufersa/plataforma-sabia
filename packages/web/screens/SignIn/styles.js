import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		height: 100%;

		@media screen and (max-width: ${screens.xmedium}px) {
			flex-direction: column;
		}
	`}
`;

export const Aside = styled.aside`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		flex-basis: 45%;
		max-width: 50rem;

		&:before {
			position: absolute;
			background-color: ${colors.lightGreen};
			content: '';
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0.72;
		}

		a {
			display: flex;
		}

		@media screen and (max-width: ${screens.xmedium}px) {
			max-width: 100%;
			flex-basis: unset;
			padding: 1.6rem 0;
		}
	`}
`;

export const LogoWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LogoImage = styled.a`
	${({ theme: { screens } }) => css`
		position: relative;
		max-width: 100%;
		width: 21.5rem;
		height: 6.4rem;

		@media screen and (max-width: ${screens.xmedium}px) {
			max-width: 14rem;
			height: 4.2rem;
		}
	`}
`;

export const BackgroundImageWrapper = styled.div`
	${({ theme: { screens } }) => css`
		position: relative;
		width: 100%;
		height: 50rem;

		@media screen and (max-width: ${screens.xmedium}px) {
			display: none;
		}
	`}
`;
