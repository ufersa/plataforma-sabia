import styled, { css } from 'styled-components';
import StyledButton from '../../../Button/styles';

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
			justify-content: space-around;
		}
	`}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

export const Image = styled.img.attrs(() => ({
	src: '/notes.png',
	alt: 'Notes',
}))`
	margin: auto;
	height: auto;
`;

export const Title = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.primary};
		font-weight: 500;
		font-size: 2.8rem;
	`}
`;

export const Text = styled.p`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.black};
		font-size: 1.8rem;
		line-height: 2.4rem;

		@media (max-width: ${screens.medium}px) {
			margin: 1.6rem 0;
		}
	`}
`;

export const CloseButton = styled(StyledButton).attrs(({ theme: { colors } }) => ({
	bgColor: colors.primary,
	color: colors.white,
	type: 'button',
}))`
	${({ theme: { screens } }) => css`
		max-width: 30%;
		text-transform: uppercase;
		border-radius: 0;
		padding: 0.4rem !important;

		@media (max-width: ${screens.medium}px) {
			max-width: 100%;
		}
	`}
`;
