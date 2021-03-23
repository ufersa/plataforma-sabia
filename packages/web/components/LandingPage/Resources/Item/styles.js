import styled, { css } from 'styled-components';
import { Link as NextLink } from '../../../Link';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	${({ theme: { colors, screens } }) => css`
		background-color: ${colors.white};
		box-shadow: -0.8rem -0.8rem 0 0 ${colors.darkGray4};
		padding: 3.2rem;
		min-height: 56.4rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		@media (max-width: ${screens.large}px) {
			padding: 2.2rem;
		}
	`}
`;

export const Image = styled.img`
	margin: 0 auto 2.4rem auto;
	max-width: 100%;
`;

export const Title = styled.h2`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.white};
		font-size: 3.6rem;
		line-height: 4.3rem;
		font-weight: 500;
		text-align: center;
		margin: 0 auto 1.6rem auto;

		@media (max-width: ${screens.large}px) {
			margin-bottom: 2.4rem;
		}
	`}
`;

export const Body = styled.div``;

export const Description = styled.p`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.black};
		font-size: 1.6rem;
		line-height: 2.4rem;
		font-weight: 500;
		margin-bottom: 2.4rem;

		@media (max-width: ${screens.large}px) {
			font-size: 1.4rem;
		}
	`}
`;

export const Link = styled(NextLink)`
	${({ theme: { colors }, buttonDisabled }) => css`
		background-color: ${colors.secondary};
		color: ${colors.white};
		border: none;
		font-size: 1.4rem;
		font-weight: bold;
		line-height: 2.4rem;
		text-transform: uppercase;
		padding: 0.8rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		width: 100%;
		box-shadow: 0 0.6rem 1.6rem 0 rgba(0, 0, 0, 0.15);

		:hover {
			opacity: 0.8;
		}

		${!!buttonDisabled &&
			css`
			cursor: not-allowed;
			opacity 0.5;
		`};
	`}
`;
