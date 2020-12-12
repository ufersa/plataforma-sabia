import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors }, reversed }) => css`
		position: relative;
		padding-bottom: 54.3%;
		padding-top: 2.2rem;
		height: 0;
		position: relative;

		&:before {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background-color: ${colors.primary};
			z-index: -1;
			position: absolute;
			top: -0.8rem;
			left: ${reversed ? 'auto' : '-0.8rem'};
			right: ${reversed ? '-0.8rem' : 'auto'};
		}
	`}
`;

export const Container = styled.div`
	${({ theme: { colors }, image }) => css`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0 2.4rem 2.4rem 2.4rem;

		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-end;

		background-image: linear-gradient(to bottom, rgba(79, 79, 79, 0), ${colors.silver}),
			url(${image});
		background-size: cover;
		background-position: center;
	`}
`;

export const Label = styled.h3`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.white};
		font-size: 2.4rem;
		line-height: 2.9rem;
		font-weight: 500;

		@media (max-width: ${screens.large}px) {
			display: none;
		}
	`}
`;

export const Description = styled.p`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.white};
		font-size: 1.4rem;
		line-height: 171%;
		font-weight: 500;
		margin-top: 0.8rem;

		@media (max-width: ${screens.large}px) {
			display: none;
		}
	`}
`;
